const express = require('express');
const router = express.Router();

// Sample data
const produits = [
  { id: 1, nom: 'Stylo', prix: 1.5 },
  { id: 2, nom: 'Cahier', prix: 3.0 },
  { id: 3, nom: 'Regle', prix: 2.0 },
];

// GET all products
router.get('/', (req, res) => {
  res.json(produits);
});

// GET product by ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const produit = produits.find(p => p.id === id);
  if (!produit) {
    return res.status(404).json({ erreur: 'Produit non trouve' });
  }
  res.json(produit);
});

// POST a new product
router.post('/', (req, res) => {
  const { nom, prix } = req.body;
  if (!nom || prix === undefined) {
    return res.status(400).json({ erreur: 'Nom et prix requis' });
  }
  const nouveauProduit = { id: produits.length + 1, nom, prix };
  produits.push(nouveauProduit);
  res.status(201).json(nouveauProduit);
});

module.exports = router;