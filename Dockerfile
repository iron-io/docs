FROM ruby

RUN mkdir -p /irondocs
ADD . /irondocs
WORKDIR /irondocs

RUN bundle install
