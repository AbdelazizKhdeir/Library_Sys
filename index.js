require('dotenv').config();
const express = require('express');
const app = express();
const authorRoutes = require('./routes/authors');
const bookshopRoutes = require('./routes/bookshops');
const bookRoutes = require('./routes/books');

app.use(express.json());
app.use('/authors', authorRoutes);
app.use('/bookshops', bookshopRoutes);
app.use('/books', bookRoutes);

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on http://localhost:${process.env.PORT}`);
});
