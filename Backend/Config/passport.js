const { Strategy: JWTStrategy, ExtractJwt } = require("passport-jwt");
const UserService = require("../Services/userServices");

const UserServiceInstance = new UserService();

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET,
};

const jwtVerify = async (payload, done) => {
  try {
    console.log("Playload", payload);
    console.log(done);
    const user = await UserServiceInstance.findById(payload.userId);
    console.log(user);
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (err) {
    done(err, false);
  }
};

const strategy = new JWTStrategy(options, jwtVerify);

module.exports = strategy;
