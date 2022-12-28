const User = require("../../models/User");

//Login user
const userLogin = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
      return res.status(404).send({ error: "please enter email or password" });
    }

    const user = await User.findByCredentials(email, password);

    if (!user) throw new Error("unauthorized user");

    const token = await User.genrateAuthToken(user);

    return res.status(200).send({ user, token });
  } catch (error) {
    return res.status(400).send(error.toString());
  }
};

//SignUp user
const userSignUp = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
      return res
        .status(404)
        .send({ message: "please enter email or password" });
    }

    const isMatch = await User.findOne({ email: email });

    if (isMatch) return res.status().send({ error: "User Already register" });

    const user = new User(req.body);

    await user.save();

    return res.status(200).send({ message: "User register" });
  } catch (error) {
    return res.status(400).send(error.toString());
  }
};

//Update user by id
const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body
      },
      { new: true }
    );

    return res
      .status(200)
      .send({ message: "User has been Updated", updatedUser });
  } catch (err) {
    res.status(500).send(err);
  }
};

//Delete user by id
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    return res
      .status(200)
      .send({ message: "User has been Deleted", deletedUser });
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  userLogin,
  userSignUp,
  updateUser,
  deleteUser
};
