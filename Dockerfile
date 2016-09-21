FROM iron/ruby:dev

RUN apk update && apk upgrade 
RUN apk add nodejs
    
WORKDIR /app
ADD Gemfile* /app/
RUN bundle install

# ADD . /worker/
ENTRYPOINT ["jekyll"]
