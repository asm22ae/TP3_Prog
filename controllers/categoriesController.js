const { validationResult } = require("express-validator");
const Category = require("../models/Category");

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.getCategoryById = async (req, res) => {
  const id = req.params.id;
  try {
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Catégorie introuvable" });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  const id = req.params.id;
  try {
    let category = await Category.findById(id)
if (!category) {
    return res.status(404).json({ message: "Catégorie introuvable" });
}
const updateData = {}
const name = req.body.name;
if (name) {
  updateData.name = name;
  
}
category = await Category.findByIdAndUpdate(id,updateData,{new:true});
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.createCategory = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const name = req.body.name;
  try {
    const category = new Category({
      name,
    });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  const id = req.params.id;
  try {
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Catégorie introuvable" });
    }
    await Category.deleteOne({ _id: id });
    res.status(200).json({ message: "Catégorie supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
