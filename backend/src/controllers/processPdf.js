const googleVision = require("../config/googleVision");
const Product = require("../models/Product");

const processPdf = async (req, res) => {
  const file = req.file;
  const authHeader = req.headers.authorization;

  if (!file) {
    return res.status(400).json({
      success: false,
      message: "No file uploaded."
    });
  }

  try {
    const response = await googleVision({
      filePath: file.path
    });

    if (!response.error) {
      const productNamesFromApi = response.data;

      const allProducts = await Product.find(
        {},
        "name sku _id price priceSale images"
      ).lean();

      console.log("pdocuts : ", allProducts);

      const availableProducts = allProducts.filter((product) =>
        productNamesFromApi.includes(product.name)
      );
      const unavailableProducts = productNamesFromApi.filter(
        (name) => !allProducts.some((product) => product.name === name)
      );

      const cartItems = availableProducts.map((product) => ({
        pid: product._id,
        sku: product.sku,
        quantity: 1,
        price: product.priceSale || product.price,
        subtotal: (product.priceSale || product.price) * 1
      }));

      if (cartItems.length > 0) {
        const cartResponses = await Promise.all(
          cartItems.map(
            (item) =>
              new Promise(async (resolve, reject) => {
                try {
                  const response = await fetch(
                    "http://localhost:4000/api/cart/add",
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: authHeader
                      },
                      body: JSON.stringify(item)
                    }
                  );

                  if (!response.ok) {
                    throw new Error(
                      `Failed to add product to cart: ${response.status}`
                    );
                  }

                  resolve({ ok: true, data: await response.json() });
                } catch (error) {
                  reject({ ok: false, error });
                }
              })
          )
        );

        const cartLength = cartResponses.length;

        const failedResponses = cartResponses.filter(
          (response) => !response.ok
        );

        if (failedResponses.length > 0) {
          throw new Error("Failed to add products to the cart.");
        }

        return res.status(200).json({
          success: true,
          availableProducts: availableProducts.map((product) => product.name),
          unavailableProducts,
          updatedCart: cartResponses[cartLength - 1].data
        });
      }
    } else {
      throw new Error(response.error);
    }
  } catch (error) {
    console.error("Error processing PDF:", error);

    return res.status(500).json({
      success: false,
      message: "Error processing PDF."
    });
  }
};

module.exports = processPdf;
