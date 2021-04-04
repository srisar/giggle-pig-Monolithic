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


    public static function build($array): self
    {
        $object = new self();
        foreach ($array as $key => $value) {
            $object->$key = $value;
        }
        return $object;
    }


    public static function find(int $id): ?User
    {
        return Database::find(self::TABLE, $id, self::class);
    }

    /**
     * @param int $limit
     * @param int $offset
     * @return User[]
     */
    public static function findAll($limit = 1000, $offset = 0): array
    {
        return Database::findAll(self::TABLE, $limit, $offset, self::class, 'username');
    }

    /**
     * @return bool|int|null
     * @throws Exception
     */
    public function insert()
    {

        if ($this->usernameAlreadyExist($this->username)) throw new Exception('Username already exist');

        $hash = password_hash($this->password, PASSWORD_DEFAULT);

        $data = [
            'username' => $this->username,
            'full_name' => $this->full_name,
            'role' => $this->role,
            'email' => $this->email,
            'password_hash' => $hash,
        ];

        return Database::insert(self::TABLE, $data);

    }

    public function update()
    {
        // TODO: Implement update() method.
    }

    public function delete()
    {
        // TODO: Implement delete() method.
    }

    /*-------------------------------------------*/


    public function usernameAlreadyExist($username): bool
    {

        $db = Database::instance();
        $statement = $db->prepare('select * from users where username=?');
        $statement->execute([$username]);

        $result = $statement->fetchObject(self::class);

        if (empty($result)) return false;
        return true;

    }

    public static function userExist($username, $password): ?User
    {


        $db = Database::instance();
        $statement = $db->prepare('select * from users where username=?');
        $statement->execute([$username]);

        /** @var User $result */
        $result = $statement->fetchObject(self::class);

        if (!empty($result)) {

            if (password_verify($password, $result->password_hash)) {
                return $result;
            }

        }
        return null;

    }
}
