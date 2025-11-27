// data/users.js
const bcrypt = require('bcryptjs');

// Password harus di-hash sekali sebelum dimasukkan ke database/data store
// adminpass -> di-hash
const hashedPasswordAdmin = bcrypt.hashSync('adminpass', 10); 
// guestpass -> di-hash
const hashedPasswordGuest = bcrypt.hashSync('guestpass', 10); 

let users = [
    { id: 1, username: 'admin', password: hashedPasswordAdmin, role: 'admin' },
    { id: 2, username: 'guest', password: hashedPasswordGuest, role: 'guest' }
];

module.exports = { users };