const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Connects to databases with MONGODB_URI in existence, otherwise ir will circuit to the local MongoDB server's DB
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/social-network',
  {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Mongo queries executed
mongoose.set('debug', true);

app.use(require('./routes'));

app.listen(PORT, () => console.log(`Connected on localhost:${PORT}`));
