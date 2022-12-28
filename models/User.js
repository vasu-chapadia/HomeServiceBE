const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema(
  {
    username: { type: String },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email Id is Not Valid");
        }
      }
    },
    password: {
      type: String,
      required: true,
      trim: true
    },
    isAdmin: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

// Genrate Login token
userSchema.statics.genrateAuthToken = async function (user) {
  const token = await jwt.sign(
    { _id: user._id.toString(), email: user.email },
    process.env.JWT_SECRET_KEY
  );

  return token;
};

// Find Credentials for login
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) throw new Error("Login unable");

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) throw new Error("User Password Wrong");

  return user;
};

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;

  return userObject;
};
const User = mongoose.model("User", userSchema);

module.exports = User;
