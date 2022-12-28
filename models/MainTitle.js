const mongoose = require("mongoose");

const MainTitleSchema = mongoose.Schema(
  {
    title: { type: String, trim: true } // Home Services // Application // Salon
  },
  {
    timestamps: true
  }
);

const MainTitle = mongoose.model("MainTitle", MainTitleSchema);

module.exports = MainTitle;
