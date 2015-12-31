# LeanCloud-server
Server code written for LeanCloud based on the so called cloud code 3.0. 

# Folder Structure
```
<<Root of the project>>
|   config  <<Configurations>>
|   dist    <<Transpiled server code that is going to be deployed>>
|   jsdoc   <<Documentation>>
|   node_modules
|   populator   <<Populate database with production data>>
|   scripts <<Scripts for the project>>
|   server
|   |   └── cloud   <<Cloud code>>
|   |   |   ├── cloudfunction   <<Custom cloud functions>>
|   |   |   ├── controller  <<Per class callbacks>>
|   |   |   └── utility <<Utilities for cloud code>>
|   test
|   ├── fixture <<Mock data shared among all tests>>
|   ├── helper  <<Mocha test helpers>>
|   ├── unit    <<Unit tests>>
|   ├── integration <<Integration tests>>
|   ├── generative  <<Generative tests>>
|   └── system  <<System tests>>
|   .arcconfig  <<Arcanist configuration>>  DO NOT TOUCH
|   .arclint    <<Arcanist configuration>>  DO NOT TOUCH
|   .babelrc    <<Babel configuration>>  DO NOT TOUCH
|   .eslintignore   <<ESLint ignore>>  DO NOT TOUCH
|   .eslintrc   <<ESLint rules>>  DO NOT TOUCH
|   .gitignore  <<Git ignore>>  DO NOT TOUCH
|   .nvmrc  <<NVM configuration>>  DO NOT TOUCH
|   .travis.yml <<Travis configuration>>  DO NOT TOUCH
|   app.js  <<Load and configure server components>>
|   cloud.js    <<Configure cloud code>>
|   gulpfile.babel.js   <<Gulp tasks>>  DO NOT TOUCH
|   jsdoc.conf.json <<JSDoc configuration>>
|   package.json    <<Node.js package.json>>  DO NOT TOUCH unless you know what you are doing
|   README.md   <<This file>>
└── server.js   <<Starting point of server>>
```

# Getting started

- Install nvm and node.js version 0.12.7. The version node.js run on Leancloud is so far based on 0.12.x. Local development and testing environment should match the production environment. Enter `nvm use 0.12.7` in command line.
- Install [^avoscloud-code-command]: [avoscloud-code-command](https://github.com/leancloud/avoscloud-code-command) command line tool
- Clone the repo
- Run `npm install` in command line.

## Setup schema, indexing, CLP (class level permission) and ACL (access control list)
All database setting files are located in `populator/database_settings`.

### Schema

- Database schema has to be setup manually. The easiest way is to import the schema to the database via the web interface.
- Go to the web interface of your database instance on LeanCloud. Under "存储", click on the gears icon on the right side of "数据". On the menu, click "数据导入". On the popup, under "导入 class" enter the name of the class and select the schema file. For example, to import the `_User` schema, enter `_User` as the class name and select the file at `populator/database_setings/_User/_User.schema.json`.
- Import schemas for all classes found in `populator/database_settings`.

### Indexing

- Once you've finished importing schema, go back to the same "存储" page.
- Click on a class you just imported schema for. Then click on "其他 => 索引".
- In the popup, setup the indexing exactly like the documentation for each class. You can find the documentation under `populator/database_settings` for each class. **Note** that some of the indexes are required and filled by LeanCloud. Just make sure your version looks exactly the same as the documentation.

### CLP

- TBD

### ACL

- TBD


## Populate Database

There are two ways to populate the database:
1. Run the populator script using the following command:
    `npm run populate -- -i <<APP_ID>> -k <<APP_KEY>> -m <<MASTER_KEY>>`
2. Manually import population.
Method 2 is the recommended way, as the population script can hit the database several thousand times. And if network is congested, some operation could be lost.

- Go to the web interface of your database instance on LeanCloud. Under "存储", click on the gears icon on the right side of "数据". On the menu, click "数据导入". On the popup, under "导入 class" enter the name of the class and select the schema file. For example, to import the `L_Region` schema, enter `L_Region` as the class name and select the file at `populator/database_setings/L_Region/L_Region.population.json`.
- Import population for all classes found in `populator/database_settings`, if applicable.

## Setup private config

Go to `config/` directory.
1. Create a file named `cookie.js`. The content of the file is as below:
``` lang=javascript
module.exports = {
  secret: <<your cookie secret>>
};
```
In command enter `python scripts/generate_secret.py | pbcopy`. Make sure you have python installed. This script will generate a random cookie secret and copy it to your clipboard. Replace the placeholder in `cookie.js` with the generated secret by pasting.
2. Create a file named `secret.js`. The content of the file is as below:
``` lang=javascript
module.exports = {
  development: {

  },
  test: {
    APP_ID: <<ID>>
    APP_KEY: <<KEY>>,
    MASTER_KEY: <<MASTER_KEY>>
  },
  production: {
    APP_ID: <<ID>>,
    APP_KEY: <<KEY>>,
    MASTER_KEY: <<MASTER_KEY>>
  }
};
```
Replace the placeholders with the keys from LeanCloud. **Note** that `development`, `test`, and `production` each refers to a different environment. They can have different keys. Test code is configured to run against the test environment.

## Deploy to your LeanCloud database instance for the first time

Before you start this section, there's one thing you have to keep in mind. The server code is written in es6 and transpile via babel. The transpliation step is necessary because, as of now, LeanCloud still runs on v0.12.x of Node,js, which does not support most es6 features. Before the code can be deployed to LeanCloud, it has to be transpiled, locally, to es5. Although it is possible to use babel to transpile the code right as node server starts, this significantly increases the duration of deployment. This is due to the time it takes to download babel and transpile the code. Consequently the server code is transpiled to `dist` directly. From there the code is deployed to a LeanCloud instance. It takes about one minute to deploy.

- Go to LeanCloud and log in. Create a new instance of database. Note down the name. Go to the setting page of that database and look for `appID` and `masterKey`. You will need both of these.
- At root directory of the repo, enter `avoscloud add <name of database instance> <appID> -f dist` using the information acquired. This is going to create and save info in `dist/.avoscloud` directory. If you entered info wrong, manually delete the folder.
- Once you are ready to push the code to the database instance, enter `npm run deploy:avos` in short in command line. **Note** that the command line tool will ask you for `masterKey` the first time its run. For more info on how the command line works, refer to [^avoscloud-code-command]: [avoscloud-code-command](https://github.com/leancloud/avoscloud-code-command).
- The command-line tool will compress the project and upload it to the instance you have specified on LeanCloud. The tool will print out a series of log in the command-line.
- `npm run deploy:avos` will deploy the code to test environment. You can target the test environment specifically when initializing the client. However, to deploy to production environment, you have to run `npm run publish:avos` in command-line. **Note** that you cannot directly push local code to production. It has to go through test environment first. That being said, production environment deployment takes significantly less time to complete.


# Debug and testing

## Individually debug and test cloud hooks and cloud functions

Cloud code 3.0 allows developers to, partially, test code locally instead of having to deploy the code after each change. The command-line tool, [avoscloud-code-command](https://github.com/leancloud/avoscloud-code-command), allows you to launch the server locally. Test can be run against the locally run server. This environment is useful in that it allows developers to individually debug and test cloud hooks and cloud functions. Once the server is launched with the command `avoscloud` at command-line, a local debug web page can be reached at [debug page](http://localhost:3001). On that page, you can individually select cloud hooks and cloud functions, and manually enter JSON data to debug.

There is no way to point `avoscloud-sdk` to target the local mock server, therefore, tests have to be written as raw JSON request sent over network. Take a look at the code in `test/ingegration`. A library called [superagent](https://github.com/visionmedia/superagent) is used to handle raw network request.

**NOTE:** Make sure you enter `nvm use` to switch to the correct Node.js version.

- To run integration test: `gulp test:int`.
- To run integration test on file change: `gulp test:w`.

## System level debug and test

Now the above method is only good for testing hooks and functions individually. However, when working with cloud code in production environment, the hooks and cloud functions work in conjunction. For example, a request coming in to update a User record will always trigger `beforeUpdate` and `afterUpdate`. In addition, the table schema also comes into effect. Therefore, in this case tests have to utilize `avoscloud-sdk`, basically to simulate the kind of requests a client can send to the database. Of course you have to deploy the server code to LeanCloud before running system test.

- To run system test: `gulp test:sys`.
-To run system test on file change: `gulp test:w`.

The above two methods compliment each other. Debug and testing individually allows developers to iterate faster, and it ensures basic sanity individually. However, individually working components do not guarantee that they work correctly together. That is why a system level test is also important. The downside however is that system test is usually slow to run.
