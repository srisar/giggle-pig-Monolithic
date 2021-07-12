<?php


namespace App\Models;


use App\Core\Database\Database;
use Exception;

class User implements IModel
{
    private const TABLE = 'users';

    public const ROLE_ADMIN = 'ADMIN';
    public const ROLE_MANAGER = 'MANAGER';
    public const ROLE_USER = 'USER';


    public ?int $id;
    public ?string $username, $full_name, $password, $password_hash, $email, $role;


    public static function build( $array ): self
    {
        $object = new self();
        foreach ( $array as $key => $value ) {
            $object->$key = $value;
        }
        return $object;
    }


    public static function find( int $id ): ?User
    {
        return Database::find( self::TABLE, $id, self::class );
    }

    /**
     * @param int $limit
     * @param int $offset
     * @return User[]
     */
    public static function findAll( $limit = 1000, $offset = 0 ): array
    {
        return Database::findAll( self::TABLE, $limit, $offset, self::class, 'username' );
    }

    /**
     * @return bool|int|null
     * @throws Exception
     */
    public function insert(): bool|int|null
    {

        if ( $this->usernameAlreadyExist( $this->username ) ) throw new Exception( 'Username already exist' );

        $hash = password_hash( $this->password, PASSWORD_DEFAULT );

        $data = [
            'username' => $this->username,
            'full_name' => $this->full_name,
            'role' => $this->role,
            'email' => $this->email,
            'password_hash' => $hash,
        ];

        return Database::insert( self::TABLE, $data );

    }

    /**
     * @throws Exception
     */
    public function update(): bool
    {

        if ( $this->sameUsernameExist() ) throw new Exception( 'Username already exist' );
        if ( $this->sameEmailExist() ) throw new Exception( 'Email already exist' );

        $data = [
            'username' => $this->username,
            'full_name' => $this->full_name,
            'email' => $this->email,
            'role' => $this->role
        ];

        return Database::update( self::TABLE, $data, [ 'id' => $this->id ] );

    }

    public function delete(): bool
    {
        return Database::delete( self::TABLE, "id", $this->id );
    }


    /**
     * Check if username provided exists for other users in the database
     * @return bool
     */
    public function sameUsernameExist(): bool
    {
        $db = Database::instance();
        $statement = $db->prepare( 'select * from users where username = :username and id != :id' );
        $statement->execute( [
            ':username' => $this->username,
            ':id' => $this->id
        ] );

        $result = $statement->fetchObject( self::class );

        if ( !empty( $result ) ) return true;
        return false;
    }

    /**
     * Check if email provided exists for other users in the database
     * @return bool
     */
    public function sameEmailExist(): bool
    {
        $db = Database::instance();
        $statement = $db->prepare( 'select * from users where email = :email and id != :id' );
        $statement->execute( [
            ':email' => $this->email,
            ':id' => $this->id
        ] );

        $result = $statement->fetchObject( self::class );

        if ( !empty( $result ) ) return true;
        return false;
    }

    /*-------------------------------------------*/


    public function usernameAlreadyExist( $username ): bool
    {

        $db = Database::instance();
        $statement = $db->prepare( 'select * from users where username=?' );
        $statement->execute( [ $username ] );

        $result = $statement->fetchObject( self::class );

        if ( empty( $result ) ) return false;
        return true;

    }

    public static function userExist( $username, $password ): ?User
    {


        $db = Database::instance();
        $statement = $db->prepare( 'select * from users where username=?' );
        $statement->execute( [ $username ] );

        /** @var User $result */
        $result = $statement->fetchObject( self::class );

        if ( !empty( $result ) ) {

            if ( password_verify( $password, $result->password_hash ) ) {
                return $result;
            }

        }
        return null;

    }

    /* ----------------------------------------------------------------------------- */

    public function validatePassword( $password ): bool
    {
        return password_verify( $password, $this->password_hash );
    }

    public function updatePassword( $newPassword ): bool
    {

        $this->password_hash = password_hash( $newPassword, PASSWORD_DEFAULT );

        $data = [
            'password_hash' => $this->password_hash
        ];

        return Database::update( self::TABLE, $data, [ 'id' => $this->id ] );

    }

}
