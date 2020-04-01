# Stock API

Simple stock api for a coding test.

## Installation

Install latest LTS version of Node.js from [here](https://nodejs.org/en/download/)

Clone this project and install the dependencies with the following command:

```bash
npm install
```

## Usage
Start the service with the following command:
```bash
npm run start
```
To start it with nodemon use: 
```bash
npm run dev
```
The endpoint will be exposed to 3000 port by default

If the service running you can check the swagger documentation for api usage here [documentation](http://localhost:3000/documentation)

If you are using [Postman](https://www.postman.com/) import the "stock-api-collection.json" from the repository

For docker container you can use this command:
```bash
npm run docker:up
```

Also you can use 
```bash
npm run test
```
To test the codebase

Please use the internal code formatter to keep the styling consistent
```bash
npm run lint
```