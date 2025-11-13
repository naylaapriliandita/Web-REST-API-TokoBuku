const express = require('express');
const app = express();
const PORT = 3000;

const logger = require('./middleware/logger'); 

const bookRoutes = require('./routes/bookRoutes'); // <--- Import Router


// [1] Pasang Middleware JSON Parser
app.use(express.json());

// [2] Pasang Middleware Logging
app.use(logger); 

// Rute dasar untuk cek server
app.get('/', (req, res) => {
    res.send('Welcome to the Book Store REST API');
});

// [3] Hubungkan router buku ke endpoint utama /books
app.use('/books', bookRoutes); // <--- PASANG ROUTER
// --- END BARIS BARU ---

// [4] GLOBAL ERROR HANDLER (Persyaratan Status 500)
// Ini harus memiliki 4 argumen: (err, req, res, next)
app.use((err, req, res, next) => {
    console.error(err.stack); // Cetak detail error ke console server
    
    // Mengirim respons JSON dengan Status 500
    res.status(500).json({
        error: "Internal Server Error"
    });
});

// Server akan mendengarkan di port yang ditentukan
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});