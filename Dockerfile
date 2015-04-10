FROM razic/bundler

RUN mkdir -p /iron/docs
ADD Gemfile /iron/docs/Gemfile
WORKDIR /iron/docs
RUN bundle install

ENTRYPOINT ["bundle"]
