const User = require("../Model/userModel");
const bcrypt = require("bcrypt");

class userServices {
  // to create the user
  create = async (body) => {
    const hasedPassword = await this.encryptPassword(body.password);
    const newUser = new User({ ...body, password: hasedPassword });
    const result = await newUser.save();
    return result;
  };

  //   to find the user in the database
  findUser = async (userID) => {
    const allUser = await User.findOne({ id: userID });
    return allUser;
  };

  // to encrypt the password
  encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(password);
    const hasedPassword = await bcrypt.hash(password, salt);
    return hasedPassword;
  };

  //   to check the login state
  login = async (email, password) => {
    try {
      const user = await User.find({ email, password });
      if (!user) return null;
      return { isLoggedIn: true, ...user };
    } catch (err) {
      console.log(err);
    }
  };
}

module.exports = userServices;
