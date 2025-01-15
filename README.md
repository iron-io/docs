Iron.io Dev Center Documentation
================================

The [Dev Center docs] are a [Jekyll] project. Refer to Jekyll's official docs and [Using Jekyll with GitHub Pages][1] for complete help. We give a quick start guide below.

[Dev Center docs]: http://dev.iron.io/
[Jekyll]: http://jekyllrb.com/
[1]: https://help.github.com/articles/using-jekyll-with-pages/

Installation
------------

1. Get [Bundler], the Ruby dependency manager, if you don't have it already.
2. `$ git clone https://github.com/iron-io/docs.git && cd docs`
3. `$ bundle install`

[Bundler]: http://bundler.io/

Launching
---------

1. In the project directory, run `bundle exec jekyll serve`
2. Open your browser to <http://localhost:4000/>

Contributing
-----------

In the project directory, run `bundle exec jekyll serve --watch`. This will auto-reload as you make changes to files.
TODO: not sure if --watch is required anymore?

Please submit all changes as Pull Requests. 

Try not to use HTML unless it's required!  Use markdown for everything if possible. 


## Using Docker to avoid the pain of installing things like nokogiri

1. `docker build -t jekyll .`
1. `docker run --rm -it -v "$PWD":/app -p 4000:4000 jekyll serve --watch --host 0.0.0.0`

Note: to do a bundle update, run `docker run --rm -it -v "$PWD":/app -w /app iron/ruby:dev bundle update`
