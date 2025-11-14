// app.js
const express = require('express');
const app = express();
const PORT = 3000;

// Import Middleware & Router
const logger = require('./middleware/logger'); 
const bookRoutes = require('./routes/bookRoutes'); 

// [1] Pasang Middleware JSON Parser
app.use(express.json());

// [2] Pasang Middleware Logging (Persyaratan)
app.use(logger); 

// Rute dasar (opsional)
app.get('/', (req, res) => {
    res.send('Welcome to the Book Store REST API');
});

// [3] Hubungkan router buku ke endpoint utama /books
app.use('/books', bookRoutes); 

// [4] Sajikan folder 'images' secara statis (Persyaratan Opsional)
app.use('/images', express.static('images'));

// [5] GLOBAL ERROR HANDLER (4 Argumen: err, req, res, next) -> Persyaratan Status 500
app.use((err, req, res, next) => {
    console.error(err.stack); // Catat error ke konsol server
    
    // Kirim respons JSON dengan Status 500 (Internal Server Error)
    res.status(500).json({
        error: "Internal Server Error"
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});