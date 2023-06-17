const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    maxlength: 50,
    required: true,
  },
  description: {
    type: String,
    maxlength: 255,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imageUrl: [
    {
      type: String,
      maxlength: 255,
      required: true,
    },
  ],
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  isSold: {
    type: Boolean,
    default: false,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
