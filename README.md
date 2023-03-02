This project is a mock e-commerce website for a candy store, built as a React Single Page Application along with a postgres database

# Getting Started
## Clone the repository: git clone git@github.com:Nievescs20/CandyCo.git
Install dependencies: npm install

Create Database: createdb candyco

Seed Database: npm run seed

<br/>

## To run this project locally you will need to:

  Signup for a stripe account and aquire an api key

  Store this key in a .env file in the root of the project

  Environment variable should be named STRIPE="YOUR KEY HERE"

<br/>

  Create an environment variable for your local server URL

  Environment variable should be named SERVER_URL=http://localhost:8000

<br/>

## Start the development server: npm run start:dev

<br/>

# Building and Deployment
-To build the project for production, run npm run build. The built files will be in the build directory.

-Be sure to include your environmental variables for both the Stripe api key and server url



# Built With
- React
- Redux
- Postgres
- Stripe API

## Web Preview
![alt text](https://github.com/nievescs20/CandyCo/blob/main/public/HomeScreen.ScreenShot.png?raw=false)

## Future plans for this project:

-Responsive Design
