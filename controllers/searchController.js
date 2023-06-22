// Importer les modules nécessaires
const { validationResult } = require("express-validator");
const Product = require("../models/Product");

// Rechercher des produits par leur titre
exports.searchProducts = async (req, res) => {
// Vérifier si les données envoyées par la requête sont valides
  const errors = validationResult(req);
// Si il y a des erreurs, renvoyer un statut 422 avec les erreurs
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
// Récupérer le critère de recherche dans la requête
  const q = req.query.q;
// Si le critère de recherche est vide, renvoyer une erreur 400
  if(!q){
    return res.status(400).json({message:"entrer un bon critère de recherche"})
  }
// Trouver les produits dont le titre contient le critère de recherche 
  try {
    const products = await Product.find({ title: { $regex: q, $options: "i" } });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
