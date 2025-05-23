const path = require('path');
const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;
const postRoutes = require('./routes/postRoutes')
const userRoutes = require('./routes/userRoutes')
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

// Serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'client', 'build', 'index.html')
    )
  );
} else {
  app.get('/', (req, res) => res.send(`Server started on port http://localhost:${port}`));
}

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port http://localhost:${port}`));