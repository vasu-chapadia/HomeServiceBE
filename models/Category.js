const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    title: { type: String, trim: true }, // Home Painting, Home Cleaning
    description: { type: String },
    image: { type: String },
    mainTitleId: [
      {
        type: mongoose.Types.ObjectId,
        ref: "MainTitle",
        trim: true,
        index: true
      }
    ] // HomeServies Id
  },
  {
    timestamps: true
  }
);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;

// const mongoose = require("mongoose");

// const categorySchema = mongoose.Schema(
//   {
//     title: { type: String, trim: true }, // Home Services
//     // category: { type: String, trim: true, unique: true },
//     category: [
//       {
//         subtitle: { type: String }, // Painting,cleaning
//       },
//     ],
//     description: { type: String },
//     image: { type: String },
//   },
//   {
//     timestamps: true,
//   }
// );

// const Category = mongoose.model("Category", categorySchema);

// module.exports = Category;
