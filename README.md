# PhpVue

![](https://raw.githubusercontent.com/srisar/php_vue_framework/master/vue/assets/images/phpvue-logo.png)

PHPVue application framework is a minimal framework/template to develop applications with PHP backend and Vue.js-based front-end SPA. It is not a replacement
for any production ready frameworks such as Laravel or Symphony.

It comes with an authentication mechanism for Vue, and a way to authenticate API calls from backend php. Using a simple auth-key based authentication.

This project is strictly for educational purpose as to understand and study how can we write authentication mechanism in php ourselves.

### How to set up

1. Once cloned the repo, make sure the public folder inside the project is pointed as serving folder for the http server.
2. Run the SQL file in the project to set up the user table with admin user for login/authentication.
3. bootstrap.php file contains the connection details for the database server. Update the username, password and database name if needed.
4. run `npm install` to set up Vue building workflow. The project comes with Laravel-mix for building Vue SPA. After running `npm install` you can use `npx mix`
   to build Vue code, or use `npx mix watch` to run watch process that watch for any source code modification and build on the fly. more
   details [here.](https://laravel-mix.com/docs/6.0/upgrade#update-your-npm-scripts)

### Login details

Once you run the SQL file, you will have a single user (Administrator) in the database.

You can log in to the app using the following credentials.

`username: admin`

`password: admin`

### Libraries Used

**PHP**:

- nesbot/carbon

**JavaScript:**

- Vue.js, Vuex, Vue-Router
- axios
- lodash

**CSS**

- Bootstrap 5

**Build tools**

- Laravel-mix
