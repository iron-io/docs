<?php
require_once "phar://iron_cache.phar";

// For configuration info, see http://dev.iron.io/articles/configuration
$cache = new IronCache();

// Set the default cache name
$cache->setCacheName('test_cache');

// Numbers can be decremented
$cache->increment("number_item", -10);

// Everything else throws a 400 error
$cache->increment("number_item", "negative a lot");
$cache->increment("string_item", -10);
$cache->increment("complex_item", -10);
