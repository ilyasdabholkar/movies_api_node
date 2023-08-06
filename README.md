# Movies API

This API documentation provides details about the Movies API endpoints that you can use to interact with movie data, users, and rentals. All API endpoints are represented using the HTTP methods (GET, POST, PUT, DELETE) and their respective URLs.

## Base URL

The base URL for all Movies API endpoints is: `http://localhost:5000/api`

## Users

### GetAllUsers

- **Description:** Get all users.
- **URL:** `GET /users/`

### RegisterUser

- **Description:** Register a new user.
- **URL:** `POST /users/register`
- **Request Body:**
  ```json
  {
    "email": "ilyasdabholkar9@gmail.com",
    "name": "ilyas dabholkar",
    "password": "Pass@123"
  }
  ```

### GetUserById

- **Description:** Get a user by ID.
- **URL:** `GET /users/:userId`
- **Parameters:**
  - `:userId`: The ID of the user.

### LoginUser

- **Description:** Login a user.
- **URL:** `POST /auth/login`
- **Request Body:**
  ```json
  {
    "password": "Pass@123",
    "email": "ilyasdabholkar9@gmail.com"
  }
  ```

## Genres

### CreateGenre

- **Description:** Create a new genre.
- **URL:** `POST /genres/`
- **Request Header:**
  - `token: Bearer <access_token>`
- **Request Body:**
  ```json
  {
    "name": "horror"
  }
  ```

### GetAllGenres

- **Description:** Get all genres.
- **URL:** `GET /genres/`
- **Request Header:**
  - `token: Bearer <access_token>`

### GetGenreById

- **Description:** Get a genre by ID.
- **URL:** `GET /genres/:genreId`
- **Parameters:**
  - `:genreId`: The ID of the genre.
- **Request Header:**
  - `token: Bearer <access_token>`

### DeleteGenre

- **Description:** Delete a genre.
- **URL:** `DELETE /genres/:genreId`
- **Parameters:**
  - `:genreId`: The ID of the genre.
- **Request Header:**
  - `token: Bearer <access_token>`

### UpdateGenre

- **Description:** Update a genre.
- **URL:** `PUT /genres/:genreId`
- **Parameters:**
  - `:genreId`: The ID of the genre.
- **Request Header:**
  - `token: Bearer <access_token>`
- **Request Body:**
  ```json
  {
    "name": "action"
  }
  ```

## Movies

### AddMovie

- **Description:** Add a new movie.
- **URL:** `POST /movies/`
- **Request Header:**
  - `token: Bearer <access_token>`
- **Request Body:**
  ```json
  {
    "title": "Phir Hera Pheri",
    "numberInStock": 35,
    "dailyRentalRate": 15,
    "genreId": "6395ff8d7fcf27d5b4554479"
  }
  ```

### GetAllMovies

- **Description:** Get all movies.
- **URL:** `GET /movies/`
- **Request Header:**
  - `token: Bearer <access_token>`

### GetMovieById

- **Description:** Get a movie by ID.
- **URL:** `GET /movies/:movieId`
- **Parameters:**
  - `:movieId`: The ID of the movie.
- **Request Header:**
  - `token: Bearer <access_token>`

### UpdateMovie

- **Description:** Update a movie.
- **URL:** `PUT /movies/:movieId`
- **Parameters:**
  - `:movieId`: The ID of the movie.
- **Request Header:**
  - `token: Bearer <access_token>`
- **Request Body:**
  ```json
  {
    "title": "Jumanji: Welcome to the Jungle",
    "numberInStock": 31,
    "dailyRentalRate": 11,
    "genreId": "63960461ada2206587a25e87"
  }
  ```

### DeleteMovie

- **Description:** Delete a movie.
- **URL:** `DELETE /movies/:movieId`
- **Parameters:**
  - `:movieId`: The ID of the movie.
- **Request Header:**
  - `token: Bearer <access_token>`

## Customers

### CreateCustomer

- **Description:** Create a new customer.
- **URL:** `POST /customers/`
- **Request Body:**
  ```json
  {
    "name": "abhishek",
    "isGold": true,
    "phone": "8787676543"
  }
  ```

### GetAllCustomers

- **Description:** Get all customers.
- **URL:** `GET /customers/`

### GetCustomerById

- **Description:** Get a customer by ID.
- **URL:** `GET /customers/:customerId`
- **Parameters:**
  - `:customerId`: The ID of the customer.

### UpdateCustomer

- **Description:** Update a customer.
- **URL:** `PUT /customers/:customerId`
- **Parameters:**
  - `:customerId`: The ID of the customer.
- **Request Body:**
  ```json
  {
    "name": "ilyas",
    "isGold": true,
    "phone": "9876543212"
  }
  ```

### DeleteCustomer

- **Description:** Delete a customer.
- **URL:** `DELETE /customers/:customerId`
- **Parameters:**
  - `:customerId`: The ID of the customer.

## Rentals

### ReturnMovie

- **Description:** Return a rented movie.
- **URL:** `POST /returns/`
- **Request Body:**
  ```json
  {
    "movieId": "63960a4a1d9cdabbd0fb0bee",
    "customerId": "63960a4a1d9cdabbd0fb0bee"
  }
  ```

### RentMovie

- **Description:** Rent a movie.
- **URL:** `POST /rentals/`
- **Request Body:**
  ```json
  {
    "movieId": "63960a4a1d9cdabbd0fb0bee",
    "customerId": "63960a4a1d9cdabbd0fb0bef"
  }
  ```

### GetAllRentals

- **Description:** Get all rentals.
- **URL:** `GET /rentals/`

### GetRentalById

- **Description:** Get a rental by ID.
- **URL:** `GET /rentals/:rentalId`
- **Parameters:**
  - `:rentalId`: The ID of the rental.

### DeleteRental

- **Description:** Delete a rental.
- **URL:** `DELETE /rentals/:rentalId`
- **Parameters:**
  - `:rentalId`: The ID of the rental.

## Error Responses

The API will respond with appropriate error codes and messages for different scenarios, such as invalid input or authentication failure.

- **400 Bad Request:** The request was invalid or could not be processed.
- **401 Unauthorized:** Authentication credentials are missing or invalid.
- **403 Forbidden:** The user does not have permission to access the requested resource.
- **404 Not Found:** The requested resource could not be found.
- **500 Internal Server Error:** An unexpected error occurred on the server.

## Authentication

Some endpoints require authentication. To authenticate, obtain an access token by logging in using the `LoginUser` endpoint. After successful login, you will receive an access token in the response. Use this token as a bearer token in the `Authorization` header for authenticated endpoints.

Example:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOTI3ZmU4MWY4NjQ4MDA1MjRhZTEyMyIsImVtYWlsIjoiaWx5YXNkYWJob2xrYXI5QGdtYWlsLmNvbSIsImlhdCI6MTYzMDM3OTIyOCwiZXhwIjoxNjMwNDA1NjI4fQ.CTkzihD8hSGYrMqyCLZ_g6BcKvEkoyd7DBOet_jFANU
```

Please note that the actual access token you receive will be different, and it's essential to keep it secure and not share it publicly.

## Conclusion

This concludes the API documentation for the Movies API. Please make sure to use valid request bodies, parameters, and headers when making API calls. If you encounter any issues or have further questions, feel free to reach out for support.

Thank you for using the Movies API! Happy coding! 🎉
