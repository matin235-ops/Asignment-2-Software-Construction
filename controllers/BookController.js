const Book = require('../models/Book');

class BookController {
    constructor() {
        // In-memory storage with sample data
        this.books = [
            new Book('The Great Gatsby', 'F. Scott Fitzgerald', 'Classic Fiction', 1925, true),
            new Book('To Kill a Mockingbird', 'Harper Lee', 'Fiction', 1960, false),
            new Book('1984', 'George Orwell', 'Dystopian Fiction', 1949, true),
            new Book('Pride and Prejudice', 'Jane Austen', 'Romance', 1813, false),
            new Book('The Catcher in the Rye', 'J.D. Salinger', 'Coming-of-age Fiction', 1951, false)
        ];
    }

    // Get all books
    getAllBooks() {
        return this.books;
    }

    // Get a book by ID
    getBookById(id) {
        return this.books.find(book => book.id === id);
    }

    // Add a new book
    addBook(bookData) {
        const errors = Book.validate(bookData);
        if (errors.length > 0) {
            throw new Error(errors.join(', '));
        }

        // Ensure favorite is always boolean
        const isFavorite = bookData.favorite === 'true' || bookData.favorite === true;

        const newBook = new Book(
            bookData.title.trim(),
            bookData.author.trim(),
            bookData.genre.trim(),
            bookData.publicationYear,
            isFavorite
        );

        this.books.push(newBook);
        return newBook;
    }

    // Update a book
    updateBook(id, updateData) {
        const book = this.getBookById(id);
        if (!book) {
            throw new Error('Book not found');
        }

        const errors = Book.validate(updateData);
        if (errors.length > 0) {
            throw new Error(errors.join(', '));
        }

        book.update(updateData);
        return book;
    }

    // Delete a book
    deleteBook(id) {
        const bookIndex = this.books.findIndex(book => book.id === id);
        if (bookIndex === -1) {
            throw new Error('Book not found');
        }

        const deletedBook = this.books.splice(bookIndex, 1)[0];
        return deletedBook;
    }

    // Search books by title or author (partial match)
    searchBooks(query) {
        if (!query || query.trim().length === 0) {
            return this.books;
        }

        const searchTerm = query.toLowerCase().trim();
        return this.books.filter(book =>
            book.title.toLowerCase().includes(searchTerm) ||
            book.author.toLowerCase().includes(searchTerm)
        );
    }

    // Sort books by different criteria
    sortBooks(sortBy = 'title', order = 'asc') {
        const sortedBooks = [...this.books];

        sortedBooks.sort((a, b) => {
            let valueA, valueB;

            switch (sortBy) {
                case 'author':
                    valueA = a.author.toLowerCase();
                    valueB = b.author.toLowerCase();
                    break;
                case 'year':
                    valueA = a.publicationYear;
                    valueB = b.publicationYear;
                    break;
                case 'genre':
                    valueA = a.genre.toLowerCase();
                    valueB = b.genre.toLowerCase();
                    break;
                default: // title
                    valueA = a.title.toLowerCase();
                    valueB = b.title.toLowerCase();
            }

            if (order === 'desc') {
                return valueA < valueB ? 1 : valueA > valueB ? -1 : 0;
            } else {
                return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
            }
        });

        return sortedBooks;
    }

    // Get books statistics
    getStats() {
        const totalBooks = this.books.length;
        const favoriteBooks = this.books.filter(book => book.favorite).length;
        const genres = [...new Set(this.books.map(book => book.genre))];
        const authors = [...new Set(this.books.map(book => book.author))];

        const yearRange = this.books.length > 0 ? {
            oldest: Math.min(...this.books.map(book => book.publicationYear)),
            newest: Math.max(...this.books.map(book => book.publicationYear))
        } : { oldest: 0, newest: 0 };

        return {
            totalBooks,
            favoriteBooks,
            totalGenres: genres.length,
            totalAuthors: authors.length,
            yearRange
        };
    }
}

// Create a single instance to maintain state
const bookController = new BookController();

module.exports = bookController;