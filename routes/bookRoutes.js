const express = require('express');
const router = express.Router();
// Modifikasi array books, import data books (let)
let { books } = require('../data/books'); 
const { validateBookData } = require('../middleware/validation'); 

// === RUTE 1: GET /books (Read All) ===
router.get('/', (req, res) => {
    // Mengirim semua koleksi buku
    res.status(200).json(books);
});

// === RUTE 2: GET /books/:id (Read One by ID) ===
router.get('/:id', (req, res) => {
    // Mengambil ID dari URL parameter dan mengkonversinya ke integer
    const id = parseInt(req.params.id);
    const book = books.find(b => b.id === id); // Mencari buku berdasarkan ID

    if (!book) {
        return res.status(404).json({ message: 'Error 404: Book not found' });
    }
    
    res.status(200).json(book);
});

// === RUTE 3: POST /books (Create - DENGAN VALIDASI) ===
// Middleware validasi sebelum handler utama
router.post('/', validateBookData, (req, res) => {
    const { title, author } = req.body;
    
    // Tentukan ID baru (misalnya, ID terbesar + 1). Gunakan ID 1 jika array kosong.
    const newId = books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1;
    
    const newBook = {
        id: newId,
        title,
        author,
        // Field tambahan opsional
        published_year: req.body.published_year 
    };

    books.push(newBook); // Tambahkan buku baru ke array
    res.status(201).json(newBook); // Status 201 Created
});

// === RUTE 4: PUT /books/:id (Update) ===
// Kita gunakan juga middleware validasi untuk memastikan data update lengkap
router.put('/:id', validateBookData, (req, res) => {
    const id = parseInt(req.params.id);
    const bookIndex = books.findIndex(b => b.id === id); // Cari index buku

    if (bookIndex === -1) {
        return res.status(404).json({ message: 'Error 404: Book not found' });
    }

    // Perbarui data
    const updatedBook = {
        ...books[bookIndex], // Salin properti lama
        title: req.body.title,
        author: req.body.author,
        published_year: req.body.published_year || books[bookIndex].published_year
    };

    books[bookIndex] = updatedBook; // Ganti buku lama dengan yang diperbarui
    res.status(200).json(updatedBook);
});

// === RUTE 5: DELETE /books/:id (Delete) ===
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const initialLength = books.length;
    
    // Filter array: membuat array baru tanpa buku yang memiliki ID yang dihapus
    books = books.filter(b => b.id !== id);

    if (books.length === initialLength) { // Jika panjang array tidak berubah, ID tidak ditemukan
        return res.status(404).json({ message: 'Error 404: Book not found' });
    }

    // Status 204 No Content, menandakan penghapusan sukses
    res.status(204).send(); 
});

module.exports = router;