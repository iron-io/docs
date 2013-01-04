---
title: Image Processing
layout: default
permalink: /solutions/image-processing
categories:
  - solutions
section: solutions
summary: Processing images is a common need in social apps. Whether it’s generating thumbnails, resizing photos, or adding effects, Iron.io can help you offload and scale out the effort.
breadcrumbs:
  - ['Image Processing', '/image-processing']
---

<div class="alert">
<p>Want to get right to the good stuff? <a href="https://github.com/iron-io/iron_worker_examples/tree/master/ruby_ng/image_processing"
title="Image processing example on Github">Download the code from Github</a>.</p>
</div>

Processing images is a key part of most social, retail, and mobile applications. 
Almost every application that uses photos needs to perform some manipulation 
on them to get them into a useful format.

Let's say you have a lot of images coming into your app in certain sizes and 
formats. How do you convert them to thumbnails, resize them, apply color 
filters, or perform other transformations automatically without a lot of 
effort? It's easy to do these things programmatically using the ImageMagick 
libraries. These types of jobs are best done in the background&mdash;no 
reason to eat up front-end cycles and make users wait. The issue, then, is 
setting up the environment and scalable infrastructure to run the processing 
on&mdash;that's where IronWorker comes in.

Managing servers to handle intermittent requests is not much fun. And if you 
convert batches of images at a time, it could take hours running on self-managed 
infrastructure. With IronWorker and the ImageMagick code libraries, that effort 
can be scaled-out on demand, without you having to manage a thing.

<p style="text-align: center;">
<img src="/images/image-processing-steps.png" alt="Image processing diagram" />
</p>

## Requirements

The examples we'll create here use the following gems. Your specific use case 
may vary, but these are generally a good starting point.

* `open-uri`
* `RMagick`
* `aws`
* `subexec`
* `mini_magick`

The ImageMagick binary libraries are already installed in the IronWorker 
[system environment](/worker/languages/ruby/#environment). You'll probably 
need to include client libraries to interface with the binary libraries, 
however. You can find more information on including gems on the 
[Merging Gems page](/worker/languages/ruby/merging-gems).

## Writing the Worker

The first step for any worker is to write (and test!) the code on your local 
machine. IronWorker's environment is simply a Linux sandbox, so any code that 
runs on your system, assuming you properly package it, should run exactly the 
same on the IronWorker cloud.

### Passing Information

It's generally best to pass IDs or URLs to images in the payload of the worker, 
as opposed to the images themselves&mdash;workers have a limited data payload 
size, and there's less opportunity for corruption of data. The worker will 
then use this unique identifier to retrieve the files to be processed and 
bring them into your worker's environment.

In this, example, an image URL is passed in to the worker as a data param. The 
file is written to the temporary, private storage each worker is given. You can 
see the [System Environment](/worker/reference/environment) page for more 
information about the amount of memory and storage available to each worker.

### Retrieving the Image

Retrieving the image is a simple matter of downloading it over HTTP:

<figcaption><span>image_processor.rb </span></figcaption>
{% highlight ruby %}
def download_image
  filename = 'ironman.jpg'
  filepath = filename
  File.open(filepath, 'wb') do |fo|
    fo.write open(@params['image_url']).read
  end
  filename
end
{% endhighlight %}

### Storing the Image

After processing the image, you're going to want to store it somewhere else
&mdash;IronWorker's storage is only temporary, and it's completely wiped after 
the worker finishes running. This means that you don't have to worry about 
cleaning up your environment after your task is done, but it also means that 
you need to store the files somewhere before the worker finishes running. In 
this example, we're going to upload them to [Amazon S3](http://aws.amazon.com/s3) 
using the `aws` gem. Note that `@aws_access`, `@aws_secret`, and `@aws_s3_bucket` 
will all need to be included in the task's payload.

<figcaption><span>image_processor.rb </span></figcaption>
{% highlight ruby %}
def upload_file(filename)
  filepath = filename
  puts "\nUploading the file to s3..."
  s3 = Aws::S3Interface.new(@params['aws_access'], @params['aws_secret'])
  s3.create_bucket(@params['aws_s3_bucket_name'])
  response = s3.put(@params['aws_s3_bucket_name'], filename, File.open(filepath))
  if (response == true)
    puts "Uploading succesful."
    link = s3.get_link(@params['aws_s3_bucket_name'], filename)
    puts "\nYou can view the file here on s3:\n" + link
  else
    puts "Error placing the file in s3."
  end
  puts "-"*60
end
{% endhighlight %}

### Manipulating the Image

Let's create a sample set of functions that process the image in various 
ways. (ImageMagick is an incredibly comprehensive library, so this is just 
a small sample of what's possible.)

We'll use the following variables in these sample functions:

<table class="reference">
<tr>
  <th style="width: 25%;">Variable</th>
  <th style="width: 75%;">Meaning</th>
</tr>
<tr>
  <td>filename</td>
  <td>The path to the file you're manipulating. The file needs to be in 
      your worker's environment.</td>
</tr>
<tr>
  <td>width</td>
  <td>The width, in pixels, of the post-manipulation image.</td>
</tr>
<tr>
  <td>height</td>
  <td>The height, in pixels, of the post-manipulation image.</td>
</tr>
<tr>
  <td>format</td>
  <td>The image format to output the post-manipulation image in.</td>
</tr>
</table>

#### Resizing Images

<figcaption><span>image_processor.rb </span></figcaption>
{% highlight ruby %}
def resize_image(filename, width=nil, height=nil, format='jpg')
  image = MiniMagick::Image.open(filename)
  original_width, original_height = image[:width], image[:height]
  width ||= original_width
  height ||= original_height
  output_filename = "#{filename}_thumbnail_#{width}_#{height}.#{format}"
  image.resize "#{width}x#{height}"
  image.format format
  image.write output_filename
  output_filename
end
{% endhighlight %}

#### Generating a Thumbnail

<figcaption><span>image_processor.rb </span></figcaption>
{% highlight ruby %}
def generate_thumb(filename, width=nil, height=nil, format='jpg')
  output_filename = "#{filename}_thumbnail_#{width}_#{height}.#{format}"
  image = MiniMagick::Image.open(filename)
  image.combine_options do |c|
    c.thumbnail "#{width}x#{height}"
    c.background 'white'
    c.extent "#{width}x#{height}"
    c.gravity "center"
  end
  image.format format
  image.write output_filename
  output_filename
end
{% endhighlight %}

#### Making a Sketch of an Image

<figcaption><span>image_processor.rb </span></figcaption>
{% highlight ruby %}
def sketch_image(filename, format='jpg')
  output_filename = "#{filename}_sketch.#{format}"
  image = MiniMagick::Image.open(filename)
  image.combine_options do |c|
    c.edge "1"
    c.negate
    c.normalize
    c.colorspace "Gray"
    c.blur "0x.5"
  end
  image.format format
  image.write output_filename
  output_filename
end
{% endhighlight %}

#### Normalizing Image Colors

<figcaption><span>image_processor.rb </span></figcaption>
{% highlight ruby %}
def normalize_image(filename, format='jpg')
  output_filename = "#{filename}_normalized.#{format}"
  image = MiniMagick::Image.open(filename)
  image.normalize
  image.format format
  image.write output_filename
  output_filename
end
{% endhighlight %}

### Putting It All Together

We've built all the tools, let's tie them together in a single worker now.

<figcaption><span>image_processor.rb </span></figcaption>
{% highlight ruby %}
puts "Downloading image"

filename = download_image()

puts "Generating square thumbnail"
processed_filename = generate_thumb(filename, 50, 50)
upload_file(processed_filename)

puts "Generating small picture"
processed_filename = resize_image(filename, nil, 100)
upload_file(processed_filename)

puts "Generating normal picture"
processed_filename = resize_image(filename, nil, 200)
upload_file(processed_filename)

puts "Generating picture with tuned levels"
processed_filename = level_image(filename, 10, 250, 1.0)
upload_file(processed_filename)

puts "Tune picture"
processed_filename = normalize_image(filename)
upload_file(processed_filename)

puts "Generating sketch from picture"
processed_filename = sketch_image(filename)
upload_file(processed_filename)

puts "Generating charcoal_sketch from picture"
processed_filename = charcoal_sketch_image(filename)
upload_file(processed_filename)

puts "Cutting image to 6 puzzles 3x3"
file_list = tile_image(filename, 3, 3)

puts "List of images ready to process,merging in one image"
processed_filename = merge_images(3, 3, file_list)
upload_file(processed_filename)
{% endhighlight %}

## Uploading the Worker

Uploading the worker is pretty simple. We're going to use the IronWorker 
[command line tool](/worker/reference/cli), to make life easier.

Save the following as `image_processor.worker`:

<figcaption><span>image_processor.worker </span></figcaption>
{% highlight ruby %}
gem 'aws'
gem 'subexec'
gem 'mini_magick'
exec 'image_processor.rb' # Whatever you named the worker script
{% endhighlight %}

Now to upload the worker, just navigate to the directory with the `.worker` 
file and the worker script, and run:

<figcaption><span>Command Line </span></figcaption>
{% highlight bash %}
$ iron_worker upload image_processor
{% endhighlight %}

## Processing Images With the Worker

To process images with the worker, you just need to queue a task with the 
necessary parameters (your AWS credentials and the URL for the image).

Here's an example from the command line:

<figcaption><span>Command Line </span></figcaption>
{% highlight bash %}
$ iron_worker queue ImageProcessor -p '{"aws_access": "AWS ACCESS KEY", "aws_secret": "AWS SECRET KEY", "aws_s3_bucket_name": "AWS BUCKET NAME", "image_url": "http://dev.iron.io/images/iron_pony.png"}'
{% endhighlight %}

You can also queue tasks from within your application:

<figcaption><span>image_processor.rb </span></figcaption>
{% highlight ruby %}
client.tasks.create(
'ImageProcessor', 
:aws_access => "AWS ACCESS KEY",
:aws_secret => "AWS SECRET KEY",
:aws_s3_bucket_name => "AWS BUCKET NAME",
:image_url => "http://dev.iron.io/images/iron_pony.png",
)
{% endhighlight %}

## On Github

You can find all the code for this example worker [on Github](https://github.com/iron-io/iron_worker_examples/tree/master/ruby_ng/image_processing).
Feel free to copy, edit, and run it on IronWorker! :)

## Next Steps

Any article on ImageMagick will necessarily omit a lot of the power that 
the library provides&mdash;there are just too many options and commands. If 
you're interested in doing more with ImageMagick, check out the official 
documentation on the ImageMagick [website](http://www.imagemagick.org) for a 
much more in-depth look at the possibilities.

For those using ImageMagick from Ruby, we recommend the [MiniMagick gem](https://github.com/probablycorey/mini_magick)
&mdash;it's a wrapper for the command line utility that uses less memory than the RMagick gem.
