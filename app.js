const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Sauces = require('./models/Sauce.js');
const userRoutes = require('./routes/user');
const saucesRoutes = require('./routes/sauces');
const path = require('path');

const app = express();


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.use(bodyParser.json());

  app.use('/api/sauces', saucesRoutes);

  app.use('/api/auth', userRoutes);
  
  app.use('/images', express.static(path.join(__dirname, 'images')));

  mongoose.connect('mongodb+srv://test:QkJ2PoOKCQYRIHO9@clusteroc.pao2p.mongodb.net/AnthonyLarmier?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

module.exports = app;