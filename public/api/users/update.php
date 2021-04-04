<?php

declare(strict_types=1);

use App\Core\Http\Auth;
use App\Core\Http\JSONResponse;
use App\Core\Http\Request;
use App\Models\User;

require_once "../../../bootstrap.php";

try {

    /*
     * Authenticate for incoming auth key
     * if no valid key is present, will return 401
     * */
    Auth::authenticate();



//    $fields = [
//        'id' => Request::getAsInteger('id', true),
//        'full_name' => Request::getAsString('full_name'),
//        'username' => Request::getAsString('username'),
//        'email' => Request::getAsString('email'),
//    ];
//
//    foreach ($fields as $field) {
//        if (empty($field)) throw new Exception(sprintf("Required field missing"));
//    }


    JSONResponse::validResponse(['fields' => $fields]);
    return;


} catch (Exception $exception) {
    JSONResponse::exceptionResponse($exception);
}
