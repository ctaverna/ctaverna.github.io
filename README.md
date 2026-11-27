# ctaverna.github.io

Source of [ctaverna.github.io](https://ctaverna.github.io), a Jekyll site that lives entirely in
`docs/`, with the [`ctaverna/beautiful-jekyll`](https://github.com/ctaverna/beautiful-jekyll) remote
theme.

## Theme

`remote_theme` in `docs/_config.yml` is pinned to a tag of the fork (`@ctaverna-AAAA-MM-DD`), so a
push to the fork never changes the site by itself. The fork follows
[`daattali/beautiful-jekyll`](https://github.com/daattali/beautiful-jekyll) plus a few small tweaks
(bold post dates, social links in a new tab). To update it:

1. in the fork, merge `upstream/master`, check the result with a local build, tag it
   `ctaverna-AAAA-MM-DD` and push `master` with the tag;
2. here, move the pin in `docs/_config.yml` to the new tag and run `docs/serve.sh build`.

Site-specific changes go in this repo, not in the fork: CSS in `docs/assets/css/` (listed in
`site-css`), and theme files overridden by a file with the same path under `docs/`. These are
copies of the theme's files, so after updating the theme compare them with the new versions:

- `docs/_layouts/post.html` — tags moved to the header, "Read next" instead of Previous/Next;
- `docs/_includes/header.html` — tags after the post date;
- `docs/_includes/social-share.html` — adds Bluesky, Hacker News and "copy link".

`docs/_includes/read-next.html` is the site's own (related posts by shared tags).

## Local preview

Only Docker is needed:

```
docs/serve.sh              # http://localhost:4000, with livereload
docs/serve.sh --drafts     # also the drafts in docs/_drafts/
docs/serve.sh build        # production build into docs/_site/
```

It runs the official `ruby` image with the version in `docs/.ruby-version` and the gems pinned in
`docs/Gemfile.lock`, the same ones the GitHub Actions build uses. `docs/_config_local.yml` points the
URL to localhost and disables analytics.

## Publishing

[`.github/workflows/pages.yml`](.github/workflows/pages.yml) builds the site on every push and pull
request, and deploys it to GitHub Pages only from `main`. The repository's Pages source must be set to
**GitHub Actions**.

To update the gems, run Bundler in the same image and commit `docs/Gemfile.lock`:

```
docker run --rm -v "$PWD/docs:/srv" -w /srv ruby:$(cat docs/.ruby-version) bundle update
```
