const express = require('express');
const bodyParser = require('body-parser');
const movieRoutes = require('./routes/movies');
const ticketRoutes = require('./routes/tickets');
const transactionRoutes = require('./routes/transactions');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api/movies', movieRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/transactions', transactionRoutes);

// Rute untuk login
app.post('/login', (req, res) => {
    const { username, password } = req.body; // Ambil username dan password dari body

    // Lakukan verifikasi kredensial (ini hanya contoh, Anda harus menggunakan database)
    if (username === 'admin' && password === 'password') { // Ganti dengan logika autentikasi yang sesuai
        const user = { username }; // Buat objek pengguna
        const token = jwt.sign(user, process.env.SECRET_KEY, { expiresIn: '1h' }); // Buat token
        return res.json({ token }); // Kirim token ke klien
    }

    res.status(401).json({ message: 'Kredensial tidak valid' }); // Jika kredensial tidak valid
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
