from iron_cache import *

# For configuration info, see http://dev.iron.io/articles/configuration
cache = IronCache()

# Set the default cache name
cache.name = "test_cache"

# Immediately delete an item
cache.delete(item="string_item")
