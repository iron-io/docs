require 'iron_cache'

# For configuration info, see http://dev.iron.io/articles/configuration
cache = IronCache::Client.new()

# Set the default cache name
cache.cache_name = "test_cache"

# Numbers will get stored as numbers
p cache.items.get("number_item").value

# Strings get stored as strings
p cache.items.get("string_item").value

# Objects and dicts get JSON-encoded and stored as strings
p cache.items.get("complex_item").value
