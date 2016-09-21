#!/bin/bash
echo "running 'bundle exec jekyll serve' in docker"
CMD="bundle exec jekyll serve"
docker run --net=host -p 4000:4000 -v $PWD:/irondocs -w /irondocs iron/docs $CMD
