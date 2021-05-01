<?php

declare(strict_types=1);

require_once 'vendor/autoload.php';


use App\Core\Database\Database;
use App\Core\Http\Request;

Request::cors();

$db_config = [
    'HOST' => 'localhost',
    'DATABASE' => 'phpvue',
    'USERNAME' => 'root',
    'PASSWORD' => '',
];

Database::init($db_config);
