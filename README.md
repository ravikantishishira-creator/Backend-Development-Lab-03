# Backend Development Fundamentals – Lab 03

## 1. Student Information

| Field | Details |
|---|---|
| Student Name | Shishira Ravikanti |
| Registration Number | [Your Registration Number] |
| Class & Section | [Your Class & Section] |
| Study Level | UG |
| Year & Term | 2nd Year, II Term |
| Subject | Backend Development Fundamentals |
| Assessment | Lab Report 3 |
| Module | RESTful API Development and Validation |
| Report Title | REST API, Query Parameters, Validation and Debugging |

## 2. Project Overview

This project converts a basic Book CRUD application into a RESTful API. It uses Node.js, Express.js, SQLite and JavaScript to manage book records through resource-based HTTP endpoints.

### Features

- Perform Create, Read, Update and Delete operations using GET, POST, PUT and DELETE methods.
- Search book titles using query parameters.
- Sort books by title, author or price in ascending or descending order.
- Paginate results using limit and offset.
- Filter books using minimum and maximum price values.
- Validate book IDs, query parameters and JSON request bodies.
- Return appropriate HTTP status codes and consistent JSON responses.
- Use parameterized SQL queries for database operations.

## 3. Technologies Used

| Technology | Purpose |
|---|---|
| Node.js | Runs the JavaScript server. |
| Express.js | Defines API routes and handles HTTP requests and responses. |
| JavaScript | Implements API logic, validation and database operations. |
| SQLite | Stores book records in the local database. |
| sqlite | Provides database interaction through Node.js. |
| sqlite3 | Connects the application to the SQLite database. |
| Postman | Used to send API requests and test responses. |
| VS Code | Used to develop and run the application. |

## 4. Project Structure

The project contains the following files:

```text
lab-03/
├── app.js
├── books.db
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

**File Description:**

- `app.js` – Contains the Express server and REST API endpoints.
- `books.db` – SQLite database containing book records.
- `package.json` – Contains project details and dependencies.
- `package-lock.json` – Records the installed dependency versions.
- `.gitignore` – Specifies files and folders excluded from Git.
- `README.md` – Provides project documentation and instructions.

## 5. Installation and Setup

### Requirements

- Node.js and npm
- Visual Studio Code
- Postman for API testing

### Installation Steps

1. Open the Lab 03 project folder in VS Code.
2. Open the integrated terminal.
3. Install the required dependencies:

```bash
npm install
```

4. Start the server:

```bash
npm start
```

5. After successful execution, the server runs at:

```text
http://localhost:3000
```

Keep the `books.db` file in the same folder as `app.js`.

## 6. API Endpoints

All API routes use the `/books` resource.

| HTTP Method | Endpoint | Description |
|---|---|---|
| GET | `/books` | Retrieves all books with optional filtering, sorting and pagination. |
| GET | `/books/:bookId` | Retrieves a particular book using its ID. |
| POST | `/books` | Creates a new book. |
| PUT | `/books/:bookId` | Updates an existing book. |
| DELETE | `/books/:bookId` | Deletes a book using its ID. |

### Request Body Example

POST and PUT requests accept JSON data.

```json
{
  "title": "Sample Book",
  "author": "Test Author",
  "price": 250,
  "pages": 180
}
```

The API validates the input before performing database operations.

## 7. Query Parameters

Query parameters are used with the GET `/books` endpoint.

| Parameter | Purpose |
|---|---|
| `search_q` | Searches for books using their titles. |
| `order_by` | Sorts books by title, author or price. |
| `order` | Specifies ascending (ASC) or descending (DESC) order. |
| `limit` | Specifies the maximum number of records returned. |
| `offset` | Skips a specified number of records. |
| `min_price` | Specifies the minimum book price. |
| `max_price` | Specifies the maximum book price. |

### Request Examples

**1. Search Books**

```text
GET /books?search_q=the
```

Searches for books whose titles contain the given text.

**2. Sort Books**

```text
GET /books?order_by=price&order=DESC
```

Sorts books by price in descending order.

**3. Pagination**

```text
GET /books?limit=5&offset=0
```

Returns a maximum of five books starting from the first record.

**4. Price Filtering**

```text
GET /books?min_price=100&max_price=500
```

Returns books within the specified price range.

**5. Combined Query Parameters**

```text
GET /books?search_q=the&order_by=price&order=ASC&limit=5&offset=0&min_price=100&max_price=500
```

Combines searching, sorting, pagination and price filtering in one request.

## 8. Postman API Testing

Postman is used to test the REST API endpoints.

The following operations can be tested:

| Test | HTTP Method | Expected Result |
|---|---|---|
| Get All Books | GET | Returns the list of books. |
| Get Book by ID | GET | Returns a particular book. |
| Create Book | POST | Creates a new book. |
| Update Book | PUT | Updates an existing book. |
| Delete Book | DELETE | Deletes a book. |
| Search Books | GET | Returns matching book titles. |
| Sort Books | GET | Returns books in the selected order. |
| Pagination | GET | Returns a limited set of records. |
| Price Filtering | GET | Returns books within the selected price range. |
| Validation Testing | POST | Returns an error for invalid input. |
| Book Not Found | GET | Returns a 404 response when the book does not exist. |

### HTTP Status Codes

| Status Code | Description |
|---|---|
| 200 | OK – Request completed successfully. |
| 201 | Created – New book created successfully. |
| 400 | Bad Request – Invalid input or query parameters. |
| 404 | Not Found – Requested book or endpoint does not exist. |
| 500 | Internal Server Error – Unexpected server-side error. |

## 9. Debugging and Troubleshooting

| Error | Cause | Solution |
|---|---|---|
| EADDRINUSE | Another server is using the selected port. | Stop the existing server or use another port. |
| Wrong Import Path | Incorrect module or file path. | Check the filename and relative path. |
| SQLite No Such Table | Expected database table is missing. | Verify the database file and table name. |
| Missing Await | Asynchronous operation is not completed before accessing its result. | Use `await` inside an async function. |
| Invalid Input | Request contains incorrect or missing values. | Check the request body and query parameters. |

## 10. Result

The project successfully demonstrates the development of a RESTful Book API using Node.js, Express.js and SQLite. It supports CRUD operations, searching, sorting, pagination, price filtering, input validation and appropriate HTTP responses.

## 11. Conclusion

This lab helped in understanding RESTful API development using Node.js and Express.js. It provided practical knowledge of HTTP methods, status codes, SQLite database integration, query parameters, input validation and API testing using Postman.

Through this project, the concepts of backend development and database interaction were implemented in a practical application.
