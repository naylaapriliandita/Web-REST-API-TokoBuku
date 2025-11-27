// middleware/auth.js
const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    // 1. Ambil token dari header (biasanya: Authorization: Bearer <token>)
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Akses ditolak. Token tidak ditemukan.' });
    }

    try {
        // 2. Verifikasi token menggunakan secret key Anda
        const decoded = jwt.verify(token, 'KUNCI_RAHASIA_TOKO_BUKU'); 
        
        // 3. Simpan data user (id & role) ke objek request
        req.user = decoded; 
        
        next();
    } catch (ex) {
        res.status(400).json({ message: 'Token tidak valid.' });
    }
};

module.exports = authenticate;