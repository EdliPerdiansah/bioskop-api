const db = require('../config/database');

const getAllTickets = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM tickets', (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

const createTicket = (ticket) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO tickets SET ?', ticket, (err, results) => {
            if (err) return reject(err);
            resolve({ id: results.insertId, ...ticket });
        });
    });
};

const updateTicket = (id, ticket) => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE tickets SET ? WHERE id = ?', [ticket, id], (err, results) => {
            if (err) return reject(err);
            resolve({ id, ...ticket });
        });
    });
};

const deleteTicket = (id) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM tickets WHERE id = ?', id, (err) => {
            if (err) return reject(err);
            resolve();
        });
    });
};

const getTicketById = (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM tickets WHERE id = ?', [id], (err, results) => {
            if (err) return reject(err);
            if (results.length > 0) {
                resolve(results[0]); // Mengembalikan tiket jika ditemukan
            } else {
                resolve(null); // Mengembalikan null jika tidak ditemukan
            }
        });
    });
};

module.exports = { getAllTickets, createTicket, updateTicket, deleteTicket, getTicketById };