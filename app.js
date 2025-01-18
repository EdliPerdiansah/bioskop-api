const express = require('express');
const bodyParser = require('body-parser');
const movieRoutes = require('./routes/movies');
const ticketRoutes = require('./routes/tickets');
const transactionRoutes = require('./routes/transactions');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api/movies', movieRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/transactions', transactionRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});