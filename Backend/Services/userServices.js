const User = require("../Model/userModel");
const bcrypt = require("bcrypt");

class userService {
  // to create the users
  create = async (body) => {
    const hasedPassword = await this.encryptPassword(body.password);
    const newUser = new User({ ...body, password: hasedPassword });
    const result = await newUser.save();
    return result;
  };

  //    to find the users
  findUser = async (userID) => {
    const allUsers = await User.findOne({ id: userID });
  };

  //   to encrypt the password
  encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt();
    const hasedPassword = await bcrypt.hash(password, salt);
    return hasedPassword;
  };

  // to check the login state of
  login = async (email, password) => {
    try {
      // const encrypt = await this.encryptPassword(password);
      const user = await User.find({ email, password });
      if (!user) return null;
      return { isLoggedIn: true, ...user };
    } catch (err) {
      console.log(err);
    }
  };
}

module.exports = userService;
