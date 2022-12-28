const express = require("express");
const categoryController = require("../controller/category/category");
const subCategoryController = require("../controller/category/subCategory");
const MainTitleController = require("../controller/mainTitle");
const authController = require("../controller/authentication");
const auth = require("../middleware/Auth");
const upload = require("../utils/multer");

const Router = express.Router();
Router.use(express.json());

//Authentication endPoints
Router.post("/api/login", authController.userLogin);
Router.post("/api/signup", authController.userSignUp);
Router.put("/api/updateUser/:id", authController.updateUser);
Router.delete("/api/deleteUser/:id", authController.deleteUser);

//MainTitle endPoints
Router.post("/api/mainTitle", MainTitleController.createMainTitle);
Router.get("/api/getAllMainTitle", MainTitleController.getAllMainTitle);
Router.put("/api/updateMainTitle", MainTitleController.updateMainTitle);
Router.delete("/api/deleteMainTitle", MainTitleController.deleteMainTitle);

//Category endPoints
Router.post(
  "/api/category",
  upload.single("image"),
  categoryController.createCategory
);
Router.post("/api/search", categoryController.searchCategory);
Router.get("/api/getAllCategory", categoryController.getAllCategory);

Router.get("/api/getCategoryByID/:id", categoryController.getCategoryByID);
Router.put(
  "/api/updateCategory/:id",
  upload.single("image"),
  categoryController.updatecategory
);
Router.delete("/api/deleteCategory/:id", categoryController.deletecategory);
Router.get(
  "/api/getCategoriesByMainTitleID/:id",
  categoryController.getCategoriesByMainTitleID
);

//SubCategory endPoints
Router.post(
  "/api/subCategory",
  upload.single("image"),
  subCategoryController.createSubCategory
);
Router.get("/api/getAllSubCategory", subCategoryController.getAllSubCategory);
Router.get(
  "/api/getSubCategoryById/:id",
  subCategoryController.getSubCategoryByID
);
Router.put(
  "/api/updateSubCategory/:id",
  upload.single("image"),
  subCategoryController.updateSubCategory
);
Router.delete(
  "/api/deleteSubCategory/:id",
  subCategoryController.deleteSubCategory
);

Router.get(
  "/api/getSubCategoriesByCategoryID/:id",
  subCategoryController.getSubCategoriesByCategoryID
);

module.exports = Router;
