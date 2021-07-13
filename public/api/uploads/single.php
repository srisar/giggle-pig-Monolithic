<?php

declare( strict_types=1 );

use App\Core\Http\Auth;
use App\Core\Http\JSONResponse;
use App\Core\Http\Request as Request;
use App\Core\Http\Storage as Storage;
use App\Core\Http\Uploader;
use App\Core\Resources\MimeTypes;

require_once "../../../bootstrap.php";

$MAX_UPLOAD_SIZE = 5 * 1024 * 1024; // 1MB in bytes

try {

    /*
     * Authenticate for incoming auth key
     * if no valid key is present, will return 401
     * */
    Auth::authenticate();

    $file = Request::getFile( "file" );

    if ( empty( $file ) ) throw new Exception( "No file uploaded" );

    $uploader = new Uploader( $file, $MAX_UPLOAD_SIZE, "images", MimeTypes::IMAGE_MIMES );

    $path = $uploader->storeUploadFile( "img", );

    JSONResponse::validResponse( $path );
    return;

} catch ( Exception $exception ) {
    JSONResponse::exceptionResponse( $exception );
}
