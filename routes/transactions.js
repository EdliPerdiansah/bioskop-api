const express = require('express');
const router = express.Router();
const transactionService = require('../services/transactionService');

// GET (Mengambil Transaksi)
router.get('/', async (req, res) => {
    const transactions = await transactionService.getAllTransactions();
    res.json(transactions);
});

// POST (menambahkan transaksi)
router.post('/', async (req, res) => {
    const newTransaction = await transactionService.createTransaction(req.body);
    res.status(201).json(newTransaction);
});

module.exports = router;