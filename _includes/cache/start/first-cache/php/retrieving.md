<?php
require_once "phar://iron_cache.phar";

// For configuration info, see http://dev.iron.io/articles/configuration
$cache = new IronCache();

// Numbers will get stored as numbers
print($cache->get("test_cache", "number_item")->value);

// Strings get stored as strings
print($cache->get("test_cache", "string_item")->value);

// Objects and dicts get JSON-encoded and stored as strings
print($cache->get("test_cache", "complex_item")->value);
