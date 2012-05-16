from iron_cache import *

# For configuration info, see http://dev.iron.io/articles/configuration
cache = IronCache()

# Set the default cache name
cache.name = "test_cache"

# Numbers will get stored as numbers
print cache.get(key="number_item")

# Strings get stored as strings
print cache.get(key="string_item")

# Objects and dicts get JSON-encoded and stored as strings
print cache.get(key="complex_item")
