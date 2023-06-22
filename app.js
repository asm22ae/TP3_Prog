"use strict";

// Importation des modules requis
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();

// Configuration des en-têtes pour autoriser les requêtes
app.use((req, res, next) => {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
   );
   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
   next();
  });

// Importation des contrôleurs et des routes  
const errorController = require('./controllers/errorController');

const usersRoutes = require('./routes/usersRoutes');
const productsRoutes = require('./routes/productsRoutes');
const categoriesRoutes = require('./routes/categoriesRoutes');
const cartRoutes = require('./routes/cartRoutes');
const authRoutes = require('./routes/authRoutes');
const searchRoutes = require('./routes/searchRoutes');

// Utilisation des middlewares
app.use(express.json()); 
app.use(express.urlencoded({
  extended: false
}));
app.use(usersRoutes);
app.use(productsRoutes);
app.use(categoriesRoutes);
app.use(cartRoutes);
app.use(authRoutes);
app.use(searchRoutes);

app.use(errorController.logErrors);
app.use(errorController.get404);

// Connexion à la base de données et démarrage du serveur
mongoose.connect(process.env.DB_URL)
  .then(() => {
    console.log('La connexion à la base de données est établie')
    app.listen(process.env.PORT, () => {
      console.log(`Le serveur écoute sur le port ${process.env.PORT}`);
    });
  })
  .catch(err => {
    console.log('La connexion à la base de données a échoué', err);
  })
 