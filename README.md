# ctaverna.github.io

Source of [ctaverna.github.io](https://ctaverna.github.io), a Jekyll site that lives entirely in
`docs/`, with the [`ctaverna/beautiful-jekyll`](https://github.com/ctaverna/beautiful-jekyll) remote
theme.

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
