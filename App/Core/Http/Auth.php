<?php


namespace App\Core\Http;


use App\Models\AuthKey;
use Exception;

class Auth
{
    /**
     * @throws Exception
     */
    public static function authenticate(): bool
    {

        $authKey = Request::getAuthKey();

        if (!empty($authKey)) {
            if (AuthKey::validateAuthKey($authKey)) return true;
        }

        JsonResponse::invalidResponse('Authentication failed', 401);
        die();

    }
}
