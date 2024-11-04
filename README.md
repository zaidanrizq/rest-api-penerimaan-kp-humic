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
    "perguruan_tinggi": "your_perguruantTinggi"
    "phone_number": "your_phone_number",
    "email": "your_email",
    "password": "your_password"
  }

- Response:

  ```json
  Status Code 201
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
  Status Code 200
  {
    "status": "Success",
    "message": "Login successful",
    "token": "(generated_token)"
  }

### Verify Token

**GET** `/verify-token`

- Request Header:
  
  ```json
  "Authorization": "Bearer {token}"

- Response:

  ```json
  Status Code 200
  {
     "valid": true,
     "user": {
       "user_id": 1,
       "email": "user@example.com",
       "iat": 1698583200,
       "exp": 1698590400
     }
  }

### User Profile

**GET** `/user/me`

- Request Header:

  ```json
  "Authorization": "Bearer {token}"

- Response:

  ```json
  Status Code 201
  {
     "valid": true,
     "data": {
        "full_name": "Nama Lengkap",
        "birth_date": "ISO-8601",
        "gender": "M",
        "nim": "nim",
        "perguruan_tinggi": "Telkom University",
        "prodi": "S1 Informatika",
        "cv": "CV-URL",
        "portfolio": "PORTFOLIO-URL",
        "phone_number": "081223399000",
        "email": "user@email.com",
        "profile_picture": "PROFILE-PICTURE-URL",
        { // kp_application
           "application_id": "1",
           "status": "Lulus", // "Lulus" OR "Gagal" OR "Proses"
           "application_date": "ISO-8601",
        }
     }
  }

**PUT** `/user/me`

- Request:

  ```json
  Request Header
  {
     "Authorization": "Bearer {token}",
     "Content-Type": "application/json"
  }
  Request Body
  {
     "full_name": "Nama Lengkap",
     "birth_date": "ISO-8601",
     "gender": "M",
     "nim": "nim",
     "perguruan_tinggi": "Telkom University",
     "prodi": "S1 Informatika",
     "cv": CV-FILE
     "portfolio": PORTFOLIO-FILE
     "phone_number": "081223399000",
     "email": "user@email.com",
     "profile_picture": PROFILE-PICTURE-FILE
  }

- Response:

  ```json
  Status Code 200
  {
     "valid": true,
     "data": user_data
  }

### Role Kerja Praktik

**GET** `/role-kp`

- Response:

  ```json
  Status Code 200
  {
     "status": "Success",
     "data": [
        {
           "role_id": "1",
           "slug": "back-end",
           "name": "Back-End Developer",
           "description": "deskripsi",
           "kualifikasi": "kualifikasi",
           "role_image": "ROLE-IMAGE-URL",
           "batch_id": "1",
           { // Batch
              "batch_id": "1",
              "number": "1",
              "opened_at": "ISO-8601",
              "closed_at": "ISO-8601",
              "semester": "Ganjil", // "Ganjil" OR "Genap"
              "year": "2024"
           }
        },
        {
           role-2
        },
        {
           ...
        }
     ]
  }

**GET** `/role-kp/{id}`

- Response:

  ```json
  Status Code 200
  {
     "status": "Success",
     "data": {
        "role_id": "1",
        "slug": "back-end",
        "name": "Back-End Developer",
        "description": "deskripsi",
        "kualifikasi": "kualifikasi",
        "role_image": "ROLE-IMAGE-URL",
        "batch_id": "1",
        { // Batch
           "batch_id": "1",
           "number": "1",
           "opened_at": "ISO-8601",
           "closed_at": "ISO-8601",
           "semester": "Ganjil", // "Ganjil" OR "Genap"
           "year": "2024"
        }
     }
  }

**POST** `/role-kp`

- Request:

  ```json
  Headers
  {
     "Authorization": "Bearer {token}",
     "Content-Type": "application/json"
  }
  Body
  {
     "slug": "ui-ux",
     "name": "UI/UX Designer",
     "description": "deskripsi",
     "kualifikasi": "kualifikasi",
     "role_image": ROLE-IMAGE-FILE, // Object
     "opened_at": "ISO-8601",
     "closed_at": "ISO-8601",
     "batch_id": "1"
  }
  
- Response:

  ```json
  Status Code 201
  {
     "status": "Success",
     "message": "Successfuly added KP role."
  }

**PUT** `/role-kp/{id}`

- Request:

  ```json
  Status Code 200
  Headers
  {
     "Authorization": "Bearer {token}",
     "Content-Type": "application/json"
  }
  Body
  {
     "slug": "ui-ux",
     "name": "UI/UX Designer",
     "description": "deskripsi",
     "kualifikasi": "kualifikasi",
     "role_image": ROLE-IMAGE-FILE, // Object
     "opened_at": "ISO-8601",
     "closed_at": "ISO-8601",
     "batch_id": "1"
  }

- Response:

  ```json
  {
     "status": "Success",
     "data": {
        UPDATED-ROLE
     }
  }

**DELETE** `/role-kp/{id}`

- Request

  ```json
  Header
  "Authorization": "Bearer {token}"
  
- Response
  Status Code: 200
  ```json
  {
     "status": "Success",
     "message": "Applicaation successfuly removed."
  }

### Batch Kerja Praktik

**GET All** `/batch`

- Request

  ```json
  Header
  "Authorization": "Bearer {token}"

- Response

  ```json
  Status Code: 200
  {
     "status": "Success,
     "data" : {
        "batch_id": "1",
        "number": "1",
        "opened_at": "ISO-8601",
        "closed_at": "ISO-8601",
        "semester": "Genap",
        "year": "2024"
     }
  }

**GET Spesific Batch** `/batch/{id}`

- Request

  ```json
  Header
  "Authorization": "Bearer {token}"

- Response

  ```json
  Status Code: 200
  {
     "status": "Success,
     "data" : {
        "batch_id": "1",
        "number": "1",
        "opened_at": "ISO-8601",
        "closed_at": "ISO-8601",
        "semester": "Genap",
        "year": "2024"
     }
  }

**POST** `/batch`

- Request

  ```json
  Header
  "Authorization": "Bearer {token}"
  "Content-Type": "application/json"
  Body
  {
     "batch_id": "1",
     "number": "1",
     "opened_at": "ISO-8601",
     "closed_at": "ISO-8601",
     "semester": "Genap",
     "year": "2024"
  }

- Response

  ```json
  Status Code: 201
  {
     "status": "Success,
     "message": "Batch successfuly created."
  }

**PUT** `/batch/{id}`

- Request

  ```json
  Header
  "Authorization": "Bearer {token}"
  "Content-Type": "application/json"
  Body
  {
     "batch_id": "1",
     "number": "1",
     "opened_at": "ISO-8601",
     "closed_at": "ISO-8601",
     "semester": "Genap",
     "year": "2024"
  }

- Response

  ```json
  Status Code: 200
  {
     "status": "Success,
     "message": "Update batch successful"
  }

**DELETE** `/batch/{id}`

- Request

  ```json
  Header
  "Authorization": "Bearer {token}"

- Response

  ```json
  Status Code: 200
  {
     "status": "Success,
     "message": "Batch deleted successfuly."
  }


### Lamaran (Application) Kerja Praktik

**GET ALL** `/application-kp`

- Request

  ```json
  Header
  "Authorization": "Bearer {token}"

- Response

  ```json
  Status Code: 200
  {
     "status": "Success,
     data: {
        "application_id": "1",
        "status": "Proses",
        "application_date: "ISO-8601",
        user,
        kp_role
     }
  }

**GET Spesific Lamaran KP** `/application-kp/{id}`

- Request

  ```json
  Header
  "Authorization": "Bearer {token}"

- Response

  ```json
  Status Code: 200
  {
     "status": "Success,
     data: {
        "application_id": "1",
        "status": "Proses",
        "application_date: "ISO-8601",
        user,
        kp_role
     }
  }

**POST** `/application-kp`

- Request

  ```json
  Header
  "Authorization": "Bearer {token}"

- Response

  ```json
  Status Code: 201
  {
     "status": "Success,
     "message": "User successfully applied Kerja Praktik"
  }

**PUT** `/application-kp/{id}`

- Request

  ```json
  Header
  "Authorization": "Bearer {token}"
  Body
  {
     "status": "Lulus" Lulus or Gagal or Proses
  }

- Response

  ```json
  Status Code: 200
  {
     "status": "Success,
     "data": {
        "application_date": "ISO-8601",
        User,
        Role_KP
     }
  }

**DELETE** `/application-kp/{id}`

- Request

  ```json
  Header
  "Authorization": "Bearer {token}"

- Response

  ```json
  Status Code: 200
  {
     "status": "Success,
     "message": "Application successfuly removed."
  }

### Admin Login

**POST** `/admin-login`

- Request

  ```json
  Header
  "Authorization": "Bearer {token}"
  Body
  {
     "email": "EMAIL",
     "password" : "pass"
  }

- Response

  ```json
  Status Code: 200
  {
     "status": "Success,
     "message": "Login successful"
  }
