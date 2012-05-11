require 'iron_cache'

# For configuration info, see http://dev.iron.io/articles/configuration
cache = IronCache::Client.new()

# Set the default cache name
cache.cache_name = "test_cache"

# Numbers will get stored as numbers
cache.items.put("number_item", 42)

# Strings get stored as strings
cache.items.put("string_item", "Hello, IronCache")

# Objects and dicts get JSON-encoded and stored as strings
complex_item = {"test" => "this is a dict", "args" => ["apples", "oranges"] }
cache.items.put("complex_item", complex_item)
