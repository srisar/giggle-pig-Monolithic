<?php


namespace App\Core\Http;


use App\Models\AuthKey;
use App\Models\User;
use Exception;

class Auth
{
    /**
     * Tries to authenticate the incoming request with key
     * @param array $user_types - user role types which the incoming key
     *                            has access to.
     * @return bool
     */
    public static function authenticate( array $user_types = User::ROLES_ALL ): bool
    {

        /* gets the auth key from request */
        $authKey = Request::getAuthKey();

        if ( !empty( $authKey ) ) {
            $authInstance = AuthKey::validateAuthKey( $authKey );

            if ( !empty( $authInstance ) ) {
                if ( in_array( $authInstance->user->role, $user_types ) ) return true;
            }
        }

        JsonResponse::invalidResponse( [ "error" => "Authentication failed" ], 401 );
        die();

    }
}
