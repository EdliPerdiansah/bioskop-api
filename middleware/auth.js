const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY || 'mySuperhero1'; // Ganti dengan kunci rahasia Anda

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
    if (!token) return res.sendStatus(401); // Tidak terautentikasi

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403); // Terlarang
        req.user = user; // Simpan informasi pengguna di request
        next(); // Lanjutkan ke middleware berikutnya
    });
};

module.exports = authenticateToken;