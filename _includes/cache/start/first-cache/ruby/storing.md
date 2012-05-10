require 'iron_cache'

# For configuration info, see http://dev.iron.io/articles/configuration
cache = IronCache::Client.new()

# Numbers will get stored as numbers
cache.items.put("number_item", 42, {:cache_name => "test_cache"})

# Strings get stored as strings
cache.items.put("string_item", "Hello, IronCache", {:cache_name => "test_cache"})

# Objects and dicts get JSON-encoded and stored as strings
complex_item = {"test" => "this is a dict", "args" => ["apples", "oranges"] }
cache.items.put("complex_item", complex_item, {:cache_name => "test_cache"})
