const Cart = require("../models/Cart");

exports.getMyCart = async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.id }).populate("products.productId");
  res.json(cart || { products: [] });
};

exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  let cart = await Cart.findOne({ userId: req.user.id });
  if (!cart) cart = await Cart.create({ userId: req.user.id, products: [] });
  const index = cart.products.findIndex((p) => p.productId.toString() === productId);
  if (index > -1) {
    cart.products[index].quantity += quantity;
  } else {
    cart.products.push({ productId, quantity });
  }
  await cart.save();
  res.json(cart);
};

exports.updateCart = async (req, res) => {
  const cart = await Cart.findOneAndUpdate({ userId: req.user.id }, req.body, { new: true });
  res.json(cart);
};

exports.clearCart = async (req, res) => {
  await Cart.findOneAndDelete({ userId: req.user.id });
  res.json({ message: "Cart cleared" });
};
