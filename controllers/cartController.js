const { validationResult } = require("express-validator");
const User = require("../models/User");
const Product = require("../models/Product");

exports.getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }
    const cart = user.cart;
    res.status(200).json(cart);
  } catch (error) {
       res.status(500).json({ msg: error.message });
    
  }
};

exports.addProductToCart = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const productId = req.body.productId;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Produit introuvable" });
    }
    if (product.isSold) {
      return res.status(403).json({ message: "Ce produit n'est plus disponible" });
    }
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }
    user.cart.push(productId);
    await user.save();
    await Product.updateOne({ _id: productId }, { isSold: true });
    res.status(200).json({ message: "Produit ajouté au panier avec succès" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.removeProductFromCart = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Produit introuvable" });
    }
    if (!product.isSold) {
      return res.status(403).json({ message: "Ce produit n'est pas dans votre panier" });
    }
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }
    user.cart.pull(productId);
    await user.save();
    await Product.updateOne({ _id: productId }, { isSold: false });
    res.status(200).json({ message: "Produit retiré du panier avec succès" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
