const express = require('express');
const router = express.Router();
const ticketService = require('../services/ticketService');

// GET (Menampilkan Semua Tiket)
router.get('/', async (req, res) => {
    const tickets = await ticketService.getAllTickets();
    res.json(tickets);
});

// GET (menampilkan tiket berdasarkan ID)
router.get('/:id', async (req, res) => {
    try {
        const ticketId = req.params.id; // Mengambil ID dari parameter URL
        const ticket = await ticketService.getTicketById(ticketId); // Memanggil service untuk mendapatkan tiket
        if (ticket) {
            res.status(200).json(ticket); // Mengembalikan tiket jika ditemukan
        } else {
            res.status(404).json({ message: 'Tiket tidak ditemukan' }); // Mengembalikan pesan jika tidak ditemukan
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving ticket', error: error.message });
    }
});

// POST (Menambahkan Tiket Baru)
router.post('/', async (req, res) => {
    const newTicket = await ticketService.createTicket(req.body);
    res.status(201).json(newTicket);
});

// PUT (Memperbarui tiket berdasarkan ID)
router.put('/:id', async (req, res) => {
    const updatedTicket = await ticketService.updateTicket(req.params.id, req.body);
    res.json(updatedTicket);
});

// DELETE (menghapus tiket)
router.delete('/:id', async (req, res) => {
    await ticketService.deleteTicket(req.params.id);
    res.status(204).send();
});

module.exports = router;