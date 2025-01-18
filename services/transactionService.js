const db = require('../config/database');

const getAllTransactions = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM transactions', (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

const createTransaction = (transaction) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO transactions SET ?', transaction, (err, results) => {
            if (err) return reject(err);
            resolve({ id: results.insertId, ...transaction });
        });
    });
};

// Fungsi untuk mengambil transaksi berdasarkan ID
const getTransactionById = (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM transactions WHERE id = ?', [id], (err, results) => {
            if (err) return reject(err);
            if (results.length > 0) {
                resolve(results[0]); // Mengembalikan transaksi jika ditemukan
            } else {
                resolve(null); // Mengembalikan null jika tidak ditemukan
            }
        });
    });
};

module.exports = { getAllTransactions, createTransaction, getTransactionById };