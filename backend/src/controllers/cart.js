const { getUser } = require("../config/getUser");
const Products = require("../models/Product");
const Users = require("../models/User");

const getCart = async (request, response) => {
  try {
    const user = await getUser(request, response);
    const { products } = await request.body;

    // if (!products.length) {
    //   await Users.updateOne({ _id: user._id }, { $set: { cart: [] } });

    //   return response.status(404).json({
    //     success: false,
    //     message: "Cart Updated Succesfully !"
    //   });
    // }

    const productIds = products.map((item) => item.pid);
    const productDetailsMap = await Products.find({
      _id: { $in: productIds }
    })
      .select([
        "cover",
        "name",
        "brand",
        "slug",
        "available",
        "price",
        "priceSale"
      ])
      .then((products) =>
        products.reduce((acc, product) => {
          acc[product._id.toString()] = product;
          return acc;
        }, {})
      );

    const cartItems = [];
    for (const item of products) {
      const product = productDetailsMap[item.pid];

      if (!product) {
        return response.status(404).json({
          success: false,
          message: `Product with ID ${item.pid} not found`
        });
      }

      const { quantity, color, size, sku } = item;
      if (product.available < quantity) {
        return response.status(400).json({
          success: false,
          message: `Product ${product.name} is out of stock`
        });
      }

      const subtotal = (product.priceSale || product.price) * quantity;

      cartItems.push({
        ...product.toObject(),
        pid: item.pid,
        quantity,
        size,
        color,
        sku,
        subtotal: subtotal.toFixed(2)
      });
    }

    const updateResult = await Users.updateOne(
      { _id: user._id },
      { $set: { cart: cartItems } }
    );

    if (updateResult.modifiedCount === 0) {
      return response.status(500).json({
        success: false,
        message: "Failed to update the cart"
      });
    }

    return response.status(200).json({
      success: true,
      data: cartItems
    });
  } catch (error) {
    return response.status(400).json({
      success: false,
      message: error.message
    });
  }
};

const addToCart = async (req, res) => {
  try {
    const user = await getUser(req, res);
    const userId = user._id.toString();
    var cart = user.cart || [];
    const { pid, quantity, size, color, sku, image } = req.body;

    console.log("req.body : ", req.body);

    const product = await Products.findById(pid).select([
      "name",
      "price",
      "priceSale",
      "available",
      "images"
    ]);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product Not Found" });
    }

    if (product.available < quantity) {
      return res
        .status(400)
        .json({ success: false, message: "Insufficient Stock" });
    }

    const isExistingItem = cart.some((item) => item.pid.toString() === pid);

    if (isExistingItem) {
      // Update existing cart item
      cart = cart.map((item) =>
        item.pid.toString() === pid
          ? {
              ...item,
              quantity: item.quantity + quantity,
              subtotal: (
                (item.quantity + quantity) *
                (product.priceSale || product.price)
              ).toFixed(2)
            }
          : item
      );

      await Users.findByIdAndUpdate(userId, { cart }, { new: true })
        .then((response) => {
          console.log("Updated user cart:", response);

          return res.status(201).json({
            success: true,
            message: "Item added to cart successfully",
            data: response.cart
          });
        })
        .catch((err) => {
          throw new Error(err);
        });
    } else {
      const newCartItem = {
        pid,
        name: product.name,
        price: product.priceSale || product.price,
        quantity,
        size,
        color,
        sku,
        image: image || product.images[0]?.url || "",
        subtotal: ((product.priceSale || product.price) * quantity).toFixed(2)
      };

      await Users.findByIdAndUpdate(
        userId,
        { $push: { cart: newCartItem } },
        { new: true }
      )
        .then((response) => {
          console.log("Updated user cart:", response);

          return res.status(201).json({
            success: true,
            message: "Item added to cart successfully",
            data: response.cart
          });
        })
        .catch((err) => {
          throw new Error(err);
        });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const user = await getUser(req, res);
    const userId = user._id.toString();
    const cart = user.cart || [];
    const { pid, quantity } = req.body;

    const existingCartItem = cart.find((item) => item.pid.toString() === pid);

    if (!existingCartItem) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found in cart" });
    }

    if (quantity >= existingCartItem.quantity) {
      // Remove item if quantity is zero or less
      const updatedCart = cart.filter((item) => item.pid.toString() !== pid);

      await Users.findByIdAndUpdate(
        userId,
        { cart: updatedCart },
        { new: true }
      );

      return res.status(200).json({
        success: true,
        message: "Item removed from cart",
        data: updatedCart
      });
    } else {
      // Reduce the quantity
      existingCartItem.quantity -= quantity;
      existingCartItem.subtotal = (
        existingCartItem.quantity * existingCartItem.price
      ).toFixed(2);

      await Users.findByIdAndUpdate(userId, { cart }, { new: true });

      return res.status(200).json({
        success: true,
        message: "Item quantity updated",
        data: cart
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getCart, addToCart, removeFromCart };
