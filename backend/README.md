# Backend API Documentation

## Endpoints

### POST /users/register

Register a new user.

#### Request

- **URL**: `/users/register`
- **Method**: `POST`
- **Headers**:
  - `Content-Type: application/json`
- **Body**:
  ```json
  {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```

#### Response

- **Success**:

  - **Status Code**: `201 Created`
  - **Body**:
    ```json
    {
      "token": "jwt_token",
      "user": {
        "_id": "user_id",
        "fullname": {
          "firstname": "John",
          "lastname": "Doe"
        },
        "email": "john.doe@example.com"
        // ...other user fields...
      }
    }
    ```

- **Validation Error**:

  - **Status Code**: `400 Bad Request`
  - **Body**:
    ```json
    {
      "errors": [
        {
          "msg": "Invalid Email",
          "param": "email",
          "location": "body"
        },
        {
          "msg": "First name must be at least 3 characters long",
          "param": "fullname.firstname",
          "location": "body"
        },
        {
          "msg": "Password must be at least 6 characters long",
          "param": "password",
          "location": "body"
        }
      ]
    }
    ```

- **Server Error**:
  - **Status Code**: `500 Internal Server Error`
  - **Body**:
    ```json
    {
      "error": "Internal Server Error"
    }
    ```

### POST /users/login

Login an existing user.

#### Request

- **URL**: `/users/login`
- **Method**: `POST`
- **Headers**:
  - `Content-Type: application/json`
- **Body**:
  ```json
  {
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```

#### Response

- **Success**:

  - **Status Code**: `200 OK`
  - **Body**:
    ```json
    {
      "token": "jwt_token",
      "user": {
        "_id": "user_id",
        "fullname": {
          "firstname": "John",
          "lastname": "Doe"
        },
        "email": "john.doe@example.com"
        // ...other user fields...
      }
    }
    ```

- **Validation Error**:

  - **Status Code**: `400 Bad Request`
  - **Body**:
    ```json
    {
      "errors": [
        {
          "msg": "Invalid Email",
          "param": "email",
          "location": "body"
        },
        {
          "msg": "Password is too short",
          "param": "password",
          "location": "body"
        }
      ]
    }
    ```

- **Authentication Error**:

  - **Status Code**: `401 Unauthorized`
  - **Body**:
    ```json
    {
      "message": "Invalid email or password"
    }
    ```

- **Server Error**:
  - **Status Code**: `500 Internal Server Error`
  - **Body**:
    ```json
    {
      "error": "Internal Server Error"
    }
    ```

### GET /users/profile

Get the profile of the authenticated user.

#### Request

- **URL**: `/users/profile`
- **Method**: `GET`
- **Headers**:
  - `Authorization`: `Bearer jwt_token`

#### Response

- **Success**:

  - **Status Code**: `200 OK`
  - **Body**:
    ```json
    {
      "_id": "user_id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
      // ...other user fields...
    }
    ```

- **Authentication Error**:

  - **Status Code**: `401 Unauthorized`
  - **Body**:
    ```json
    {
      "message": "Unauthorized"
    } 
    ```

- **Server Error**:
  - **Status Code**: `500 Internal Server Error`
  - **Body**:
    ```json
    {
      "error": "Internal Server Error"
    }
    ```

### GET /users/logout

Logout the authenticated user.

#### Request

- **URL**: `/users/logout`
- **Method**: `GET`
- **Headers**:
  - `Authorization`: `Bearer jwt_token`

#### Response

- **Success**:

  - **Status Code**: `200 OK`
  - **Body**:
    ```json
    {
      "message": "Logged out successfully"
    }
    ```

- **Authentication Error**:

  - **Status Code**: `401 Unauthorized`
  - **Body**:
    ```json
    {
      "message": "Unauthorized"
    }
    ```

- **Server Error**:
  - **Status Code**: `500 Internal Server Error`
  - **Body**:
    ```json
    {
      "error": "Internal Server Error"
    }
    ```

### POST /captains/register

Register a new captain.

#### Request

- **URL**: `/captains/register`
- **Method**: `POST`
- **Headers**:
  - `Content-Type: application/json`
- **Body**:
  ```json
  {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "password123",
    "vehicle": {
      "color": "red",
      "plate": "XYZ123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
  ```

#### Response

- **Success**:

  - **Status Code**: `201 Created`
  - **Body**:
    ```json
    {
      "token": "jwt_token",
      "captain": {
        "_id": "captain_id",
        "fullname": {
          "firstname": "John",
          "lastname": "Doe"
        },
        "email": "john.doe@example.com",
        "vehicle": {
          "color": "red",
          "plate": "XYZ123",
          "capacity": 4,
          "vehicleType": "car"
        }
        // ...other captain fields...
      }
    }
    ```

- **Validation Error**:

  - **Status Code**: `400 Bad Request`
  - **Body**:
    ```json
    {
      "errors": [
        {
          "msg": "Invalid Email",
          "param": "email",
          "location": "body"
        },
        {
          "msg": "First name must be at least 3 characters long",
          "param": "fullname.firstname",
          "location": "body"
        },
        {
          "msg": "Password must be at least 6 characters long",
          "param": "password",
          "location": "body"
        }
      ]
    }
    ```

- **Server Error**:
  - **Status Code**: `500 Internal Server Error`
  - **Body**:
    ```json
    {
      "error": "Internal Server Error"
    }
    ```

### POST /captains/login

Login an existing captain.

#### Request

- **URL**: `/captains/login`
- **Method**: `POST`
- **Headers**:
  - `Content-Type: application/json`
- **Body**:
  ```json
  {
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```

#### Response

- **Success**:

  - **Status Code**: `200 OK`
  - **Body**:
    ```json
    {
      "token": "jwt_token",
      "captain": {
        "_id": "captain_id",
        "fullname": {
          "firstname": "John",
          "lastname": "Doe"
        },
        "email": "john.doe@example.com",
        "vehicle": {
          "color": "red",
          "plate": "XYZ123",
          "capacity": 4,
          "vehicleType": "car"
        }
        // ...other captain fields...
      }
    }
    ```

- **Validation Error**:

  - **Status Code**: `400 Bad Request`
  - **Body**:
    ```json
    {
      "errors": [
        {
          "msg": "Invalid Email",
          "param": "email",
          "location": "body"
        },
        {
          "msg": "Password is too short",
          "param": "password",
          "location": "body"
        }
      ]
    }
    ```

- **Authentication Error**:

  - **Status Code**: `401 Unauthorized`
  - **Body**:
    ```json
    {
      "message": "Invalid email or password"
    }
    ```

- **Server Error**:
  - **Status Code**: `500 Internal Server Error`
  - **Body**:
    ```json
    {
      "error": "Internal Server Error"
    }
    ```

### GET /captains/profile

Get the profile of the authenticated captain.

#### Request

- **URL**: `/captains/profile`
- **Method**: `GET`
- **Headers**:
  - `Authorization`: `Bearer jwt_token`

#### Response

- **Success**:

  - **Status Code**: `200 OK`
  - **Body**:
    ```json
    {
      "_id": "captain_id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com",
      "vehicle": {
        "color": "red",
        "plate": "XYZ123",
        "capacity": 4,
        "vehicleType": "car"
      }
      // ...other captain fields...
    }
    ```

- **Authentication Error**:

  - **Status Code**: `401 Unauthorized`
  - **Body**:
    ```json
    {
      "message": "Unauthorized"
    }
    ```

- **Server Error**:
  - **Status Code**: `500 Internal Server Error`
  - **Body**:
    ```json
    {
      "error": "Internal Server Error"
    }
    ```

### GET /captains/logout

Logout the authenticated captain.

#### Request

- **URL**: `/captains/logout`
- **Method**: `GET`
- **Headers**:
  - `Authorization`: `Bearer jwt_token`

#### Response

- **Success**:

  - **Status Code**: `200 OK`
  - **Body**:
    ```json
    {
      "message": "Logged out successfully"
    }
    ```

- **Authentication Error**:

  - **Status Code**: `401 Unauthorized`
  - **Body**:
    ```json
    {
      "message": "Unauthorized"
    }
    ```

- **Server Error**:
  - **Status Code**: `500 Internal Server Error`
  - **Body**:
    ```json
    {
      "error": "Internal Server Error"
    }
    ```
