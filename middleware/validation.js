// middleware/validation.js
const validateBookData = (req, res, next) => {
    const { title, author } = req.body;

    // Cek keberadaan title DAN author (Persyaratan)
    if (!title || !author) {
        // Kirim respons 400 (Bad Request)
        return res.status(400).json({
            message: 'Error: Request body must contain both title and author fields.'
        });
    }
    
    next();
};

module.exports = { validateBookData };