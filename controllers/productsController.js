const { validationResult } = require("express-validator");
const Product = require("../models/Product");
const User = require("../models/User");

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({msg: error.message});
  }
};

exports.getProductById = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Produit introuvable" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({msg: error.message });
  }
};



exports.createProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const { title, description, price, imageUrl, categoryId } = req.body;
  try {
    const product = new Product({
      title,
      description,
      price,
      imageUrl,
      categoryId,
      userId: req.user.userId,
      isSold: false,
    });
    await product.save();
    const prodId = product._id
    const user = await User.findById(req.user.userId);
    user.cart.push(prodId);
    await user.save();

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Produit introuvable" });
    }
    if (product.userId.toString() !== req.user.userId.toString()) {
      return res.status(403).json({ message: "Vous n'avez pas le droit de supprimer ce produit" });
    }
    await Product.deleteOne({ _id: id });
    res.status(200).json({ message: "Produit supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.getProductsByUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    const products = await Product.find({ userId });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
