const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default:null,
    },
    price: {
      type: String,
      required:true,
    },
    details: {
        type: String,
    },
    image: {
        type: String,
    },
  });

module.exports = mongoose.model("Product", productSchema);