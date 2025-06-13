const { v4: uuidv4 } = require('uuid');

class Book {
    constructor(title, author, genre, publicationYear, favorite = false) {
        this.id = uuidv4();
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.publicationYear = parseInt(publicationYear);
        this.favorite = favorite;
        this.createdAt = new Date();
    }

    // Validate book data
    static validate(bookData) {
        const errors = [];

        if (!bookData.title || bookData.title.trim().length === 0) {
            errors.push('Title is required');
        }

        if (!bookData.author || bookData.author.trim().length === 0) {
            errors.push('Author is required');
        }

        if (!bookData.genre || bookData.genre.trim().length === 0) {
            errors.push('Genre is required');
        }

        if (!bookData.publicationYear) {
            errors.push('Publication year is required');
        } else {
            const year = parseInt(bookData.publicationYear);
            const currentYear = new Date().getFullYear();
            if (isNaN(year) || year < 1000 || year > currentYear) {
                errors.push(`Publication year must be between 1000 and ${currentYear}`);
            }
        }

        return errors;
    }

    // Update book properties
    update(updateData) {
        if (updateData.title !== undefined) this.title = updateData.title;
        if (updateData.author !== undefined) this.author = updateData.author;
        if (updateData.genre !== undefined) this.genre = updateData.genre;
        if (updateData.publicationYear !== undefined) this.publicationYear = parseInt(updateData.publicationYear);
        if (updateData.favorite !== undefined) this.favorite = updateData.favorite === 'true' || updateData.favorite === true;
    }
}

module.exports = Book;