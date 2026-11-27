#!/usr/bin/env bash
# Local preview of the blog, with the same Ruby (.ruby-version) and gems (Gemfile.lock)
# used by the GitHub Actions build. Needs only Docker.
#
#   ./serve.sh                 preview on http://localhost:4000 with livereload
#   ./serve.sh --drafts        same, including _drafts/ (any jekyll serve option works)
#   ./serve.sh build           production build into _site/, as GitHub Actions does it
#
# Gems are cached in the Docker volume "ctaverna-blog-bundle":
# `docker volume rm ctaverna-blog-bundle` to start from scratch.
set -euo pipefail
cd "$(dirname "$0")"

image="ruby:$(tr -d '[:space:]' < .ruby-version)"
tty=()
[[ -t 0 && -t 1 ]] && tty=(-it)

run() {
  docker run --rm ${tty[@]+"${tty[@]}"} \
    -v "$PWD:/srv/jekyll" -w /srv/jekyll \
    -v ctaverna-blog-bundle:/usr/local/bundle \
    "$@"
}

if [[ ${1-} == build ]]; then
  shift
  run -e JEKYLL_ENV=production "$image" \
    sh -c 'bundle install --quiet && bundle exec jekyll build "$@"' jekyll "$@"
else
  # JEKYLL_ENV=production: in "development" jekyll serve replaces site.url with the address it
  # listens on, 0.0.0.0 inside the container, and browsers block images loaded from 0.0.0.0.
  # The URL comes from _config_local.yml instead (localhost:4000, analytics off).
  run -e JEKYLL_ENV=production -p 4000:4000 -p 35729:35729 "$image" \
    sh -c 'bundle install --quiet && exec bundle exec jekyll serve --host 0.0.0.0 \
      --livereload --force_polling --config _config.yml,_config_local.yml "$@"' jekyll "$@"
fi
