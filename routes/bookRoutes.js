// routes/bookRoutes.js
const express = require('express');
const router = express.Router();
let { books } = require('../data/books'); 
const { validateBookData } = require('../middleware/validation'); 
const authenticate = require('../middleware/auth');
const authorize = require('../middleware/role'); // Import role middleware

// A. Autentikasi: WAJIB TOKEN untuk SEMUA RUTE
router.use(authenticate); // Setiap request ke /books harus memiliki token JWT valid

// B. RUTE YANG TIDAK MEMERLUKAN ROLE SPESIFIK (Guest/Admin boleh)

// === RUTE 1: GET /books (Read All) ===
router.get('/', (req, res) => {
    // Pengguna terautentikasi (guest atau admin) dapat mengakses
    res.status(200).json(books);
});

// === RUTE 2: GET /books/:id (Read One by ID) ===
router.get('/:id', (req, res) => {
    // Pengguna terautentikasi dapat mengakses
    const id = parseInt(req.params.id);
    const book = books.find(b => b.id === id); 

    if (!book) {
        return res.status(404).json({ message: 'Error 404: Book not found' });
    }
    
    res.status(200).json(book);
});

// C. RUTE YANG MEMERLUKAN OTORISASI ROLE 'admin'

// === RUTE 3: POST /books (Create - DENGAN VALIDASI) ===
router.post('/', authorize('admin'), validateBookData, (req, res) => { // <-- OTORISASI DITAMBAH
    // Logic Create
    const { title, author } = req.body;
    const newId = books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1;
    
    const newBook = {
        id: newId,
        title,
        author,
        published_year: req.body.published_year
    };

    books.push(newBook); 
    res.status(201).json(newBook);
});

// === RUTE 4: PUT /books/:id (Update) ===
router.put('/:id', authorize('admin'), validateBookData, (req, res) => { // <-- OTORISASI DITAMBAH
    // Logic Update
    const id = parseInt(req.params.id);
    const bookIndex = books.findIndex(b => b.id === id); 

    if (bookIndex === -1) {
        return res.status(404).json({ message: 'Error 404: Book not found' });
    }

    const updatedBook = {
        ...books[bookIndex], 
        title: req.body.title,
        author: req.body.author,
        published_year: req.body.published_year || books[bookIndex].published_year
    };

    books[bookIndex] = updatedBook; 
    res.status(200).json(updatedBook);
});

// === RUTE 5: DELETE /books/:id (Delete) ===
router.delete('/:id', authorize('admin'), (req, res) => { // <-- OTORISASI DITAMBAH
    // Logic Delete
    const id = parseInt(req.params.id);
    const initialLength = books.length;
    
    books = books.filter(b => b.id !== id);

    if (books.length === initialLength) {
        return res.status(404).json({ message: 'Error 404: Book not found' });
    }

    res.status(204).send();
});

module.exports = router;