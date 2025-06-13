const express = require('express');
const router = express.Router();
const bookController = require('../controllers/BookController');

// Home page - Display all books
router.get('/', (req, res) => {
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

        const stats = bookController.getStats();

        res.render('index', {
            title: 'Book Management System',
            books: books,
            stats: stats,
            search: search || '',
            sort: sort || '',
            order: order || 'asc'
        });
    } catch (error) {
        res.render('error', {
            title: 'Error',
            message: error.message
        });
    }
});

// Show add book form
router.get('/books/add', (req, res) => {
    res.render('add-book', {
        title: 'Add New Book',
        book: {},
        errors: []
    });
});

// Add a new book
router.post('/books', (req, res) => {
    try {
        const newBook = bookController.addBook(req.body);
        res.redirect('/?success=Book added successfully');
    } catch (error) {
        res.render('add-book', {
            title: 'Add New Book',
            book: req.body,
            errors: [error.message]
        });
    }
});

// Show edit book form
router.get('/books/:id/edit', (req, res) => {
    try {
        const book = bookController.getBookById(req.params.id);
        if (!book) {
            return res.render('error', {
                title: 'Book Not Found',
                message: 'The book you are looking for does not exist.'
            });
        }

        res.render('edit-book', {
            title: 'Edit Book',
            book: book,
            errors: []
        });
    } catch (error) {
        res.render('error', {
            title: 'Error',
            message: error.message
        });
    }
});

// Update a book
router.put('/books/:id', (req, res) => {
    try {
        const updatedBook = bookController.updateBook(req.params.id, req.body);
        res.redirect('/?success=Book updated successfully');
    } catch (error) {
        const book = bookController.getBookById(req.params.id) || req.body;
        book.id = req.params.id;
        res.render('edit-book', {
            title: 'Edit Book',
            book: book,
            errors: [error.message]
        });
    }
});

// Delete a book
router.delete('/books/:id', (req, res) => {
    try {
        bookController.deleteBook(req.params.id);
        res.redirect('/?success=Book deleted successfully');
    } catch (error) {
        res.redirect('/?error=' + encodeURIComponent(error.message));
    }
});

// Toggle favorite status
router.patch('/books/:id/favorite', (req, res) => {
    try {
        const book = bookController.getBookById(req.params.id);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }

        book.favorite = !book.favorite;
        res.json({ success: true, favorite: book.favorite });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;