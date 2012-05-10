from iron_cache import *

# For configuration info, see http://dev.iron.io/articles/configuration
cache = IronCache()

# Numbers can be decremented
cache.increment(cache="test_cache", key="number_item", amount=-10)

# Everything else throws a 400 error
cache.increment(cache="test_cache", key="number_item", amount="negative a lot")
cache.increment(cache="test_cache", key="string_item", amount=-10)
cache.increment(cache="test_cache", key="complex_item", amount=-10)
