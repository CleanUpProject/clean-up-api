const express = require("express");
const cors = require("cors");
const db = require("./config"); // Import Firestore instance dari config.js

const app = express();
app.use(express.json());
app.use(cors());

const articlesRoute = require('./routes/articles');
app.use('/article', articlesRoute); // Gunakan route untuk article

// Middleware untuk menangani error
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.status || 500;
  const errorMessage = err.message || "An unexpected error occurred";
  res.status(statusCode).send({
    message: errorMessage,
    error: process.env.NODE_ENV === 'production' ? {} : err
  });
});

// Menjalankan server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
