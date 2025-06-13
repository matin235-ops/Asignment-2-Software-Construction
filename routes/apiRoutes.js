const express = require('express');
const router = express.Router();
const bookController = require('../controllers/BookController');

// API Documentation endpoint
router.get('/', (req, res) => {
    console.log('API route hit, Accept header:', req.headers.accept);

    // Check if client specifically wants JSON (like curl with -H "Accept: application/json")
    if (req.headers.accept && req.headers.accept === 'application/json') {
        console.log('Serving JSON response');
        res.json({
            message: 'Book Management System API',
            version: '1.0.0',
            endpoints: {
                'GET /api/books': 'Get all books (supports ?search=query&sort=field&order=asc|desc)',
                'POST /api/books': 'Add a new book',
                'GET /api/books/:id': 'Get a specific book by ID',
                'PUT /api/books/:id': 'Update a book by ID',
                'DELETE /api/books/:id': 'Delete a book by ID',
                'PATCH /api/books/:id/favorite': 'Toggle favorite status',
                'GET /api/stats': 'Get books statistics'
            },
            sampleBook: {
                title: 'Sample Book Title',
                author: 'Author Name',
                genre: 'Fiction',
                publicationYear: 2023,
                favorite: false
            }
        });
    } else { // Serve HTML documentation for browsers by default
        console.log('Serving HTML documentation');
        try {
            res.render('api-docs', {
                title: 'API Documentation - Book Management System'
            });
        } catch (error) {
            console.error('Error rendering api-docs:', error);
            res.status(500).send('Error loading API documentation: ' + error.message);
        }
    }
});

// GET /api/books - Retrieve all books
router.get('/books', (req, res) => {
    try {
        const { search, sort, order } = req.query;
        let books;

        if (search) {
            books = bookController.searchBooks(search);
        } else {
            books = bookController.getAllBooks();
        }

        if (sort) {
            books = bookController.sortBooks(sort, order);
            if (search) {
                books = books.filter(book =>
                    book.title.toLowerCase().includes(search.toLowerCase()) ||
                    book.author.toLowerCase().includes(search.toLowerCase())
                );
            }
        }

        res.json({
            success: true,
            count: books.length,
            data: books
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// POST /api/books - Add a new book
router.post('/books', (req, res) => {
    try {
        const newBook = bookController.addBook(req.body);
        res.status(201).json({
            success: true,
            message: 'Book created successfully',
            data: newBook
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
});

// GET /api/books/:id - Get a specific book
router.get('/books/:id', (req, res) => {
    try {
        const book = bookController.getBookById(req.params.id);
        if (!book) {
            return res.status(404).json({
                success: false,
                error: 'Book not found'
            });
        }

        res.json({
            success: true,
            data: book
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// PUT /api/books/:id - Update a book
router.put('/books/:id', (req, res) => {
    try {
        const updatedBook = bookController.updateBook(req.params.id, req.body);
        res.json({
            success: true,
            message: 'Book updated successfully',
            data: updatedBook
        });
    } catch (error) {
        const statusCode = error.message === 'Book not found' ? 404 : 400;
        res.status(statusCode).json({
            success: false,
            error: error.message
        });
    }
});

// DELETE /api/books/:id - Delete a book
router.delete('/books/:id', (req, res) => {
    try {
        const deletedBook = bookController.deleteBook(req.params.id);
        res.json({
            success: true,
            message: 'Book deleted successfully',
            data: deletedBook
        });
    } catch (error) {
        const statusCode = error.message === 'Book not found' ? 404 : 500;
        res.status(statusCode).json({
            success: false,
            error: error.message
        });
    }
});

// PATCH /api/books/:id/favorite - Toggle favorite status
router.patch('/books/:id/favorite', (req, res) => {
    try {
        const book = bookController.getBookById(req.params.id);
        if (!book) {
            return res.status(404).json({
                success: false,
                error: 'Book not found'
            });
        }

        book.favorite = !book.favorite;
        res.json({
            success: true,
            message: `Book ${book.favorite ? 'added to' : 'removed from'} favorites`,
            data: { id: book.id, favorite: book.favorite }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// GET /api/stats - Get statistics
router.get('/stats', (req, res) => {
    try {
        const stats = bookController.getStats();
        res.json({
            success: true,
            data: stats
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

module.exports = router;