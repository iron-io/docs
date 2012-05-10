require 'iron_cache'

# For configuration info, see http://dev.iron.io/articles/configuration
cache = IronCache::Client.new()

# Immediately delete an item
cache.items.delete("string_item", {:cache_name => "test_cache"})
