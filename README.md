# Article Management API

This is a simple REST API for managing articles, built with Express.js and Firebase Firestore. It allows you to create, read, update, and delete articles.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [Create Article](#create-article)
  - [Get All Articles](#get-all-articles)
  - [Get Article by ID](#get-article-by-id)
  - [Update Article](#update-article)
  - [Delete Article](#delete-article)
- [Error Handling](#error-handling)
- [License](#license)

## Installation

### Prerequisites
- Node.js and npm
- Docker (optional, for containerized deployment)
- WSL (Windows Subsystem for Linux) if running on Windows

### Steps
1. Clone the repository:
    ```sh
    git clone https://github.com/CleanUpProject/clean-up-api.git
    cd clean-up-api
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Configure Firebase:
    - Create a `config.js` file in the `src` directory and add your Firebase configuration:
        ```javascript
        const firebase = require("firebase");
        require("firebase/firestore");

        const firebaseConfig = {
            apiKey: "YOUR_API_KEY",
            authDomain: "YOUR_AUTH_DOMAIN",
            projectId: "YOUR_PROJECT_ID",
            storageBucket: "YOUR_STORAGE_BUCKET",
            messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
            appId: "YOUR_APP_ID"
        };

        firebase.initializeApp(firebaseConfig);
        const db = firebase.firestore();

        module.exports = db;
        ```

4. Start the server:
    ```sh
    npm start
    ```

5. For development with auto-reloading:
    ```sh
    npm run start:dev
    ```

## Usage

To interact with the API, use a tool like Postman or cURL to send HTTP requests to the following endpoints:

## API Endpoints

### Create Article
- **URL:** `/article`
- **Method:** `POST`
- **Request Body:**
    ```json
    {
        "content": "string, required",
        "imgurl": "string, required",
        "source": "string, required",
        "title": "string, required"
    }
    ```
- **Response:**
    - **Status:** 201
    - **Body:**
        ```json
        {
            "message": "Article created successfully",
            "id": integer
        }
        ```

### Get All Articles
- **URL:** `/article`
- **Method:** `GET`
- **Response:**
    - **Status:** 200
    - **Body:**
        ```json
        {
            "message": "Articles retrieved successfully",
            "article": [
                {
                    "id": integer,
                    "content": "string",
                    "imgurl": "string",
                    "source": "string",
                    "title": "string"
                }
            ]
        }
        ```

### Get Article by ID
- **URL:** `/article/:id`
- **Method:** `GET`
- **Response:**
    - **Status:** 200
    - **Body:**
        ```json
        {
            "message": "Article retrieved successfully",
            "article": {
                "id": integer,
                "content": "string",
                "imgurl": "string",
                "source": "string",
                "title": "string"
            }
        }
        ```
    - **Error Status:** 404
    - **Error Body:**
        ```json
        {
            "message": "Article not found"
        }
        ```

### Update Article
- **URL:** `/article/:id`
- **Method:** `PUT`
- **Request Body:**
    ```json
    {
        "content": "string, required",
        "imgurl": "string, required",
        "source": "string, required",
        "title": "string, required"
    }
    ```
- **Response:**
    - **Status:** 200
    - **Body:**
        ```json
        {
            "message": "Article updated successfully"
        }
        ```
    - **Error Status:** 400
    - **Error Body:**
        ```json
        {
            "message": "Missing required fields: content, imgurl, source, title"
        }
        ```
    - **Error Status 2:** 404
    - **Error Body 2:**
        ```json
        {
            "message": "Article not found"
        }
        ```

### Delete Article
- **URL:** `/article/:id`
- **Method:** `DELETE`
- **Response:**
    - **Status:** 200
    - **Body:**
        ```json
        {
            "message": "Article deleted successfully"
        }
        ```
    - **Error Status:** 404
    - **Error Body:**
        ```json
        {
            "message": "Article not found"
        }
        ```

## Error Handling
Errors are handled by a middleware function. If an error occurs, the API will respond with an appropriate status code and a message describing the error.

## License
This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.
