from iron_cache import *

# For configuration info, see http://dev.iron.io/articles/configuration
cache = IronCache()

# Numbers will get stored as numbers
cache.set(cache="test_cache", key="number_item", value=42)

# Strings get stored as strings
cache.set(cache="test_cache", key="string_item", value="Hello, IronCache")

# Objects and dicts get JSON-encoded and stored as strings
complex_item = {"test": "this is a dict", "args": ["apples", "oranges"] }
cache.set(cache="test_cache", key="complex_item", value=complex_item)
