// app.js
const express = require('express');
const app = express();
const PORT = 3000;

// --- Middleware to parse JSON bodies ---
app.use(express.json());

// --- Logging middleware (runs for every request) ---
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// --- Serve static files from 'public' folder ---
app.use(express.static('public'));

// --- Homepage route (optional) ---
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html'); // serves index.html
});

// --- Import routers ---
const produitsRouter = require('./routes/products.routes');

// --- Use routers ---
app.use('/api/produits', produitsRouter);

// --- Simple authentication middleware ---
const verifierToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (token !== 'secret123') {
    return res.status(401).json({ erreur: 'Non autorise' });
  }
  next();
};

// --- Protected admin route ---
app.get('/api/admin', verifierToken, (req, res) => {
  res.json({ message: "Acces accorde a l'admin" });
});

// --- Start the server ---
app.listen(PORT, () => {
  console.log(`Serveur demarre sur http://localhost:${PORT}`);
});