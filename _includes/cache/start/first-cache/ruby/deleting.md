require 'iron_cache'

# For configuration info, see http://dev.iron.io/articles/configuration
cache = IronCache::Client.new()

# Set the default cache name
cache.cache_name = "test_cache"

# Immediately delete an item
cache.items.delete("string_item")
