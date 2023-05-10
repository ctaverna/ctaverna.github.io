#!/bin/bash

# Serve
docker run --rm --volume="$PWD:/srv/jekyll:Z" -p 4000:4000 -p 4001:4001 -e JEKYLL_ENV=production jekyll/jekyll jekyll serve --watch --force_polling --livereload --livereload-port 4001 --config _config.yml,_config_local.yml
