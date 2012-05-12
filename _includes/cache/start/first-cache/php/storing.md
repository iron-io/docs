<?php
require_once "phar://iron_cache.phar";

// For configuration info, see http://dev.iron.io/articles/configuration
$cache = new IronCache();

// Set the default cache name
$cache->setCacheName('test_cache');

// Numbers will get stored as numbers
$cache->put("number_item", 42);

// Strings get stored as strings
$cache->put("string_item", "Hello, IronCache");

// Objects and dicts get JSON-encoded and stored as strings
$complex_item = array("test" => "this is a dict", "args" => array("apples", "oranges"));
$cache->put("complex_item", $complex_item);
