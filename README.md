# Master detail project

    This project is a backend server application developed using Node.js and TypeScript. It provides a robust authentication system using JSON Web Tokens (JWT) for securing the API endpoints. The database management is handled by CockroachDB, a scalable and distributed SQL database.

    Key Features:

     - User Authentication: The project allows users to register, log in, and manage their accounts securely. It implements a token-based authentication system using JWT, which ensures that only authenticated users can access protected routes.

    - Registration and Login: Users can create new accounts by providing their email address and password. The passwords are securely hashed and stored in the database. Registered users can then log in using their credentials to obtain an access token.

    - JWT-based Authorization: Once authenticated, users receive a JSON Web Token, which they can include in subsequent requests to authenticate and authorize their access to protected API endpoints. The server verifies the JWT signature and grants or denies access accordingly.

    - CockroachDB Integration: The project utilizes CockroachDB, a distributed SQL database, for data storage and retrieval. It establishes a connection to the CockroachDB cluster and handles CRUD (Create, Read, Update, Delete) operations for user-related data, such as account information and authentication details.


## Basic Requirements

1. Install Node.js (lts-version v18.12.1)
2. Install `yarn` if not present `curl -o- -L https://yarnpkg.com/install.sh | bash` (macOS and generic Unix environments)
3. Install required dependencies by `yarn`
4. `cp .example.env .env.dev`
5. `cp .example.env.test .env.test`
6. Connect your CockroachDB (surely you should download the certificate issued by cockroachDB on your computer) and create your REDIS connection using docker.
7. Run `ENV=[dev, test, prod] yarn db:setup`.
8. Start your server with `ENV=[dev, prod] yarn dev`.

## Some scripts

Add `ENV=[dev, prod]` before running scripts.
Why?: [Configuration file used by Typeorm](https://typeorm.io/#/using-ormconfig/which-configuration-file-is-used-by-typeorm)

Run `yarn build` to build js from typescript source.

Run `yarn start` to start the server from the compiled folder (/dist).

Run `yarn test` to run tests.

Run `yarn dev` to start and automatically detect any source-code changes, restarting the server as well.

Run `yarn typeorm schema:drop` to drop your schema of the DB.

Run `yarn typeorm schema:sync` to resync the schema of your DB.

Run `yarn seed:run` to run seed files.

Run `yarn db:reset` to drop schema and re run it, then seed the DB.

Run `yarn typeorm migration:generate -n <migration's name>` to create a new migration.

Run `yarn typeorm migration:run` to run pending migrations.

Run `yarn typeorm migration:revert` to rollback migrations.

Run `yarn typeorm migration:show` to see the list of all migrations (pending and also ran).