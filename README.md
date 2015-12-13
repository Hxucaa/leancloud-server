# LeanCloud-server
Server code written for LeanCloud based on the so called cloud code 3.0. 

## How to Use
- Install nvm and node.js version 0.12.2. The version node.js run on Leancloud is so far based on 0.12.x. Local development and testing environment should match the production environment.
- Install [^avoscloud-code-command]: [avoscloud-code-command](https://github.com/leancloud/avoscloud-code-command) command line tool
- Clone the repo
- Run `npm install` in command line.
- Go to LeanCloud and log in. Create a new instance of database. Note down the name. Go to the setting page of that database and look for `appID` and `masterKey`. You will need both of these.
- At root directory of the repo, enter `avoscloud add <name of database instance> <appID>` using the information acquired. This is going to create and save info in `./.avoscloud_keys` directory. If you entered info wrong, manually delete the folder.
- Once you are ready to push the code to the database instance, enter `avoscloud deploy` in command line. Note that the command line tool will ask you for `masterKey` the first time its run. For more info on how the command line works, refer to [^avoscloud-code-command]: [avoscloud-code-command](https://github.com/leancloud/avoscloud-code-command).

## How to debug and test locally
Cloud code 3.0 allows developers to test code locally instead of having to deploy the code after each change. This significantly improves development efficiency.

## How to Populate Database
`node --harmony populator/index.js populate -i <<APP_ID>> -k <<APP_KEY>> -m <<MASTER_KEY>>`