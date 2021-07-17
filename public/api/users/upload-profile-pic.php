<?php

declare( strict_types=1 );

use App\Core\Http\Auth;
use App\Core\Http\JSONResponse;
use App\Core\Http\Request;
use App\Core\Http\Uploader;
use App\Core\Resources\MimeTypes;
use App\Models\User;

require_once "../../../bootstrap.php";

$UPLOAD_SIZE = 2 * 1024 * 1024;

try {

    /*
     * Authenticate for incoming auth key
     * if no valid key is present, will return 401
     * */
    Auth::authenticate( User::ROLES_ADMIN_MANAGER );

    $fileObject = Request::getFile( "profile_pic" );
    $userId = Request::getAsInteger( "id", true );

    $user = User::find( $userId );

    if ( empty( $user ) ) throw new Exception( "Invalid user" );

    $uploader = new Uploader( $fileObject, $UPLOAD_SIZE, "images/users/", MimeTypes::IMAGE_MIMES );
    $path = $uploader->storeUploadFile( "profile_" . $user->id . "_" );

    $user->profile_pic = $path;

    if ( $user->updateProfilePic() ) {
        JSONResponse::validResponse( $path );
    }


} catch ( Exception $exception ) {
    JSONResponse::exceptionResponse( $exception );
}
