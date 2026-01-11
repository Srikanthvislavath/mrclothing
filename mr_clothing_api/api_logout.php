<?php
require_once 'auth_init.php';

session_unset();
session_destroy();

json_response(['success' => true]);
