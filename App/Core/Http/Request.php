<?php


namespace App\Core\Http;


use Exception;

class Request
{

    public const REQUEST_GET = 'GET';
    public const REQUEST_POST = 'POST';

    public const METHOD_GET = 'GET';
    public const METHOD_POST = 'POST';
    public const METHOD_PUT = 'PUT';
    public const METHOD_DELETE = 'DELETE';
    public const METHOD_PATCH = 'PATCH';

    /**
     * Returns the request method: GET, POST, PUT, DELETE and so on..
     * @return string
     */
    public static function method(): string
    {
        return $_SERVER['REQUEST_METHOD'];
    }

    public static function scheme()
    {
        return $_SERVER['REQUEST_SCHEME'];
    }

    public static function host()
    {
        return $_SERVER['HTTP_HOST'];
    }


    /**
     * @param $acceptableMethod
     * @return bool
     * @throws Exception
     */
    public static function validateRequestMethod($acceptableMethod): bool
    {
        if (Request::method() == $acceptableMethod) return true;

        $method = Request::method();
        throw new Exception("$method not accepted");
    }

    /*
     * ---------------------------------------------------------
     * | Request parameters from GET/POST
     * ---------------------------------------------------------
     */
    /**
     * @param string $key
     * @param bool $required
     * @return string|null
     * @throws Exception
     */
    private static function getParam(string $key, $required = false): ?string
    {
        $axios = self::getAxiosData();

        $_REQUEST = array_merge($axios, $_REQUEST);

        if (isset($_REQUEST[$key])) {
            return $_REQUEST[$key];
        }
        if ($required) throw new Exception("Field ({$key}) is required");
        return null;
    }

    /**
     * Returns request parameter value as integer
     * @param string $key
     * @param bool $required
     * @return int|null
     * @throws Exception
     */
    public static function getAsInteger(string $key, $required = false): ?int
    {
        $data = self::getParam($key);

        if (!empty($data)) {
            if ($data == '0') return 0;
            if (filter_var($data, FILTER_VALIDATE_INT)) {
                return (int)$data;
            }
        }
        if ($required) throw new Exception("Field ({$key}) is required");
        return null;
    }

    /**
     * Returns request parameter value as float
     * @param string $key
     * @param bool $required
     * @return float|null
     * @throws Exception
     */
    public static function getAsFloat(string $key, $required = false): ?float
    {
        $data = self::getParam($key);

        if (!empty($data)) {
            if ($data == '0') return 0;
            return filter_var($data, FILTER_VALIDATE_FLOAT);
        }

        if ($required) throw new Exception("Field ({$key}) is required");
        return null;
    }

    /**
     * Returns request parameter value as string
     * @param string $key
     * @param bool $required
     * @return string|null
     * @throws Exception
     */
    public static function getAsString(string $key, $required = false): ?string
    {
        $data = self::getParam($key);
        if (!empty($data)) {
            return filter_var($data, FILTER_SANITIZE_STRING);
        }

        if ($required) throw new Exception("Field ({$key}) is required");
        return null;
    }

    /**
     * @param string $key
     * @param bool $required
     * @return string|null
     * @throws Exception
     */
    public static function getAsRawString(string $key, $required = false): ?string
    {
        $data = self::getParam($key);

        if (empty($data)) throw new Exception("Field ({$key}) is required");
        return $data;
    }

    /**
     * @param string $key
     * @param bool $required
     * @return bool|null
     * @throws Exception
     */
    public static function getAsBoolean(string $key, $required = false): ?bool
    {
        $data = self::getParam($key);
        if (!is_null($data)) {
            return filter_var($data, FILTER_VALIDATE_BOOLEAN);
        }

        if ($required) throw new Exception("Field ({$key}) is required");
        return null;
    }

    /*------------------------------------------------------------*/


    public static function getAuthKey(): string
    {
        if (isset($_SERVER['HTTP_AUTH'])) {
            return $_SERVER['HTTP_AUTH'];
        }
        return '';
    }

    public static function getBasicAuthData(): ?array
    {

        if (isset($_SERVER['HTTP_AUTHORIZATION'])) {

            $data = $_SERVER['HTTP_AUTHORIZATION'];
            $data = explode(" ", $data)[1];
            $data = base64_decode($data);

            return explode(":", $data);

        }
        return null;
    }


    public static function cors()
    {

        // Allow from any origin
        if (isset($_SERVER['HTTP_ORIGIN'])) {
            // Decide if the origin in $_SERVER['HTTP_ORIGIN'] is one
            // you want to allow, and if so:
            header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
            header('Access-Control-Allow-Credentials: true');
            header('Access-Control-Max-Age: 86400');    // cache for 1 day
        }

        // Access-Control headers are received during OPTIONS requests
        if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

            if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
                // may also be using PUT, PATCH, HEAD etc
                header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

            if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
                header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

            exit(0);
        }

    }

    /* ----------------------------------------------------------------------------- */

    private static function getAxiosData(): array
    {

        $data = json_decode(file_get_contents('php://input'), true);

        if (!is_null($data)) return $data;
        return [];

    }
}
