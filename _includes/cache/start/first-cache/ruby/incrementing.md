require 'iron_cache'

# For configuration info, see http://dev.iron.io/articles/configuration
cache = IronCache::Client.new()

# Numbers can be incremented
cache.items.increment("number_item", -10, {:cache_name => "test_cache"})

# Everything else throws a 400 error
cache.items.increment("number_item", "a lot", {:cache_name => "test_cache"})
cache.items.increment("string_item", 10, {:cache_name => "test_cache"})
cache.items.increment("complex_item", 10, {:cache_name => "test_cache"})
