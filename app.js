
const path = require('path');
const express = require('express');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

const app = express();
const PORT = process.env.PORT || 3000;
const dbPath = path.join(__dirname, 'books.db');

let db = null;

app.use(express.json());

// GET /books - Search, sorting, pagination and price filtering
app.get('/books', async (req, res) => {
    try {
        const {
            search_q = '',
            order_by = 'id',
            order = 'ASC',
            limit = '10',
            offset = '0',
            min_price,
            max_price
        } = req.query;

        const allowedColumns = ['id', 'title', 'author', 'price', 'pages'];
        const sortColumn = String(order_by).toLowerCase();
        const sortOrder = String(order).toUpperCase();

        if (!allowedColumns.includes(sortColumn)) {
            return res.status(400).json({ message: 'Invalid order_by value.' });
        }

        if (!['ASC', 'DESC'].includes(sortOrder)) {
            return res.status(400).json({ message: 'order must be ASC or DESC.' });
        }

        const pageLimit = Number(limit);
        const pageOffset = Number(offset);

        if (!Number.isInteger(pageLimit) || pageLimit <= 0 ||
            !Number.isInteger(pageOffset) || pageOffset < 0) {
            return res.status(400).json({
                message: 'limit must be a positive integer and offset must be a non-negative integer.'
            });
        }

        const conditions = [];
        const values = [];

        if (String(search_q).trim() !== '') {
            conditions.push('title LIKE ?');
            values.push(`%${String(search_q).trim()}%`);
        }

        if (min_price !== undefined) {
            const min = Number(min_price);
            if (!Number.isFinite(min)) {
                return res.status(400).json({ message: 'min_price must be numeric.' });
            }
            conditions.push('price >= ?');
            values.push(min);
        }

        if (max_price !== undefined) {
            const max = Number(max_price);
            if (!Number.isFinite(max)) {
                return res.status(400).json({ message: 'max_price must be numeric.' });
            }
            conditions.push('price <= ?');
            values.push(max);
        }

        if (min_price !== undefined && max_price !== undefined &&
            Number(min_price) > Number(max_price)) {
            return res.status(400).json({
                message: 'min_price cannot be greater than max_price.'
            });
        }

        let sql = 'SELECT * FROM book';

        if (conditions.length > 0) {
            sql += ' WHERE ' + conditions.join(' AND ');
        }

        sql += ` ORDER BY ${sortColumn} ${sortOrder} LIMIT ? OFFSET ?`;
        values.push(pageLimit, pageOffset);

        const books = await db.all(sql, values);
        return res.status(200).json(books);

    } catch (error) {
        console.error('GET /books error:', error.message);
        return res.status(500).json({ message: 'Unable to retrieve books.' });
    }
});

// GET /books/:bookId
app.get('/books/:bookId', async (req, res) => {
    try {
        const book = await db.get(
            'SELECT * FROM book WHERE id = ?',
            [req.params.bookId]
        );

        if (!book) {
            return res.status(404).json({ message: 'Book not found.' });
        }

        return res.status(200).json(book);

    } catch (error) {
        console.error('GET /books/:bookId error:', error.message);
        return res.status(500).json({ message: 'Unable to retrieve the book.' });
    }
});

// POST /books
app.post('/books', async (req, res) => {
    try {
        const { title, author, price, pages } = req.body;

        if (typeof title !== 'string' || title.trim() === '') {
            return res.status(400).json({ message: 'title is required.' });
        }

        if (typeof author !== 'string' || author.trim() === '') {
            return res.status(400).json({ message: 'author is required.' });
        }

        if (price === undefined || price === null || price === '' ||
            !Number.isFinite(Number(price))) {
            return res.status(400).json({ message: 'price must be a numeric value.' });
        }

        const numericPrice = Number(price);

        if (numericPrice < 0) {
            return res.status(400).json({ message: 'price cannot be negative.' });
        }

        const numericPages = pages === undefined || pages === '' ? null : Number(pages);

        if (numericPages !== null &&
            (!Number.isInteger(numericPages) || numericPages <= 0)) {
            return res.status(400).json({ message: 'pages must be a positive integer.' });
        }

        const result = await db.run(
            'INSERT INTO book (title, author, price, pages) VALUES (?, ?, ?, ?)',
            [title.trim(), author.trim(), numericPrice, numericPages]
        );

        return res.status(201).json({
            message: 'Book created successfully.',
            bookId: result.lastID
        });

    } catch (error) {
        console.error('POST /books error:', error.message);
        return res.status(500).json({ message: 'Unable to create the book.' });
    }
});

// PUT /books/:bookId
app.put('/books/:bookId', async (req, res) => {
    try {
        const { title, author, price, pages } = req.body;

        if (typeof title !== 'string' || title.trim() === '') {
            return res.status(400).json({ message: 'title is required.' });
        }

        if (typeof author !== 'string' || author.trim() === '') {
            return res.status(400).json({ message: 'author is required.' });
        }

        if (price === undefined || price === null || price === '' ||
            !Number.isFinite(Number(price)) || Number(price) < 0) {
            return res.status(400).json({
                message: 'price must be a non-negative numeric value.'
            });
        }

        const numericPages = pages === undefined || pages === '' ? null : Number(pages);

        if (numericPages !== null &&
            (!Number.isInteger(numericPages) || numericPages <= 0)) {
            return res.status(400).json({ message: 'pages must be a positive integer.' });
        }

        const result = await db.run(
            'UPDATE book SET title = ?, author = ?, price = ?, pages = ? WHERE id = ?',
            [title.trim(), author.trim(), Number(price), numericPages, req.params.bookId]
        );

        if (result.changes === 0) {
            return res.status(404).json({ message: 'Book not found.' });
        }

        return res.status(200).json({ message: 'Book updated successfully.' });

    } catch (error) {
        console.error('PUT /books/:bookId error:', error.message);
        return res.status(500).json({ message: 'Unable to update the book.' });
    }
});

// DELETE /books/:bookId
app.delete('/books/:bookId', async (req, res) => {
    try {
        const result = await db.run(
            'DELETE FROM book WHERE id = ?',
            [req.params.bookId]
        );

        if (result.changes === 0) {
            return res.status(404).json({ message: 'Book not found.' });
        }

        return res.status(200).json({ message: 'Book deleted successfully.' });

    } catch (error) {
        console.error('DELETE /books/:bookId error:', error.message);
        return res.status(500).json({ message: 'Unable to delete the book.' });
    }
});

// Connect to SQLite before starting the server
const initializeDBAndServer = async () => {
    try {
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database
        });

        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}/`);
        });

    } catch (error) {
        console.error('Database connection error:', error.message);
        process.exit(1);
    }
};

initializeDBAndServer();
