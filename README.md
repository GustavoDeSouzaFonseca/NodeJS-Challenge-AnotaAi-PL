# NodeJS-Challenge-AnotaAi-PL
  Challenge at [AnotaAi Backend Challenge](https://github.com/githubanotaai/new-test-backend-nodejs). 
  Develop an API using Node.js for a product catalog management system in a marketplace application.

## Table of Contents

- [Installation](#run-locally)
- [Configuration](#config)
- [MVC Structure](#mvc-structure)
- [.ENV](#.env)
- [Endpoints](#endpoints)

## Run locally

To run this project, follow the instructions

1. Clone the repository
```
git clone https://github.com/GustavoDeSouzaFonseca/NodeJS-Challenge-AnotaAi-PL.git
cd NodeJS-Challenge-AnotaAi-PL
```

2. Install all depedencies and start the application
OBS.: note we use Node version > v.20.0.0, to see your node version use the command
```
node -v
```
then
```
npm install
npm start
```

## MVC structure 

The api use mvc structure to organize the folders
MVC | Model View Controller

- Models
  - category.js
  - product.js
- View
  - categoryRoute.js
  - index.js
  - productRoute.js
- Controllers
  - categoryController.js
  - productController.js

## Config

Folder to all configuration, the project use mongodb as databaase NoSQL

- config
  - mongodb
    - mongodbConfig.js

    ```
    import mongoose from 'mongoose';

    mongoose.connect('mongodb://localhost:27017/product-catalog');

    const db = mongoose.connection;

    export default db;
    ```

    String connection is default mongodb://localhost:27017
    after '/' the database`s name product-catalogy

  - aws
    - awsSNSConfig.js
    ```
    import AWS from 'aws-sdk';

    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: 'us-east-1',
    });

    const sns = new AWS.SNS();

    export default sns;
    ```

## .env

AWS settings must be saved, if you wish you can enter BASE_URL and PORT according to your preferences.

```
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_SNS_TOPIC_ARN=
```

## Endpoints

The API exposes the following *endpoints* from the *BASE_URL*:*PORT* `http://localhost:8080`
BASE_URL and PORT could be used by .env

`/categories`
  * `GET /categories - listAllCategories`
  * `GET /categories - findCategoryById`
  * `POST /categories - createCategory`
  * `PUT /categories - updateCategoryById`
  * `DELETE /categories - deleteCategoryById`

`/products`
  * `GET /products - listAllProducts`
  * `GET /products - findProductById`
  * `POST /products - createProduct`
  * `PUT /products - updateProductById`
  * `DELETE /products - deleteProductById`

`/check-sns`
  * `GET /check-sns - testingConnectionAwsSns`
