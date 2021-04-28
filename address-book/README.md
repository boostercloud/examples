##Very simple address book built with Booster

Read the [accompanying article](https://dev.to/boostercloud/understanding-event-sourcing-using-the-booster-framework-2da3-temp-slug-3717947?preview=b971bfd515f79d01ad8e9f7259ba366f35c0fbdf59e87a864c29c25f738086422bcb7d26853b98d46a1bc64939758a4156d905543ce73ef4b473bc0d).

###Requirements

* Node.js `v12` or later
* An AWS account

###Running the app

1. If you don't have it installed, install the Booster CLI with NPM:

    ```
    npm i -g @boostercloud/cli@0.15.1
    ```

2. Configure AWS credentials [(see Booster's documentation)](https://docs.booster.cloud/#/chapters/02_getting-started?id=aws-provider-prerequisites).
3. Install project dependencies:    
   
    ```
    npm i
    ```

4. In the project root directory, run the following to deploy:

    ```
    boost deploy -e production
    ```

5. Once the deployment is complete, use the URL labeled `address-book-app.graphqlURL` in the outputs to execute GraphQL
queries or mutations (you can use something like [Hoppscotch](https://hoppscotch.io)).
   
6. To destroy all AWS resources that were provisioned, run:

    ```
    boost nuke -e production
    ```
   
###Example queries and mutations

1. Add a new contact:

    ```
    mutation {
      AddContact(
        input: {
          id: "90125",
          firstName: "John",
          lastName: "Doe",
          address: "22 Acacia Avenue, London, UK",
          phoneNumber: "634-5789"
        }
      )
    }
    ```

2. Change that contact's phone number:

    ```
    mutation {
      UpdatePhoneNumber(
        input: {
          id: "90125",
          phoneNumber: "867-5309"
        }
      )
    }
    ```

3. Query that contact's current info:

    ```
    {
      ContactReadModel(id: "90125") {
        id
        firstName
        lastName
        address
        phoneNumber
      }
    }
    ```

