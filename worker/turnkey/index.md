---
title: IronWorker: Turnkey Workers : Deploying Workers from Github
layout: default
section: worker
breadcrumbs:
  - ['Turnkey Workers', '/turnkey']
---

Turnkey workers are pre-made workers you can add to your account and start using immediately. No coding required!
And it doesn't matter which language the workers are written in because you can queue up jobs for these workers from
any language using our API.

The basic usage for all of these is:

1. iron_worker upload http://github.com/PATH_TO_WORKER_FILE
2. Queue up tasks for the worker or schedule it.

That's it!  Super easy, super powerful. [See this blog post on shareable workers for more background.](http://blog.iron.io/2012/11/sharable-open-source-workers-for.html)

## Turnkey Worker List

- [Hello Worker](https://github.com/treeder/hello_worker) - a simple example worker to try it out
- [Image Processing Worker](https://github.com/treeder/image_processing_worker) - process images at scale using ImageMagick, no servers required!
- [Email Worker](https://github.com/treeder/email_worker) - send emails through any smtp provider
- [Twilio Worker](https://github.com/treeder/twilio_worker) - send twilio messages
- [Hipchat Worker](https://github.com/treeder/hipchat_worker) - send message to hipchat
- [FFmpeg video processing Worker](https://github.com/thousandsofthem/workers/tree/master/ffmpeg_turn_key) - process videos at scale using ffmpeg

## Contributing

To add a worker you made to this list, just fork our [Dev Center repository](https://github.com/iron-io/docs),
add your worker to this page, then submit a pull request.

