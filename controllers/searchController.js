const { validationResult } = require("express-validator");
const Product = require("../models/Product");

exports.searchProducts = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const q = req.query.q;
  if(!q){
    return res.status(400).json({message:"entrer un bon critère de recherche"})
  }
  try {
    const products = await Product.find({ title: { $regex: q, $options: "i" } });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
