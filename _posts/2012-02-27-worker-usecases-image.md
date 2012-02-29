---
permalink: /worker/articles/usecases/image_processing
title: Image Processing with IronWorker
categories:
 - worker
 - articles
 - usecases
breadcrumbs:
  - ['Articles', '/articles']
  - ['Common Use Cases', '/usecases']
  - ['Image Processing', '/image_processing']
tags:
  - image processing
  - ruby
layout: post
section: worker
---

# Image Processing with IronWorker

IronWorker is great for processing images in the cloud. With just a few lines of code your app can be processing images
in no time and ready to scale should your volume increase.

Your workers have access to [ImageMagick](http://www.imagemagick.org/script/index.php) and all it's runtime capabilities.

Stay tuned for a much more thorough tutorial here, but in the meantime check out our Ruby example of an
image processing worker here.

[https://github.com/iron-io/iron_worker_examples/tree/master/ruby/Image_processing](https://github.com/iron-io/iron_worker_examples/tree/master/ruby/Image_processing)