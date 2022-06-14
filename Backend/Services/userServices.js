const User = require("../Model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

  // find user using the email
  // findUserByEmail = async (email) => {
  //   const user = await User.findOne({ email });
  //   return user;
  // };

  //   to encrypt the password
  encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt();
    const hasedPassword = await bcrypt.hash(password, salt);
    return hasedPassword;
  };

  // verfiying the credentials
  verifyCredentials = async (email, password) => {
    try {
      const user = await User.findOne({ email });
      const valid = await bcrypt.compare(password, user.password);
      if (valid) {
        return user;
      } else {
        return null;
      }
    } catch (err) {
      throw err;
    }
  };

  secret = process.env.SECRET;

  // generate tokens using a jwt/jsonwebtoken
  generateToken = (userId) => {
    try {
      const payload = { userId };
      const options = { expiresIn: "1h" };
      const token = jwt.sign(payload, this.secret, options);
      return token;
    } catch (err) {
      throw err;
    }
  };

  // to check the login state of
  login = async (email, password) => {
    try {
      // const encrypt = await this.encryptPassword(password);
      const user = await this.verifyCredentials(email, password);
      if (user) {
        const token = this.generateToken(user._id);
        return { isLoggedIn: true, jwt: token, userID: user._id };
      } else {
        return { isLoggedIn: false };
      }
    } catch (err) {
      console.log(err);
    }
  };
}

module.exports = userService;
