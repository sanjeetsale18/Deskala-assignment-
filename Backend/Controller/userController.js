const UserService = require("../Services/userServices");
const UserServiceInstance = new UserService();

const postSignUp = async (req, res) => {
  try {
    const result = await UserServiceInstance.create(req.body);
    res.json(result);
  } catch (err) {
    if (err.code === 11000) {
      res.status(409).json({
        message: "Failed to create new user",
        reason: "Already Exits in DB",
      });
    } else {
      res.status(500).json({ message: "Failed to create new user" });
    }
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const userResult = await UserServiceInstance.findUser(id);
    if (userResult) {
      res.json(userResult);
    } else {
      res.status(404).json({ message: "User not Found", username });
    }
  } catch (err) {
    res.status(500).json({ message: "Error fetching user", err });
  }
};

const checkLogIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const loginResult = await UserServiceInstance.login(email, password);
    if (loginResult.isLoggedIn) {
      res.json(loginResult);
    } else {
      res.status(403).json({ message: "Invalid Credentials" });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to login", err });
  }
};

module.exports = {
  getUserById,
  checkLogIn,
  postSignUp,
};
