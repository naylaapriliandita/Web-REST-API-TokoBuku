// routes/bookRoutes.js
const express = require('express');
const router = express.Router();
// Import data dummy (gunakan 'let' agar bisa dimodifikasi)
let { books } = require('../data/books'); 
const { validateBookData } = require('../middleware/validation'); 

// === RUTE 1: GET /books (Read All) ===
router.get('/', (req, res) => {
    res.status(200).json(books);
});

// === RUTE 2: GET /books/:id (Read One by ID) ===
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find(b => b.id === id); 

    if (!book) {
        return res.status(404).json({ message: 'Error 404: Book not found' });
    }
    
    res.status(200).json(book);
});

// === RUTE 3: POST /books (Create - DENGAN VALIDASI) ===
// Pasang middleware validasi sebelum handler utama (Persyaratan)
router.post('/', validateBookData, (req, res) => {
    const { title, author } = req.body;
    
    // Tentukan ID baru
    const newId = books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1;
    
    const newBook = {
        id: newId,
        title,
        author,
        published_year: req.body.published_year // Opsional
    };

    books.push(newBook); 
    res.status(201).json(newBook); // Status 201 Created
});

// === RUTE 4: PUT /books/:id (Update) ===
// Gunakan juga middleware validasi di sini
router.put('/:id', validateBookData, (req, res) => {
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
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const initialLength = books.length;
    
    // Filter array
    books = books.filter(b => b.id !== id);

    if (books.length === initialLength) { // ID tidak ditemukan
        return res.status(404).json({ message: 'Error 404: Book not found' });
    }

    res.status(204).send(); // Status 204 No Content
});

module.exports = router;