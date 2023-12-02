# Tasky - Task Management API

## Project Overview

This project involves creating a backend API for managing tasks, incorporating various features like user authentication, JWTs for secure access, MongoDB for data storage, JSDoc for documentation, Swagger for API documentation, email sending for notifications, and logging for tracking events. This project allows you to learn and implement various aspects of backend development in a practical way.

## Setting up

### Clone the repo
```bash
git clone https://github.com/DuolearnHQ/Tasky.git tasky
```

### Install dependencies
```bash
yarn
```

### Setup ENVs
The `.env` file is a common env file to store non-sensitive data, this file will only be used for configurations such as PORT, CONSTANTS, and others, do no store sensitive and secrets in this file as it is commited to the repo, and do not add it to `.gitignore` as well. 

Instead use `.env.local` to store sensitive data such as database url, or API keys, etc, you can copy the template we've created
```bash
cp .env.local.template .env.local
```

### Run the app
```bash
yarn dev
```

## Documentation
This project uses [Swagger](https://swagger.io/) for API documentation, you can access the documentation by visiting [http://localhost:3000/api-docs](http://localhost:3000/api-docs) after running the app.
While developing, it is recommended to use JSDoc to document your code, you can find more information about JSDoc [here](https://jsdoc.app/), this will enable document generation for the code, and it will be used to generate the API documentation using Swagger automatically.

Here's an example from `/controllers/health/index.js`
```js
/**
 * @swagger
 * /health:
 *  get:
 *    description: Use to request the health of the API
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get("/", (req, res) => {
    return res.json({
        status: 'Healthy',
        host: req.hostname
    }).status(200);
})
```
The JSDoc standard comment used here before the route, will enable swagger to generate the documentation for this route. 


## **Features**

1. **User Authentication:**
    - Implement user registration and authentication using JWTs (JSON Web Tokens).
    - Allow users to log in securely and maintain session information.
2. **Task CRUD Operations:**
    - Create, Read, Update, and Delete operations for managing tasks.
    - Implement endpoints for adding, fetching, updating, and deleting tasks.
3. **User Profile:**
    - Allow users to create and manage their profiles.
    - Include details such as username, email, and other relevant information.
4. **Email Notifications:**
    - Integrate an email-sending service to notify users about task-related events (e.g., task creation, updates).
    - Use a library like Nodemailer to send emails.
5. **Authorization Middleware:**
    - Implement middleware to secure routes and validate JWTs to ensure authorized access.
6. **JSDoc Documentation:**
    - Use JSDoc comments to document your code for better readability and understanding.
    - Include explanations for functions, parameters, and return values.
7. **Swagger Documentation:**
    - Generate API documentation using Swagger for clear and interactive documentation.
    - Document endpoints, request/response formats, and any authentication requirements.
8. **Logging:**
    - Implement logging for critical events and errors in your application.
    - Utilize a logging library like Winston to manage logs.
9. **Middleware for Request Logging:**
    - Create middleware to log incoming requests, including information such as method, URL, and timestamp.
    

## **Technologies to Use**

- **Node.js with Express:**
    - Build the backend server using Node.js with the Express framework.
- **MongoDB:**
    - Use MongoDB for storing user profiles and task data.
- **Authentication:**
    - Implement JWT-based authentication for secure user access.
- **Email Sending:**
    - Integrate a service like Nodemailer for sending email notifications.
- **Documentation:**
    - Use JSDoc comments for code documentation.
    - Implement Swagger for API documentation.
- **Logging:**
    - Utilize Winston or another logging library for recording events and errors.

### Links

1. https://nodejs.org/en
2. https://jwt.io/
3. https://nodemailer.com/
4. https://www.mongodb.com/
5. https://www.npmjs.com/package/winston
6. https://jsdoc.app/

## **Learning Goals**

- Gain proficiency in Node.js and Express for building RESTful APIs.
- Understand JWT-based authentication and secure routes.
- Learn to interact with a MongoDB database for data storage.
- Practice documenting code using JSDoc and generating API documentation with Swagger.
- Explore the integration of email-sending services for notifications.
- Implement logging for tracking events and errors.

Building a Task Management API will provide you with practical experience in implementing various backend functionalities while adhering to industry standards and best practices. It's a comprehensive project that covers authentication, data storage, documentation, and more. 

Get started here.