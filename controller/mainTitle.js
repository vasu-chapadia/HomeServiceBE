const MainTitle = require("../models/MainTitle");

//CRUD for mainTitle
const createMainTitle = async (req, res) => {
  try {
    const postMainTitle = new MainTitle(req.body);
    await postMainTitle.save();

    return res
      .status(200)
      .send({ message: "MainTitle Created successfully!!", postMainTitle });
  } catch (error) {
    return res.status(400).send(error.toString());
  }
};

const getAllMainTitle = async (req, res) => {
  try {
    const data = await MainTitle.find();

    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send(error.toString());
  }
};

const getMainTitleByID = async (req, res) => {
  try {
    const category = await MainTitle.findById(req.params.id);

    return res.status(200).send(category);
  } catch (error) {
    return res.status(400).send(error.toString());
  }
};

const updateMainTitle = async (req, res) => {
  try {
    const updatedCategory = await MainTitle.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body
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

const deleteMainTitle = async (req, res) => {
  try {
    const deletedCategory = await MainTitle.findByIdAndDelete(req.params.id);

    return res
      .status(200)
      .send({ message: "Category has been Deleted", deletedCategory });
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  createMainTitle,
  getAllMainTitle,
  getMainTitleByID,
  updateMainTitle,
  deleteMainTitle
};
