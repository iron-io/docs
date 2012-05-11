from iron_cache import *

# For configuration info, see http://dev.iron.io/articles/configuration
cache = IronCache()

# Set the default cache name
cache.name = "test_cache"

# Numbers can be incremented
cache.increment(key="number_item", amount=10)

# Everything else throws a 400 error
cache.increment(key="number_item", amount="a lot")
cache.increment(key="string_item", amount=10)
cache.increment(key="complex_item", amount=10)
