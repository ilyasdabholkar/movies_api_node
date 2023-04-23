# Movies API Node

Movies API Node is a RESTful API for managing movies, built using Node.js, Express, and MongoDB. It provides endpoints for creating, retrieving, updating, and deleting movies, as well as user authentication and authorization using JWT (JSON Web Token) tokens.

## Getting Started

To get started with Movies API Node, follow these steps:

1. Clone the repository from GitHub:
``` 
	git clone https://github.com/ilyasdabholkar/movies_api_node.git
```
    
2. Install the dependencies:
```
	cd movies_api_node
	npm install
```


3. Create a `.env` file in the root directory of the project, and configure the environment variables. Example:
```
	PORT=3000
	MONGO_URI=mongodb://localhost:27017/movies_api
	JWT_SECRET=mysecretkey
```
4. Start the server:
```
	npm start
```
The API will be running at `http://localhost:3000` by default, unless you've configured a different `PORT` in your `.env` file.
## API Endpoints
The following API endpoints are available in the Movies API Node:

### User Endpoints

#### Register User
-   URL: `POST /api/users/register`
-   Description: Registers a new user.
-   Request Body:
```json
{
	"name": "John Doe",
	"email": "johndoe@example.com",
	"password": "password123"
}
```
-   Response:
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "_id": "60f7752c2f63d0151c0b37a7",
    "name": "John Doe",
    "email": "johndoe@example.com",
    "createdAt": "2023-04-23T09:34:20.988Z",
    "updatedAt": "2023-04-23T09:34:20.988Z",
    "__v": 0
  }
}
```

#### Login User

-   URL: `POST /api/users/login`
-   Description: Authenticates a user and returns a JWT token.
-   Request Body:
```json
{
  "email": "johndoe@example.com",
  "password": "password123"
}
```
-   Response:
```json
{
  "success": true,
  "message": "User logged in successfully",
  "data": {
    "user": {
      "_id": "60f7752c2f63d0151c0b37a7",
      "name": "John Doe",
      "email": "johndoe@example.com",
      "createdAt": "2023-04-23T09:34:20.988Z",
      "updatedAt": "2023-04-23T09:34:20.988Z",
      "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZjc3NTJjMmY2M2QwMTUxYzBiMzdhNyIsImlhdCI6MTYzMTMxNTg0NCwiZXhwIjoxNjMxMzE5NDQ0fQ.qJKJkc94EMHWT4xqxXg4AeWixsiYCr1wi2rHR5o5B5o"
  }
}
```

### Create a Movie

-   URL: `POST /api/movies`
-   Description: Create a new movie.
-   Request Headers:
    -   Authorization: Bearer `<JWT_TOKEN>`
-   Request Body:
```json
{
  "title": "Example Movie",
  "genre": "Action",
  "director": "John Smith",
  "releaseYear": 2021
}
```
- Response Body:
```json
{
  "success": true,
  "message": "Movie created successfully",
  "data": {
    "_id": "6156f1d8c4ad35d1e04c85b1",
    "title": "Example Movie",
    "genre": "Action",
    "director": "John Smith",
    "releaseYear": 2021,
    "createdAt": "2023-04-23T12:34:56.789Z", 
    "updatedAt": "2023-04-23T12:34:56.789Z" 
    } 
}
```


### Get All Movies

- URL: `GET /api/movies`
- Description: Retrieve all movies.
- Request Headers:
  - Authorization: Bearer `<JWT_TOKEN>`
- Response Body:

```json
{
  "success": true,
  "message": "Movies retrieved successfully",
  "data": [
    {
      "_id": "6156f1d8c4ad35d1e04c85b1",
      "title": "Example Movie 1",
      "genre": "Action",
      "director": "John Smith",
      "releaseYear": 2021,
      "createdAt": "2023-04-23T12:34:56.789Z",
      "updatedAt": "2023-04-23T12:34:56.789Z"
    },
    {
      "_id": "6156f1d8c4ad35d1e04c85b2",
      "title": "Example Movie 2",
      "genre": "Drama",
      "director": "Jane Johnson",
      "releaseYear": 2020,
      "createdAt": "2023-04-23T12:34:56.789Z",
      "updatedAt": "2023-04-23T12:34:56.789Z"
    }
  ]
}
```
### Get a Movie by ID

-   URL: `GET /api/movies/:id`
-   Description: Retrieve a movie by its ID.
-   Request Headers:
    -   Authorization: Bearer `<JWT_TOKEN>`
-   Response Body:
```json
{
  "success": true,
  "message": "Movie retrieved successfully",
  "data": {
    "_id": "6156f1d8c4ad35d1e04c85b1",
    "title": "Example Movie 1",
    "genre": "Action",
    "director": "John Smith",
    "releaseYear": 2021,
    "createdAt": "2023-04-23T12:34:56.789Z",
    "updatedAt": "2023-04-23T12:34:56.789Z"
  }
}
```
### Update a Movie by ID

-   URL: `PUT /api/movies/:id`
-   Description: Update a movie by its ID.
-   Request Headers:
    -   Authorization: Bearer `<JWT_TOKEN>`
-   Request Body:
```json
{
  "title": "Updated Movie",
  "genre": "Comedy",
  "director": "Jane Johnson",
  "releaseYear": 2022
}
```
-   Response Body:
```json
{
  "success": true,
  "message": "Movie updated successfully",
  "data": {
    "_id": "6156f1d8c4ad35d1e04c85b1",
    "title": "Updated Movie",
    "genre": "Comedy",
    "director": "Jane Johnson",
    "releaseYear": 2022,
    "createdAt": "2023-04-23T12:34:56.789Z",
    "updatedAt": "2023-04-23T12:34:56.789Z"
  }
}
```
### Delete a Movie by ID

-   URL: `DELETE /api/movies/:id`
-   Description: Delete a movie by its ID.
-   Request Headers:
    -   Authorization: Bearer `<JWT_TOKEN>`
-   Response Body:
```json
{  
	"success":  true,  
	"message":  "Movie deleted successfully", 
	"data": null 
}
```

### Get All Reviews for a Movie

- URL: `GET /api/movies/:id/reviews`
- Description: Retrieve all reviews for a movie by its ID.
- Request Headers:
  - Authorization: Bearer `<JWT_TOKEN>`
- Response Body:

```json
{
  "success": true,
  "message": "Reviews retrieved successfully",
  "data": [
    {
      "_id": "6156f1d8c4ad35d1e04c85b3",
      "movieId": "6156f1d8c4ad35d1e04c85b1",
      "reviewerName": "User1",
      "reviewText": "This movie was great!",
      "rating": 4,
      "createdAt": "2023-04-23T12:34:56.789Z",
      "updatedAt": "2023-04-23T12:34:56.789Z"
    },
    {
      "_id": "6156f1d8c4ad35d1e04c85b4",
      "movieId": "6156f1d8c4ad35d1e04c85b1",
      "reviewerName": "User2",
      "reviewText": "I loved this movie!",
      "rating": 5,
      "createdAt": "2023-04-23T12:34:56.789Z",
      "updatedAt": "2023-04-23T12:34:56.789Z"
    }
  ]
}
```

### Add a Review for a Movie

-   URL: `POST /api/movies/:id/reviews`
-   Description: Add a review for a movie by its ID.
-   Request Headers:
    -   Authorization: Bearer `<JWT_TOKEN>`
-   Request Body:
```json
{
  "reviewerName": "User3",
  "reviewText": "This movie was amazing!",
  "rating": 5
}
```
- Response Body:
```json
{
  "success": true,
  "message": "Review added successfully",
  "data": {
    "_id": "6156f1d8c4ad35d1e04c85b5",
    "movieId": "6156f1d8c4ad35d1e04c85b1",
    "reviewerName": "User3",
    "reviewText": "This movie was amazing!",
    "rating": 5,
    "createdAt": "2023-04-23T12:34:56.789Z",
    "updatedAt": "2023-04-23T12:34:56.789Z"
  }
}
```
### Update a Review for a Movie

-   URL: `PUT /api/movies/:id/reviews/:reviewId`
-   Description: Update a review for a movie by its ID and review ID.
-   Request Headers:
    -   Authorization: Bearer `<JWT_TOKEN>`
-   Request Body:
```json
{
  "reviewerName": "User3",
  "reviewText": "This movie was awesome!",
  "rating": 4
}
```
- Response Body:
```json
{
  "success": true,
  "message": "Review updated successfully",
  "data": {
    "_id": "6156f1d8c4ad35d1e04c85b5",
    "movieId": "6156f1d8c4ad35d1e04c85b1",
    "reviewerName": "User3",
    "reviewText": "This movie was awesome!", 
    "rating": 4, 
    "createdAt": "2023-04-23T12:34:56.789Z", 
    "updatedAt": "2023-04-23T12:34:56.789Z" 
    } 
}
```

### Delete a Review for a Movie

- URL: `DELETE /api/movies/:id/reviews/:reviewId`
- Description: Delete a review for a movie by its ID and review ID.
- Request Headers:
  - Authorization: Bearer `<JWT_TOKEN>`
- Response Body:

```json
{
  "success": true,
  "message": "Review deleted successfully",
  "data": null
}
```
### Search Movies

-   URL: `GET /api/movies/search`
-   Description: Search movies based on title, genre, or release year.
-   Query Parameters:
    -   title (optional): Search movies by title.
    -   genre (optional): Search movies by genre.
    -   year (optional): Search movies by release year.
    -   page (optional): Page number for pagination. Default is 1.
    -   limit (optional): Number of results per page for pagination. Default is 10.
-   Response Body:
```json
{
  "success": true,
  "message": "Movies retrieved successfully",
  "data": {
    "movies": [
      {
        "_id": "6156f1d8c4ad35d1e04c85b1",
        "title": "Example Movie 1",
        "genre": "Action",
        "releaseYear": 2020,
        "createdAt": "2023-04-23T12:34:56.789Z",
        "updatedAt": "2023-04-23T12:34:56.789Z"
      },
      {
        "_id": "6156f1d8c4ad35d1e04c85b2",
        "title": "Example Movie 2",
        "genre": "Drama",
        "releaseYear": 2019,
        "createdAt": "2023-04-23T12:34:56.789Z",
        "updatedAt": "2023-04-23T12:34:56.789Z"
      }
    ],
    "totalCount": 2,
    "currentPage": 1,
    "totalPages": 1
  }
}
```
### Error Responses

If there is an error in the API request or processing, the response will contain an error object in the following format:
```json
{
  "success": false,
  "message": "Error message",
  "error": {
    "code": "Error code",
    "description": "Error description"
  }
}
```
Possible error codes:

-   `401`: Unauthorized - Invalid or missing JWT token in the request headers.
-   `403`: Forbidden - User does not have sufficient permissions to access the requested resource.
-   `404`: Not Found - Movie or review not found by ID or review ID.
-   `500`: Internal Server Error - Internal server error occurred during processing.

## Conclusion

This API documentation provides an overview of the available endpoints and their functionalities for the Movies API Node project. It includes information on how to make requests, required authorization, request and response formats, and possible error responses. Developers can use this documentation as a reference to interact with the API and build applications that utilize the movie data and review functionalities provided by the Movies API Node project.
