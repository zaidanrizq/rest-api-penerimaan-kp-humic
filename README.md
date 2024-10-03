# My Express REST API

This is a Penerimaan KP HUMIC REST API built with Express.js, including two main features: user registration and login for now.

## Request

- **POST** `/register` - Register a new user.
- **POST** `/login` - Log in with an existing user.

## Prerequisites

Before starting the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

## Setup

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/zaidanrizq/rest-api-penerimaan-kp-humic.git

2. Navigate to the project directory:

   ```bash
   cd rest-api-penerimaan-kp-humic

3. Install the required dependencies:

   ```bash
   npm install

4. Create a .env file in the root directory and add the following environment variables:

   ```bash
   HOST=your-host
   PORT=your-port
   # DATABASE_URL format: mysql://USER:PASSWORD@HOST:PORT/DATABASE
   DATABASE_URL=your-database-url
   SECRET_KEY="your-secret-key"

5. Start the server:

   ```bash
   npm start

## Endpoints

### Register

**POST** `/register`

- Request Body:

  ```json
  {
    "full_name": "your_full_name",
    "nim": "your_nim",
    "prodi": "your_prodi",
    "phone_number": "your_phone_number",
    "email": "your_email",
    "password": "your_password"
  }

- Response:

  ```json
  {
    "status": "Success",
    "message": "User successfully registered"
  }

### Login

**POST** `/login`

- Request Body:

  ```json
  {
    "email": "your_email",
    "password": "your_password"
  }

- Response:

  ```json
  {
    "status": "Success",
    "message": "Login successful",
    "token": "(generated_token)"
  }
