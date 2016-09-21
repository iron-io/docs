require 'rubygems'
require 'json'
require 'nokogiri'


module Jekyll

  class Indexer < Generator

    def initialize(config = {})
      super(config)
      return if ARGV.include?("--no-lunr-index")

      lunr_config = {
        'excludes' => [],
        'strip_index_html' => false,
        'min_length' => 3,
        'stopwords' => 'stopwords.txt'
      }.merge!(config['lunr_search'] || {})

      @excludes = lunr_config['excludes']

      # if web host supports index.html as default doc, then optionally exclude it from the url
      @strip_index_html = lunr_config['strip_index_html']

      # stop word exclusion configuration
      @min_length = lunr_config['min_length']
      @stopwords_file = lunr_config['stopwords']
    end

    # Index all pages except pages matching any value in config['lunr_excludes'] or with date['exclude_from_search']
    # The main content from each page is extracted and saved to disk as json
    def generate(site)
      if @index.nil?
        Jekyll.logger.info "Lunr:", 'Skipping search indexing at user request'
        return
      end

      # gather pages and posts
      items = pages_to_index(site)
      content_renderer = PageRenderer.new(site)
      index = []
      p "processing #{items.count} pages"
      items.each do |item|
          entry = SearchEntry.create(item, content_renderer)
          entry.strip_index_suffix_from_url! if @strip_index_html
          entry.strip_stopwords!(stopwords, @min_length) if File.exists?(@stopwords_file)
          puts entry.body.split.slice(0, 60).join(" ")
          puts "*"
          index << {
            :title => entry.title,
            :url => entry.url,
            :section => (entry.section if entry.respond_to?(:section)),
            :date => entry.date,
            :categories => entry.categories,
            :summary => (entry.summary if entry.respond_to?(:summary)),
            :short => entry.body.split.slice(0, 60).join(" "),
            :body => entry.body
          }
        # puts 'Indexed ' << "#{entry.title} (#{entry.url})"
      end

      p "done generating json"
      json = JSON.generate({:entries => index})

      # Create destination directory if it doesn't exist yet. Otherwise, we cannot write our file there.
      Dir::mkdir(site.dest) unless File.directory?(site.dest)

      # File I/O: create search.json file and write out pretty-printed JSON
      filename = 'search.json'

      File.open(File.join(site.dest, filename), "w") do |file|
        file.write(json)
      end

      # Keep the search.json file from being cleaned by Jekyll
      site.static_files << Jekyll::SearchIndexFile.new(site, site.dest, "/", filename)
    end

  private

    # load the stopwords file
    def stopwords
      @stopwords ||= IO.readlines(@stopwords_file).map { |l| l.strip }
    end

    def pages_to_index(site)
      items = []

      # deep copy pages
      site.pages.each {|page| items << page.dup }
      site.posts.each {|post| items << post.dup }

      # only process files that will be converted to .html and only non excluded files
      items.select! {|i| i.output_ext == '.html' && ! @excludes.any? {|s| (i.url =~ Regexp.new(s)) != nil } }
      items.reject! {|i| i.data['exclude_from_search'] }

      items
    end
  end
end

module Jekyll

  class PageRenderer
    def initialize(site)
      @site = site
    end

    # render the item, parse the output and get all text inside <p> elements
    def render(item)
      item.render({}, @site.site_payload)
      doc = Nokogiri::HTML(item.output)
      paragraphs = doc.search('//text()').map {|t| t.content }
      paragraphs = paragraphs.join(" ").gsub("\r", " ").gsub("\n", " ").gsub("\t", " ").gsub(/\s+/, " ")
    end
  end

end

module Jekyll

  class SearchEntry
    def self.create(page_or_post, renderer)
      return create_from_post(page_or_post, renderer) if page_or_post.is_a?(Jekyll::Post)
      return create_from_page(page_or_post, renderer) if page_or_post.is_a?(Jekyll::Page)
      raise 'Not supported'
    end

    def self.create_from_page(page, renderer)
      title, url, section = extract_title_and_url_and_section(page)
      body = renderer.render(page)
      date = nil
      categories = []

      SearchEntry.new(title, url, date, categories, body)
    end

    def self.create_from_post(post, renderer)
      title, url = extract_title_and_url_and_section(post)
      body = renderer.render(post)
      date = post.date
      categories = post.categories

      SearchEntry.new(title, url, date, categories, body)
    end

    def self.extract_title_and_url_and_section(page)
      data = page.to_liquid
      # p data.keys
      [ data['title'], data['url'], data['section'] ]
    end

    attr_reader :title, :url, :date, :categories, :body

    def initialize(title, url, date, categories, body)
      @title, @url, @date, @categories, @body = title, url, date, categories, body
    end

    def strip_index_suffix_from_url!
      @url.gsub!(/index\.html$/, '')
    end

    # remove anything that is in the stop words list from the text to be indexed
    def strip_stopwords!(stopwords, min_length)
      @body = @body.split.delete_if() do |x|
        t = x.downcase.gsub(/[^a-z]/, '')
        t.length < min_length || stopwords.include?(t)
      end.join(' ')
    end
  end
end
module Jekyll

  class SearchIndexFile < StaticFile
    # Override write as the search.json index file has already been created
    def write(dest)
      true
    end
  end

end
