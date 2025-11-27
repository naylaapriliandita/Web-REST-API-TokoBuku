// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Anggap Anda sudah membuat file data user ini
const { users } = require('../data/users'); 

// Secret Key untuk JWT (HARUS dirahasiakan, ganti 'YOUR_SECRET_KEY' dengan nilai unik)
const JWT_SECRET = 'KUNCI_RAHASIA_TOKO_BUKU';

// Endpoint Login
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // 1. Cari Pengguna
    const user = users.find(u => u.username === username);

    if (!user) {
        return res.status(400).json({ message: 'Username atau Password salah.' });
    }

    // 2. Bandingkan Password (Decrypt Hash)
    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Username atau Password salah.' });
    }

    // 3. Buat Token JWT
    // Payload hanya berisi ID dan Role (penting untuk otorisasi)
    const token = jwt.sign(
        { id: user.id, role: user.role },
        JWT_SECRET,
        { expiresIn: '1h' } // Token akan kadaluarsa dalam 1 jam
    );

    // 4. Kirim Token sebagai Respons
    res.json({ 
        message: 'Login berhasil!', 
        token: token,
        role: user.role
    });
});

module.exports = router;