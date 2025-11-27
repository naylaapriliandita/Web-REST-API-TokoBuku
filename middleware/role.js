// middleware/role.js

const authorize = (requiredRole) => {
    return (req, res, next) => {
        // req.user sudah diisi oleh middleware 'authenticate'
        if (!req.user || req.user.role !== requiredRole) {
            return res.status(403).json({ message: 'Akses ditolak. Peran tidak diizinkan.' });
        }
        next();
    };
};

module.exports = authorize;