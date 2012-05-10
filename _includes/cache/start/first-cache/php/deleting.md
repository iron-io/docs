<?php
require_once "phar://iron_cache.phar";

// For configuration info, see http://dev.iron.io/articles/configuration
$cache = new IronCache();

// Immediately delete an item
$cache->delete("test_cache", "string_item");
