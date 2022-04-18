# Getting Started with Visual Json Schema

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

And [Spring Boot](https://spring.io/projects/spring-boot).

## System pre-requisites

Having Node and Maven install to Terminal/Command Line.

## Build Scripts

### Front-end

In the project directory fe > visual-json-schema-editor you can run:

#### `npm install`

To install all the dependencies

#### Note that if having problem with material-ui/@core you can run `npm install @material-ui/core --legacy-peer-deps` for accepting material-ui works with bloody react 18

### Back-end

In the project directory be > visual-json-schema-api you can run:

#### `mvn install`

To install all the dependencies

## Run Scripts

### Front-end

In the project directory fe > visual-json-schema-editor you can run:

#### `npm start`

To start the front-end deployment. The config for API call can be found in .env file or will be default as `http://localhost:8080`

### Back-end

In the project directory be > visual-json-schema-api you can run:

#### `mvn spring-boot:run`

To start the application on local Tomcat server, H2 In-memory DB is configured to be accessed at `http://localhost:8080/api/h2-console`. Credentials for H2 DB can be found at directory be > visual-json-schema-api > src > main > resources > application.properties

## Additional Scripts

### Front-end

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Progress Infos

I did try my best to implement the tool but there are still missing features and buggy screens. Further details about progress info can be found in each fe and be README file. 

Ideal working schema tree is `json-schema-root > objects > properties > [integer, number, boolean, etc]`
