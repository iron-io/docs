<?php
require_once "phar://iron_cache.phar";

// For configuration info, see http://dev.iron.io/articles/configuration
$cache = new IronCache();

// Numbers will get stored as numbers
$cache->put("test_cache", "number_item", 42);

// Strings get stored as strings
$cache->put("test_cache", "string_item", "Hello, IronCache");

// Objects and dicts get JSON-encoded and stored as strings
$complex_item = array"test" => "this is a dict", "args" => array("apples", "oranges"));
$cache->put("test_cache", "complex_item", complex_item);
