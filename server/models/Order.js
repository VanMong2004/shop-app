const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        name: String,
        image: String,
        price: Number,
        quantity: Number,
      },
    ],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "paid", "shipping", "done", "cancelled"],
      default: "pending",
    },
    paymentMethod: { type: String, default: "cod" },
    shippingAddress: {
      fullName: String,
      phone: String,
      address: String,
      city: String,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Order", orderSchema);
