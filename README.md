# LeanCloud-server [![Build Status](https://travis-ci.com/zenchatdev/LeancloudServer.svg?token=CbMcp6XxrHszmirShqM2&branch=master)](https://travis-ci.com/zenchatdev/LeancloudServer)

Server code written for LeanCloud based on the so called cloud code 3.0.

# Folder Structure
```
<<Root of the project>>
|   config  <<Configurations>>
|   dist    <<Transpiled server code that is going to be deployed>>
|   jsdoc   <<Documentation>>
|   node_modules
|   populator_test_env <<Populate database with testing data>>
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

1. Mare sure your node environment is 0.12.7
2. Make sure you wrap the App ID, App Key, Master Key, and the random string inside quotation markers ("")
3. npm install -g  avoscloud-code
4. Clone LeanCloud-server repo
5. Run `npm install` in repo directory

## Setup schema, indexing, CLP (class level permission) and ACL (access control list)
All database setting files are located in `populator/database_settings`.

### Data and schema

1. Go to the web interface of your database instance on LeanCloud. Under "存储", click on the gears icon on the right side of "数据". On the menu, click "数据导入". On the popup, under "导入 class" enter the name of the class and select the schema/population file. Use first part of the file name as the class name. (e.g. Business, Adress, etc.)
2. Import all data from population.json files in `populator/database_settings`.
3. Import all schemas from schema.json files in `populator/database_settings`.

### Indexing
- Once you've finished importing schema, go back to the same "存储" page.
- Click on a class you just imported schema for. Then click on "其他 => 索引".
- In the popup, setup the indexing exactly like the documentation for each class. You can find the documentation under `populator/database_settings` for each class. **Note** that some of the indexes are required and pre-filled by LeanCloud. Just make sure your version looks exactly the same as the documentation.

### CLP

- TBD

### ACL

- TBD


## Setup private config

1. Run  `python scripts/generate_secret.py | pbcopy` at repo root
2. Go to `config/` directory, and create a file named `cookie.js` with the following content.
``` lang=javascript
module.exports = {
  secret: "paste the random key string just generated"
};
```

3. Create another file named `secret.js` with the following content and fill in the id and keys from LeanCloud.
``` lang=javascript
module.exports = {
  development: {

  },
  test: {
    APP_ID: "App ID",
    APP_KEY: "App Key",
    MASTER_KEY: "Master Key"
  },
  production: {
    APP_ID: "App ID",
    APP_KEY: "App Key",
    MASTER_KEY: "Master Key"
  }
};
```
**Note** that `development`, `test`, and `production` environments can have same or different keys.

## Deploy to your LeanCloud database instance for the first time

The server code is written in es6 and transpiled locally via babel (hence the dist folder later) to support es6 features.

1. At repo root directory, run `avoscloud add <name of database instance> "App ID" -f dist`. This creates and saves info in `dist/.avoscloud` directory. If you entered info wrong, manually delete the folder and mkdir again.
2. Run `npm run deploy:avos` to deploy to test environment. **Note** that the command line tool will ask you for `masterKey` the first time its run. For more info on how the command line works, refer to [^avoscloud-code-command]: [avoscloud-code-command](https://github.com/leancloud/avoscloud-code-command).
3. Run `npm run populate:test` to populate test environment database
4. Run `npm run publish:avos` to deploy to production environment. **Note** that you cannot directly push local code to production. It has to go through test environment first.
5. Run `npm run populate` to populate production environment database



# Debug and testing
Due to general restrictions of BaaS platform, debugging is not as straightforward because you don't have complete control of the environment. Some compromises have to be made during testing but there are tools to go around the problems, feel free to explore and break things.

## Individually debug and test cloud hooks and cloud functions

Cloud code 3.0 allows developers to test server code on local machine to certain extend. Before proceeding, make sure [avoscloud-code-command](https://github.com/leancloud/avoscloud-code-command) is installed before proceeding.

To launched the server locally, run `avoscloud`. Enter `app ID` and `master key` if prompted. A local debug web page can be reached at http://localhost:3001. On that page, you can individually select cloud hooks and cloud functions, and manually enter JSON data to debug. For example, to test a cloud function, you'd select the function from the dropdown menu, then enter data in JSON format in the text box. Run the command and the webpage will return result. This also works for cloud hooks.

**PROS:**

- Test cloud hooks and cloud functions in isolation. For example, testing `beforeUpdate` will not trigger `afterUpdate`.
- Faster feedback. No need to deploy to LeanCloud.

**CONS:**

- Manually craft JSON data can be tedious very soon.
- The local server is a mock server. Hence there's no guarantee it functions exactly the same as production environment.

Tests can be written against cloud hooks and functions individually on the local mock server. Conceptually the tests behave similarly to the http://localhost:3001. You'd craft JSON request in code and send it to local mock server. Take a look at the code in `test/ingegration`. [superagent](https://github.com/visionmedia/superagent) is used to handle raw JSON network request.

- To run integration test: `gulp test:int`.
- To run integration test on file change: `gulp test:w`.

## System level debug and test

Now the above method is only good for testing hooks and functions in isolation. However, it does not guarantee that they'd work correctly together in production. For example, a request to update a User record will always trigger `beforeUpdate` and `afterUpdate`, and if code in `beforeUpdate` also saves data in another table, it will trigger another set of hooks. In addition, the table schema also comes into effect.

There's a similar, above mentioned, debug page for system level debug. Click on "帮助" on the top menu bar. In the dropdown menu click on "在线API测试工具". This is very similar to the local debug page. **NOTE** you have publish server code to production environment in order to use this tool - `npm run deploy:avos`, then publish to production, `npm run publish:avos`.

In system tests we utilize `avoscloud-sdk` to test against the entire system. In essence we are basically simulating how clients would interact with the server. Take a look at the code in `test/system` for examples.

**PROS:**

- High level of confidence in correctness - basically running tests against production environment.

**CONS:**

- Have to deploy before running tests and do it every time there's changes in server code.
- Takes about 1 minute to deploy.
- To use the online debug page, have to publish code.
- Tests might take longer to run depending on network conditions.
- Harder to write tests as a lot of factors, such as database schema, ACL, CLP, etc.

The system tests environment has been configured to hit test environment only, so you don't have to publish to production environment each time.

- To deploy: `npm run deploy:avos`.
- To run system test: `gulp test:sys`.
- To run system test on file change: `gulp test:w`.

The above two methods compliment each other. Debugging and testing cloud hooks and functions individually allows developers to iterate faster, and it ensures correctness on a unit level. However, individually working components do not guarantee that they work correctly together. That is why a system level test is also important. The downside however is that system test is usually slow to run.
