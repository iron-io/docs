<?php
require_once "phar://iron_cache.phar";

// For configuration info, see http://dev.iron.io/articles/configuration
$cache = new IronCache();

// Set the default cache name
$cache->setCacheName('test_cache');

// Immediately delete an item
$cache->delete("string_item");
