const express = require('express');
const router = express.Router();
const movieService = require('../services/movieService');

// GET (menampilkan semua movie)
router.get('/', async (req, res) => {
    const movies = await movieService.getAllMovies();
    res.json(movies);
});

// GET (menampilkan movie berdasarkan ID)
router.get('/:id', async (req, res) => {
    try {
        const movieId = req.params.id; // Mengambil ID dari parameter URL
        const movie = await movieService.getMovieById(movieId); // Memanggil service untuk mendapatkan film
        if (movie) {
            res.status(200).json(movie); // Mengembalikan film jika ditemukan
        } else {
            res.status(404).json({ message: 'Film tidak ditemukan' }); // Mengembalikan pesan jika tidak ditemukan
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving movie', error: error.message });
    }
});

// POST (menambahkan tiket baru)
router.post('/', async (req, res) => {
    const newMovie = await movieService.createMovie(req.body);
    res.status(201).json(newMovie);
});

module.exports = router;