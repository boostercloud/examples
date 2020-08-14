// TODO: LINK ARTICLES HERE


# Simply chat server powered by Booster Framework

This project is a sample implementation of a chat server in [Booster](https://booster.cloud) to serve as a guidance of the main concepts and artifacts used in the framework.

## Chat requirements

We are going to structure our chat app in chat rooms, which are going to be created by admins and users, and modified only by admins. Inside each chat room the user sends messages to chat with other users.

A chat room might be private, that means we need to request the owner access to it. If the chat room is public everyone could join in and post messages.

If you want to know how to generate the main artifacts of a Booster application please refer to the [Booster Documentation](https://github.com/boostercloud/booster/tree/master/docs/).

## Deployment

We'll deploy the system by typing:

`boost deploy -e <environment>`

The environment should be one of the availables in `config/config.ts`, but you can create your own.

## How to test

We've created integration tests to test all the system in depth. To execute them simply type:

`npm run test:integration`

The integration tests are self contained since they will deploy a test environment, execute the tests and remove the test environment completely.

**Note:** Remember to create the BOOSTER_ENV variable in your system by typing `export BOOSTER_ENV=test` in your terminal.