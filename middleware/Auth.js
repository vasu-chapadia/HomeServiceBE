const UserModel = require("../models/User");
const jwt = require("jsonwebtoken");

//Checked user is Login or not
const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await UserModel.findOne({
      _id: decode._id,
      email: decode.email
    });

    if (!user) throw new Error();

    req.user = user;

    next();
  } catch (error) {
    res.status(401).send({ error: "Please Authenticate." });
  }
};

module.exports = auth;
