from iron_cache import *

# For configuration info, see http://dev.iron.io/articles/configuration
cache = IronCache()

# Immediately delete an item
cache.delete(cache="test_cache", item="string_item")
