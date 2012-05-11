from iron_cache import *

# For configuration info, see http://dev.iron.io/articles/configuration
cache = IronCache()

# Set the default cache name
cache.name = "test_cache"

# Numbers will get stored as numbers
cache.put(key="number_item", value=42)

# Strings get stored as strings
cache.put(key="string_item", value="Hello, IronCache")

# Objects and dicts get JSON-encoded and stored as strings
complex_item = {"test": "this is a dict", "args": ["apples", "oranges"] }
cache.put(key="complex_item", value=complex_item)
