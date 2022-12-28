const Category = require("../../models/Category");
const cloudinary = require("../../utils/cloudnary");

//CRUD for category
const createCategory = async (req, res) => {
  try {
    const image = await cloudinary.uploader.upload(req.file.path);
    const { title, description, mainTitleId } = req.body;

    if (!title || !description || !mainTitleId) {
      throw new Error("Please enter all value");
    }

    const postCategory = new Category({ ...req.body, image: image.url });
    await postCategory.save();

    return res
      .status(200)
      .send({ message: "Category Created successfully!!", postCategory });
  } catch (error) {
    return res.status(400).send(error.toString());
  }
};

const getAllCategory = async (req, res) => {
  try {
    const data = await Category.find().populate("mainTitleId");

    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send(error.toString());
  }
};

const getCategoryByID = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    return res.status(200).send(category);
  } catch (error) {
    return res.status(400).send(error.toString());
  }
};

const getCategoriesByMainTitleID = async (req, res) => {
  try {
    const category = await Category.find({
      mainTitleId: req.params.id
    }).populate("mainTitleId");

    return res.status(200).send(category);
  } catch (error) {
    return res.status(400).send(error.toString());
  }
};

const updatecategory = async (req, res) => {
  try {
    const image = await cloudinary.uploader.upload(req.file.path);

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      {
        $set: { ...req.body, image: image.url }
      },
      { new: true }
    );

    return res
      .status(200)
      .send({ message: "Category has been Updated", updatedCategory });
  } catch (err) {
    res.status(500).send(err);
  }
};

const deletecategory = async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);

    return res
      .status(200)
      .send({ message: "Category has been Deleted", deletedCategory });
  } catch (err) {
    res.status(500).send(err);
  }
};

const searchCategory = async (req, res) => {
  try {
    let data;

    if (req.body.title.length > 2)
      data = await Category.find({
        title: { $regex: req.body.title, $options: "i" }
      });

    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send(error.toString());
  }
};

module.exports = {
  getAllCategory,
  getCategoryByID,
  getCategoriesByMainTitleID,
  createCategory,
  updatecategory,
  deletecategory,
  searchCategory
};
