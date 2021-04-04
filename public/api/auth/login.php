<?php

declare(strict_types=1);

use App\Core\Http\JSONResponse;
use App\Core\Http\Request;
use App\Models\AuthKey;
use App\Models\User;

require_once "../../../bootstrap.php";

try {

    $fields = [
        'username' => Request::getAsString('username'),
        'password' => Request::getAsString('password'),
    ];

    $loggedInUser = User::userExist($fields['username'], $fields['password']);

    if (!is_null($loggedInUser)) {

        $key = AuthKey::generateAuthKey($loggedInUser);

        $user = [
            'username' => $loggedInUser->username,
            'email' => $loggedInUser->email,
            'full_name' => $loggedInUser->full_name,
            'role' => $loggedInUser->role,
        ];

        JsonResponse::validResponse(['auth_key' => $key, 'user' => $user]);
        return;

    }

    JsonResponse::invalidResponse('Login failed');
    return;


} catch (Exception $exception) {
    JSONResponse::exceptionResponse($exception);
}
