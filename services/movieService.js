const db = require('../config/database');
const { getTicketById } = require('./ticketService');

const getAllMovies = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM movies', (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

const createMovie = (movie) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO movies SET ?', movie, (err, results) => {
            if (err) return reject(err);
            resolve({ id: results.insertId, ...movie });
        });
    });
};

const getMovieById = (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM movies WHERE id = ?', [id], (err, results) => {
            if (err) return reject(err);
            if (results.length > 0) {
                resolve(results[0]); // Mengembalikan film jika ditemukan
            } else {
                resolve(null); // Mengembalikan null jika tidak ditemukan
            }
        });
    });
};

module.exports = { getAllMovies, createMovie, getMovieById };