<?php
require_once "phar://iron_cache.phar";

// For configuration info, see http://dev.iron.io/articles/configuration
$cache = new IronCache();

// Set the default cache name
$cache->setCacheName('test_cache');

// Numbers will get stored as numbers
print($cache->get("number_item")->value);

// Strings get stored as strings
print($cache->get("string_item")->value);

// Objects and dicts get JSON-encoded and stored as strings
print($cache->get("complex_item")->value);
