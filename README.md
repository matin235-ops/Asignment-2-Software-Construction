# 📚 Book Management System

A comprehensive web application for managing your book collection with full CRUD operations, search functionality, and RESTful API endpoints.

## ✨ Features

### 🧩 Core Functionalities
1. **Add New Books** - Add books with title, author, genre, publication year, and favorite status
2. **View All Books** - Display all books in an attractive card-based layout
3. **Update Book Information** - Edit any book details
4. **Delete Books** - Remove books from the collection with confirmation
5. **Search Books** - Find books by title or author (partial match supported)

### 🌐 RESTful API Endpoints
- `POST /api/books` → Add a new book
- `GET /api/books` → Retrieve all books (supports query parameters)
- `GET /api/books/:id` → Get a specific book
- `PUT /api/books/:id` → Update a book
- `DELETE /api/books/:id` → Delete a book
- `PATCH /api/books/:id/favorite` → Toggle favorite status
- `GET /api/stats` → Get collection statistics

### 💡 Bonus Features
- **Bootstrap UI** - Modern, responsive design
- **Favorite Toggle** - Mark books as favorites
- **Sort Functionality** - Sort by title, author, year, or genre
- **Statistics Dashboard** - View collection overview
- **Real-time Search** - Auto-submit search as you type
- **Form Validation** - Client and server-side validation
- **Error Handling** - Comprehensive error messages
- **Sample Data** - Pre-loaded with example books

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation

1. **Clone or download** the project to your computer
2. **Navigate** to the project directory:
   ```powershell
   cd "c:\Users\sword\Desktop\AS2"
   ```

3. **Install dependencies**:
   ```powershell
   npm install
   ```

4. **Start the application**:
   ```powershell
   npm start
   ```

   Or for development with auto-restart:
   ```powershell
   npm run dev
   ```

5. **Open your browser** and visit:
   - Web Interface: http://localhost:3000
   - API Documentation: http://localhost:3000/api

## 📖 Usage Guide

### Web Interface

#### Adding a Book
1. Click the "Add Book" button or visit `/books/add`
2. Fill in the required fields:
   - **Title** (required)
   - **Author** (required)
   - **Genre** (required) - with auto-suggestions
   - **Publication Year** (required)
   - **Favorite** (optional checkbox)
3. Click "Add Book" to save

#### Viewing Books
- The home page displays all books in card format
- Each card shows title, author, genre, publication year
- Favorite books are marked with a heart icon
- Statistics are displayed at the top

#### Searching Books
- Use the search bar to find books by title or author
- Search supports partial matches
- Results update automatically as you type (after 3+ characters)

#### Sorting Books
- Use the "Sort by" dropdown to organize books
- Sort by: Title, Author, Year, or Genre
- Choose Ascending or Descending order

#### Editing Books
1. Click the "Edit" button on any book card
2. Modify the desired fields
3. Click "Update Book" to save changes

#### Deleting Books
1. Click the "Delete" button on any book card (or edit page)
2. Confirm the deletion in the popup modal
3. The book will be permanently removed

### API Usage

#### Testing with curl

**Get all books:**
```powershell
curl http://localhost:3000/api/books
```

**Add a new book:**
```powershell
curl -X POST http://localhost:3000/api/books -H "Content-Type: application/json" -d '{\"title\":\"Dune\",\"author\":\"Frank Herbert\",\"genre\":\"Science Fiction\",\"publicationYear\":1965}'
```

**Get a specific book:**
```powershell
curl http://localhost:3000/api/books/{book-id}
```

**Update a book:**
```powershell
curl -X PUT http://localhost:3000/api/books/{book-id} -H "Content-Type: application/json" -d '{\"title\":\"Updated Title\"}'
```

**Delete a book:**
```powershell
curl -X DELETE http://localhost:3000/api/books/{book-id}
```

**Search books:**
```powershell
curl "http://localhost:3000/api/books?search=tolkien"
```

**Sort books:**
```powershell
curl "http://localhost:3000/api/books?sort=year&order=desc"
```

#### Testing with Postman

1. **Import Collection**: Use the following base URL: `http://localhost:3000/api`

2. **Sample Requests**:

   **POST /api/books** (Add Book)
   ```json
   {
     "title": "The Hobbit",
     "author": "J.R.R. Tolkien",
     "genre": "Fantasy",
     "publicationYear": 1937,
     "favorite": true
   }
   ```

   **PUT /api/books/:id** (Update Book)
   ```json
   {
     "title": "The Hobbit: An Unexpected Journey",
     "favorite": false
   }
   ```

## 🏗️ Project Structure

```
book-management-system/
├── controllers/
│   └── BookController.js    # Business logic for book operations
├── models/
│   └── Book.js             # Book model with validation
├── routes/
│   ├── bookRoutes.js       # Web interface routes
│   └── apiRoutes.js        # RESTful API routes
├── views/
│   ├── index.ejs           # Home page template
│   ├── add-book.ejs        # Add book form
│   ├── edit-book.ejs       # Edit book form
│   └── error.ejs           # Error page template
├── public/
│   ├── css/
│   │   └── style.css       # Custom styles
│   └── js/
│       └── main.js         # Client-side JavaScript
├── package.json            # Dependencies and scripts
├── server.js              # Main application file
└── README.md              # This file
```

## 🎯 Sample Data

The application comes pre-loaded with these sample books:

1. **The Great Gatsby** by F. Scott Fitzgerald (Classic Fiction, 1925) ⭐
2. **To Kill a Mockingbird** by Harper Lee (Fiction, 1960)
3. **1984** by George Orwell (Dystopian Fiction, 1949) ⭐
4. **Pride and Prejudice** by Jane Austen (Romance, 1813)
5. **The Catcher in the Rye** by J.D. Salinger (Coming-of-age Fiction, 1951)

## 🔧 Technical Details

### Architecture
- **MVC Pattern**: Model-View-Controller architecture
- **RESTful Design**: Standard HTTP methods and status codes
- **Responsive UI**: Bootstrap 5 for mobile-friendly design
- **In-Memory Storage**: Data persists during application runtime

### Technologies Used
- **Backend**: Node.js, Express.js
- **Frontend**: EJS templating, Bootstrap 5, Vanilla JavaScript
- **Validation**: Server-side and client-side validation
- **Icons**: Bootstrap Icons
- **HTTP Methods**: GET, POST, PUT, DELETE, PATCH

### Key Features
- **Form Validation**: Both client and server-side
- **Error Handling**: Comprehensive error messages
- **Search**: Real-time search with partial matching
- **Sorting**: Multiple sort criteria with order control
- **Favorites**: Toggle favorite status with visual feedback
- **Statistics**: Real-time collection statistics
- **Responsive**: Works on desktop, tablet, and mobile
- **Accessibility**: ARIA labels and keyboard navigation

## 🎨 UI/UX Features

- **Modern Design**: Clean, card-based layout
- **Color-coded Stats**: Visual statistics dashboard
- **Interactive Elements**: Hover effects and animations
- **Form Enhancement**: Auto-suggestions and validation
- **Modal Confirmations**: Safe delete operations
- **Toast Notifications**: Success/error feedback
- **Keyboard Shortcuts**: Ctrl+N (new book), Ctrl+F (search)

## 🚨 Error Handling

The application includes comprehensive error handling:

- **Validation Errors**: Field-specific error messages
- **404 Errors**: Custom not found pages
- **500 Errors**: Server error handling
- **API Errors**: Proper HTTP status codes and JSON responses
- **Client Errors**: User-friendly error displays

## 🔒 Data Validation

### Server-side Validation
- Title: Required, non-empty
- Author: Required, non-empty  
- Genre: Required, non-empty
- Publication Year: Required, numeric, between 1000 and current year

### Client-side Validation
- HTML5 form validation
- Real-time feedback
- Custom validation messages
- Bootstrap validation styling

## 📝 API Documentation

Visit `http://localhost:3000/api` when the server is running to see full API documentation with examples.

### Response Format
All API responses follow this structure:
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": { ... },
  "count": 5
}
```

## 🛠️ Development

### Available Scripts
- `npm start` - Start the production server
- `npm run dev` - Start development server with auto-restart
- `npm test` - Run tests (placeholder)

### Adding New Features
1. Add business logic to `controllers/BookController.js`
2. Create routes in `routes/` directory
3. Add views in `views/` directory
4. Update styles in `public/css/style.css`
5. Add client-side logic to `public/js/main.js`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License - see the package.json file for details.

## 🎉 Getting Started Tips

1. **First Run**: Start the server and visit the home page to see sample books
2. **Add Your Books**: Use the "Add Book" button to add your own books
3. **Try the API**: Visit `/api` to see the API documentation
4. **Search & Sort**: Use the search bar and sort options to organize your collection
5. **Mobile Friendly**: Try the app on your phone or tablet

## 🔗 Useful URLs

- **Home Page**: http://localhost:3000
- **Add Book**: http://localhost:3000/books/add
- **API Docs**: http://localhost:3000/api
- **API Books**: http://localhost:3000/api/books
- **Statistics**: http://localhost:3000/api/stats

---

**Happy Reading!** 📚✨
