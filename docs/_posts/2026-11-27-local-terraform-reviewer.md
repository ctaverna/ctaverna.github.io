---
# Generated from the article source: edit the source and export again, not this file.
layout: post
title: I planted 7 bugs in my Terraform for local LLMs to find. The best find was one I didn't plant.
subtitle: Ornith, Inkling and two Qwens on a MacBook M5 Pro, a larger model in the cloud as a yardstick, and the fix nobody got right
tags: [terraform, security, llm, open-weights, strands-agents, aws]
cover-img: /assets/img/local-terraform-reviewer/cover.png
permalink: /local-terraform-reviewer/
render_with_liquid: false
---

{::options toc_levels="2..3" /}

* TOC
{: .toc .toc-title toc}

The most useful thing a model found in my Terraform was a bug I had not planted. The host role of my
own server attaches an AWS managed policy that lets it read any SSM parameter in the account, which
quietly defeats the careful restriction I had written a few lines below. I checked: it is true, and
it is in my real code, not just in the copy.

The irony is that it was found by the one model in this experiment that did not run on my laptop.
And this is an article about code that should not leave it.

## Why local, and what I tested

Infrastructure code is the map of a system: which ports are open, which roles trust whom, where the
data lives and, more often than anyone likes to admit, a secret that should not be there. It is
exactly the code you want a second pair of eyes on, and exactly the code you may not be allowed, or
may not want, to paste into a cloud service. Sometimes a policy says no. Sometimes the reason is that
the file you are about to send contains the token you have not noticed yet.

So I asked a narrow question: **can a model that runs entirely on my laptop do a useful security
review of real Terraform?** And I used it to settle two things I had been putting off. Ornith 1.5,
the model that calls itself "self-improving", had seemed to work well whenever I had used it, but that
was an impression, not a measurement: I had never really tested it, let alone compared it with its
stock Qwen sibling. Inkling 2 Mini I knew only by reputation. This was the occasion to put both on
the same real task, side by side.

I took a sanitized copy of my personal Terraform, replaced every identifier with a placeholder, and
planted seven
security problems in it, with a difficulty I wrote down before running anything:

| Id | Difficulty | Problem |
|---|---|---|
| P1 | easy | SSH open to `0.0.0.0/0` on a host whose description says "No ingress" |
| P2 | easy | IMDSv1 allowed, right under a comment that says "IMDSv2 only" |
| P3 | medium | data volume not encrypted |
| P4 | medium | the host's IAM role allows every Bedrock action (`bedrock:*`) on every resource, where invoking models is all it needs |
| P5 | hard | the CI admin role trusts any branch of the repository |
| P6 | easy | a Telegram bot token as the default value of a variable |
| P7 | hard | a secret managed as the `value` of an `aws_ssm_parameter`: it ends up in the state |

The reviewer is a small agent written with [Strands Agents](https://strandsagents.com), AWS's open
source agent SDK, chosen because the same code runs against a local OpenAI-compatible server or
against Amazon Bedrock by changing one line:

```python
from strands import Agent
from strands.models.openai import OpenAIModel

model = OpenAIModel(
    client_args={"base_url": "http://localhost:1234/v1", "api_key": "local"},
    model_id="ornith-1.5-35b-a3b",
    params={"temperature": 1.0, "top_p": 0.95},
)
# Same agent, in the cloud (no sampling parameters: recent models reject them):
# model = BedrockModel(model_id="...", region_name="...")

agent = Agent(model=model, system_prompt=SYSTEM,
              tools=[list_files, read_file, report_finding])
```

Each run has two phases. In the **review**, the agent reads every file and calls `report_finding`
for each problem, with file, lines and severity. In the **fix**, it gets `edit_file`, `write_file`
and `terraform_validate`, and the instruction to fix everything it rated high or medium and validate
both stacks. A script scores each run: a finding counts if it falls in the right HCL block (±2 lines),
anything else is an "extra" that I judged by hand, and a check per problem looks at the fixed code.
Two runs per model. Remember the script: it becomes part of the story.

## The cast

Four open-weight models ran on a MacBook Pro M5 Pro with 64 GB of memory, each on the runtime that
was fastest for it and with the sampling recommended in its own `generation_config.json`:

| Model | What it is | Role | Runtime |
|---|---|---|---|
| Ornith 1.5 35B-A3B | MoE, ~3B active, built on the Qwen family | protagonist | LM Studio (MLX, 4-bit) |
| Inkling 2 Mini | "looped" MoE, 26.4B / ~3.4B active | protagonist | MTPLX 2.13.3 with MTP |
| Qwen 3.6 35B-A3B | MoE, same architecture as Ornith | control | LM Studio (MLX, 4-bit) |
| Qwen 3.8 27B | dense | challenger | MTPLX 2.13.3 with MTP |
| *Kimi K3.1* | *MoE, ~2.8T / ~104B active* | *reference, in the cloud* | *Amazon Bedrock* |

**Ornith 1.5**, out since August, is the model I came in biased towards: it had given me good
impressions, but I had never really put it under pressure. "Self-improving" describes its training,
not its use: in each
reinforcement-learning cycle the model proposes harder tasks, builds the scaffolding to solve them and
is rewarded only for passing. At inference time it is an ordinary model. Its team compares it with
**Qwen 3.6 35B-A3B**, which has the same architecture and vocabulary (I checked the configs), and
declares a large gap. That makes Qwen 3.6 the natural **control**: if the training bought something,
it should show against this one. **Qwen 3.8 27B**, the newest Qwen of a similar size, is the
**challenger** the Ornith tables leave out. **Inkling 2 Mini** is the other protagonist, a different
architecture that turned out to be a very different reviewer.

**Kimi K3.1** is not a contender but a yardstick: I wanted to know what a "complete" review of this
code looks like. It is an open-weight model like the other four, only much larger, so it answers the
question that matters here: what the same kind of model can do when size is not a constraint, on
the same agent, through Bedrock. It ran on the sanitized copy with a fake token, exactly the trip the
real code should not make.

## The scoreboard

Each model ran twice. Where a cell has two values, they are run 1 · run 2.

| | Ornith 1.5 | Qwen 3.6 | Inkling 2 Mini | Qwen 3.8 27B | *Kimi K3.1 (cloud)* |
|---|---|---|---|---|---|
| Planted problems found (of 7) | 5 · 5 | 5 · 4 | **7 · 6** ¹ | 5 · 6 | *7 · 7* ¹ |
| P5 (CI trusts any branch) found | never | never | **both runs** | once | *both runs* |
| P7 (secret in the state) found | never | never | once ¹ | never | *both runs* ¹ |
| False alarms | none | none ⁵ | none | none | *none* |
| Valid extra findings ⁴ | 0 | 1 | 2 | 1 | *2* |
| Fixed on disk, of what it chose to fix ² | 4/4 · 4/4 | 4/4 · 3/3 | 5/6 · 5/5 | 3/4 · 3/5 | *6/6 · 6/6* |
| Review + fix time | 2.6 · 6.7 min | 4.3 · **1.4 min** | 17.0 · 8.7 min | 5.5 · 5.6 min | *2.2 · 2.5 min* ³ |
| Tokens generated in the review | 7.6k · 8.5k | **2.4k · 2.0k** | 21.8k · 11.6k | 2.7k · 4.4k | *11.2k · 11.9k* |

¹ Includes P7 when the model described it inside a finding about another file (the CI role that can
read the state): Inkling in run 1, Kimi in run 2. My scoring script missed those; I read every
finding.
² The fix prompt said "fix what you rated high or medium", so each model chose its own list. This row
counts how many planted problems on that list ended up fixed on disk. P4 is left out (nobody fixed it
fully), and Qwen 3.8's three misses came from a race condition in my tool, not from the model; the
third act tells both stories.
³ On cloud hardware: not comparable with the laptop.
⁴ Distinct sensible findings across both runs, not counting P7 when it was described under another
file. They are listed in the second act.
⁵ In run 1 Qwen 3.6 reported its extra finding on `bootstrap/iam.tf`, a file that does not exist (the
real file is `bootstrap/github_oidc.tf`).

![Which planted problem each model found, in how many of two runs](/assets/img/local-terraform-reviewer/chart-matrix.png){: .centered}

The table is the summary. The interesting part is how the models got there, and it reads best as
three acts of increasing difficulty.

## Act one: the easy ones, and the wobble

P1, P2, P3 and P6 are the problems a careful junior would catch, and every local model caught almost
all of them, in minutes, with no false alarms and clean tool use. That alone answers the first
question: **a local model removes the bulk of the obvious problems** without the code leaving the
machine.

The comparison I cared about most, Ornith against its control, is decided here, and it is closer
than Ornith's benchmarks suggest. Over two runs Ornith found 10 problems, Qwen 3.6 found 9. The
difference is a single P1 that Qwen 3.6 missed once. Ornith reasoned about four times as much (7.6k to
8.5k tokens against 2.0k to 2.4k) and was slower for it. On these numbers the control holds up very
well.

Where Ornith does stand out is consistency, and here I can use more than two runs. While setting up
the experiment I had run it five more times on the same code, with variations I was testing (a lower
temperature, its past reasoning sent back to it, the temperature its README suggests for coding).
Across all seven runs in LM Studio, the two in the table and those five, it always found the same five
problems, never raised a false alarm, never invented a file name (as Qwen 3.6 once did on an extra
finding) and never wrote a tool call as plain text. What moved was its **judgment of severity**: P4 was
`low` in three runs out of seven (including the first run in the table), P6 went from `high` to `low`
once. And because my fix prompt said "fix what you rated high or medium", every wobble in judgment
became a wobble in what got fixed: in all three of those runs Ornith left `bedrock:*` untouched simply
because it had rated it `low`.

That is the first lesson of the experiment, and it has nothing to do with which model you pick:
**don't let the model's judgment drive the control flow.** Let the model report and let the code
decide what gets fixed.

## Act two: following the attacker

P5 and P7 are the problems that need reasoning about **who can do what**, not pattern matching.

P5 is the kind of change that looks harmless in a diff. The original trust policy of the CI admin role
accepted only the `main` branch; the planted one accepts anything:

```hcl
condition {
  test     = "StringLike"
  variable = "token.actions.githubusercontent.com:sub"
  values   = ["${var.github_sub_prefix}:*"]
}
```

With that wildcard, any branch, and any workflow someone pushes to it, can assume the role that
applies the whole infrastructure. Inkling found it in both runs and rated it `high` both times; Qwen
3.8 found it once; Ornith and Qwen 3.6 never did. Kimi found it twice.

P7 is subtler, because the planted code looks like the safe way to do it:

```hcl
resource "aws_ssm_parameter" "telegram_bot_token" {
  name  = "${var.ssm_prefix}/telegram/bot-token"
  type  = "SecureString"
  value = var.telegram_bot_token
}
```

`SecureString` is encrypted with KMS. But Terraform keeps the `value` of every managed resource in its
state, so the token sits in the state file in plain text, and anyone who can read the state can read
it.

Here is the part I did not expect. **Neither of the models that found P7 treated it as an isolated flaw
in `telegram.tf`.** Both connected this resource to the CI `plan` role in `bootstrap/github_oidc.tf`,
where a comment above `DenyParameterValues` states that a plan runs pull-request code and that "no
stack manages parameter values", right next to `ReadOnlyAccess` (which can read the S3 state bucket).
Inkling, in its first run, flagged the `plan` role: `ReadOnlyAccess` lets pull-request code read the
state in S3, "whose contents include the telegram bot token stored as an SSM SecureString value". Kimi
made the same connection twice, reporting it on the resource in its first run and on the `plan` role
in its second: pull-request code can read the state, and the state contains the token. Neither stopped
at "`SecureString` looks fine". Both asked "who can read what" across the two stacks. That is how a
good human reviewer finds this kind of problem too, and I think it is the most transferable thing in
this article.

Inkling saw it and did not fix it: its resource came back unchanged. Kimi fixed it in both runs, the
second time with the cleanest change of the whole experiment, a `removed` block with
`destroy = false`, which takes the resource out of Terraform's state without deleting the parameter.
With Terraform 1.11 or later you can also keep the resource and use the write-only argument
`value_wo`, which is never stored in state or plans
([HashiCorp](https://developer.hashicorp.com/terraform/language/resources/ephemeral/write-only)).

The same habit of following the attacker produced the best extras, the valid findings that I had not
planted. Across all runs there were four:

| Not planted | Found by |
|---|---|
| The CI `apply` role has `AdministratorAccess` | Inkling (both runs), Qwen 3.8 (both), Qwen 3.6 (once) |
| The first boot pipes a vendor install script from the Internet into a root shell (`curl \| sh`) | Inkling (both runs) |
| The CI `plan` role, assumable by pull-request code, has account-wide `ReadOnlyAccess` | Kimi (once on its own; Inkling once and Kimi once as the route to P7) |
| The host role allows `ssm:GetParameter` on every parameter in the account | Kimi (once) |

The first one is a deliberate choice in my code (the role that applies everything needs broad
rights), so it is a fair remark rather than a bug; every model that raised it was right to. The
second and third are the kind of thing I would want a reviewer to tell me. The fourth is the bug at
the top of this article. The host role has two policies. My own one lets it read SSM parameters only
under the host's prefix. The other is `AmazonSSMManagedInstanceCore`, the AWS managed policy the SSM
agent needs, and among its permissions it allows `ssm:GetParameter` and `ssm:GetParameters` on
`"Resource": "*"`. Both policies are legitimate; the mistake was believing that mine narrowed the
managed one. IAM permissions add up: a broad allow in one policy is not narrowed by a stricter allow
in another. So the host can read any parameter in the account by name, secrets included, and my
careful restriction only limits what it can list by path. I read the current version of the managed
policy to be sure.

The fix is to turn the restriction into a deny, because in IAM an explicit deny wins over any allow:

```hcl
statement {
  sid           = "DenyOtherParameters"
  effect        = "Deny"
  actions       = ["ssm:GetParameter", "ssm:GetParameters", "ssm:GetParametersByPath"]
  not_resources = [
    "arn:aws:ssm:${var.region}:${data.aws_caller_identity.current.account_id}:parameter${var.ssm_prefix}",
    "arn:aws:ssm:${var.region}:${data.aws_caller_identity.current.account_id}:parameter${var.ssm_prefix}/*",
  ]
}
```


That finding is the best argument I have for the whole exercise, and also for a middle way I had
not considered: **the sanitized copy kept the real bug.** Placeholders instead of identifiers did not
hide anything a reviewer needed. If the real code cannot leave your machine, a sanitized copy may.

The cost of depth, locally, is time. Inkling took 17 and 9 minutes for review and fix, with up to 22k
tokens of reasoning in the review alone. In a first series of runs, with a temperature I had chosen
myself, it once reasoned for 75,000 tokens and almost 20 minutes without calling a single tool (more
on that under the hood).

![Review and fix time per model, two runs each](/assets/img/local-terraform-reviewer/chart-time.png){: .centered}

## Act three: the convincing wrong fix

P4 is the easiest problem to describe: the host's IAM role allows every Bedrock action on every
resource (`bedrock:*` on `*`), where my original code allowed two actions, `bedrock:InvokeModel` and `bedrock:InvokeModelWithResponseStream`,
on the model and inference-profile ARNs. Every model found it. Nobody fixed it correctly, and how they
failed is the most interesting result of the experiment.

The models split into two groups. Ornith (when it fixed P4 at all), Qwen 3.8 and Qwen 3.6 in its
first run kept `bedrock:InvokeModel` and left `resources = ["*"]`: half a fix. Inkling and Kimi, the
two deepest reviewers, went further: in three of their four runs (Inkling once, Kimi twice) they also
restricted the resources. And in all four of their fixes they replaced the actions with
`bedrock:Converse` (plus, three times, `bedrock:ConverseStream`).

It reads well: a comment right above the statement in `iam.tf` notes that the services on the host use
the `(Converse API)`. But `bedrock:Converse` is not the IAM permission Converse needs: AWS documents
that calling Converse requires `bedrock:InvokeModel`
([AWS guide](https://docs.aws.amazon.com/bedrock/latest/userguide/conversation-inference.html)). The
fix would have taken Bedrock access away from the services, and `terraform validate` was perfectly
green, four times, for two different models.

The closest to a correct fix came from the model I would have expected least: Qwen 3.6, the fast
control, which in its second run kept `bedrock:InvokeModel` and restricted the resources to
`foundation-model/*`. Not identical to my original (it dropped the streaming action and the
`inference-profile/*` ARN needed for cross-region profiles, and added a list permission), but for
direct model IDs it would have worked.

And then there is my own code. My automatic check for P4 verified that the actions had been narrowed
and that `*` was gone. It accepted the `Converse` fixes as complete. I found out only by reading the
fixed files one by one. The grader I had written to judge the reviewers had the same blind spot as the
reviewers: it checked the shape of the fix, not whether it would work.

Reading the transcripts exposed a second bug in my harness. On disk, Qwen 3.8 had left open three
problems it had itself rated `high` (P3 in its first run, P2 and P5 in its second). In the transcript,
it had actually called `edit_file` with a valid fix for every single one of them, and every call had
returned `"edited"`. Because Qwen 3.8 sent all its edits in a single parallel batch, and Strands
executes concurrent tool calls in worker threads while my `edit_file` did an unlocked read-modify-write,
two edits targeting the same file (`ec2.tf` or `github_oidc.tf`) raced and the second silently
overwrote the first. (Inkling and Ornith hit the same race in their slower runs, and only recovered
because they re-read or re-edited the file in a later turn.) **`terraform validate` is not a test, and
neither is a regex.**

## The verdict

- **If you want one local reviewer, it is Inkling 2 Mini on MTPLX.** It found the most (13 of 14 over
  two runs), it is the only local model that reached P5 both times and P7 once, and it gave the best
  extras. Nine to seventeen minutes is too slow for a pre-commit hook, but fine for a review on a pull
  request.
- **If you want it fast, Qwen 3.6.** One and a half to four minutes, the fewest tokens, even the
  closest P4 fix. It covers the easy problems and misses the hard ones.
- **Qwen 3.8 is the strongest mid-speed alternative.** It found 11 of 14 in about five and a half
  minutes, caught P5 once, and wrote clean fixes (`bedrock:InvokeModel`, not `Converse`) for every
  problem it found—only losing three on disk to the parallel-edit race in my tool.
- **Ornith, the model I came in biased towards, is not the best at any of these jobs.** It is the
  most consistent (the same five problems in seven runs, though the others had only two), but Qwen 3.6
  does nearly the same faster, and Inkling and Qwen 3.8 go further.

If the code really cannot leave your machine, this is the pattern I would follow: Qwen 3.6 on
every change, for the easy problems; Inkling on every pull request; then a
person, or, where policy allows, a large model on a sanitized copy.

## Did self-improvement show up?

Ornith 1.5 comes from the "Ornith Team" (no named authors; secondary sources and the README attribute
it to DeepReinforce), under the MIT licence, with a [blog post](https://ornith.ai/ornith_1_5.html) and [model cards](https://huggingface.co/ornith-ai/Ornith-1.5-35B-A3B) but no paper.
The number of cycles, the data and the compute are not disclosed.

The declared gap over the control is large:

| Benchmark (vendor numbers) | Ornith 1.5 35B-A3B | Qwen 3.6 35B-A3B |
|---|---:|---:|
| Terminal-Bench 2.1 | 67.8 | 52.5 |
| SWE-bench Verified | 79.0 | 73.4 |
| Toolathlon | 48.7 | 41.7 |


My answer, from one small task: the training shows up as **reliability**, not as depth. Same findings
every time, clean tool use, fixes that pass validation; but no P5, no P7, and a severity judgment
that wobbles. 
A large part of the declared gap over Qwen 3.6 did not show up here.

## Under the hood

Everything here is detail, but some of it cost me hours, so it may save you some.

### The runtime matters as much as the model

Raw speed on a ~14k-token log with a 700-token answer: write speed in tokens per second, and time to
the complete answer.

| | LM Studio | MTPLX, no MTP | MTPLX with MTP |
|---|---|---|---|
| Ornith 1.5 | **86.0 t/s · 14.4 s** | 65.4 · 18.2 s | (no MTP in 4-bit MLX; see below) |
| Inkling 2 Mini | 28.5 · 70.4 s | 40.3 · 26.2 s | **64.4 · 19.2 s** |
| Qwen 3.6 35B-A3B | 88.6 · 13.2 s | 72.0 · 15.2 s | **93.1 · 13.2 s** |
| Qwen 3.8 27B | 16.9 · 73 s | 13.2 · 86 s | **31.5 · 60 s** |

![Write speed on a 14k-token log, by runtime](/assets/img/local-terraform-reviewer/chart-speed.png){: .centered}

The biggest difference is in reading, not writing: Inkling reads the prompt at 239 tokens per second
in LM Studio and at about 1,300 on MTPLX, five times faster, because MTPLX supports its "looped"
architecture. On a much longer input (about 100k tokens), a retrieval question took Inkling 18.5
minutes in LM Studio and 2.1 on MTPLX (with MTP). Without MTP, Ornith and Qwen 3.6 are about 20%
faster in LM Studio. There is no single best runtime: each model ran on its own.

### MTP: great for some, useless for Ornith

Multi-token prediction on MTPLX gave Inkling +60% write speed on the 14k log (+24% on a short prompt),
Qwen 3.6 +29% (+27% short), and the dense Qwen 3.8 +139% (+81% short), which still leaves Qwen 3.8 at
about a third of Ornith's speed. The 4-bit MLX build of Ornith omits the MTP weights, and in the
original checkpoint Ornith's MTP head appears untrained ([shisa-ai](https://huggingface.co/shisa-ai/Ornith-1.5-35B-A3B-MTP)
and [EryriLabs](https://huggingface.co/EryriLabs/Ornith-1.5-35B-A3B-BigBang-MTP/blob/main/README.md)
measure 13–22% token acceptance, slower than plain decoding).
The same kind of head on its Qwen 3.6 twin gives about +29% at best. The team's route to speed seems
to be a separate [DFlash draft model](https://huggingface.co/ornith-ai/Ornith-1.5-35B-A3B-DFlash), for vLLM and SGLang, which I have not tried.

## Limits

Two runs per model in the comparison (plus five set-up runs of Ornith, used only for its consistency),
enough to see patterns and not enough for statistics. Seven problems, chosen and
planted by me, in one codebase. Vendor benchmark numbers taken as declared, not verified. Different
runtimes per model, on purpose: each at its best on this machine. Strands' `BedrockModel` sends past
reasoning blocks back to the model across turns whereas `OpenAIModel` (used for the local servers)
drops them; testing Ornith with a wrapper that preserved `<think>` blocks showed no change in findings.
Scoring is automatic and works by HCL block; I read every finding and every fix of the runs above, and
corrected the script's verdicts in the text where it was wrong.

## Thanks

This started from Danilo Poccia's [article on running open-weight models on his laptop](https://www.danilop.net/writing/open-weights-on-my-laptop/), which gave me the idea and the reference numbers I used to calibrate my measurements. Thank you, Danilo.
