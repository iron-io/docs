from iron_cache import *

# For configuration info, see http://dev.iron.io/articles/configuration
cache = IronCache()

# Numbers will get stored as numbers
print cache.get(cache="test_cache", key="number_item")

# Strings get stored as strings
print cache.get(cache="test_cache", key="string_item")

# Objects and dicts get JSON-encoded and stored as strings
print cache.get(cache="test_cache", key="complex_item")
