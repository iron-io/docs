<?php
require_once "phar://iron_cache.phar";

// For configuration info, see http://dev.iron.io/articles/configuration
$cache = new IronCache();

// Numbers can be decremented
$cache->increment("test_cache", "number_item", -10);

// Everything else throws a 400 error
$cache->increment("test_cache", "number_item", "negative a lot");
$cache->increment("test_cache", "string_item", -10);
$cache->increment("test_cache", "complex_item", -10);
