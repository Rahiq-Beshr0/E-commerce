const Product = require("../models/product");

exports.createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const image = req.file?.path;
  const product = await Product.create({ name, quantity, image });
  res.status(201).json(product);
};

exports.getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

exports.updateProduct = async (req, res) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
};
