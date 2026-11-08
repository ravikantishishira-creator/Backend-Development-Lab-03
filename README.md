# Backend Development – Lab 03

## Project Title
Book Management API using Node.js, Express.js and SQLite.

## Objective
To develop REST APIs using Node.js and Express.js with SQLite database integration. The application supports retrieving, searching, sorting, filtering and paginating book records.

## Technologies Used
- Node.js
- Express.js
- SQLite
- SQLite3
- JavaScript

## Project Structure
```text
lab-03/
├── app.js
├── books.db
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## Features
1. Retrieve all books.
2. Search books using search parameters.
3. Sort books by selected columns.
4. Filter books using minimum and maximum prices.
5. Apply pagination using limit and offset.

## Installation

Install the dependencies:

```bash
npm install
```

## Running the Application

```bash
npm start
```

The server runs at:

```text
http://localhost:3000/
```

## API Endpoint

**GET – Retrieve Books**

```text
GET http://localhost:3000/books
```

Supported query parameters:
- `search_q` – Search for books.
- `order_by` – Select the sorting column.
- `order` – Choose ascending or descending order.
- `limit` – Set the maximum number of records.
- `offset` – Skip a specified number of records.
- `min_price` – Set the minimum price.
- `max_price` – Set the maximum price.

## Result
Successfully developed and executed a Book Management API using Node.js, Express.js and SQLite with search, sorting, filtering and pagination functionality.
