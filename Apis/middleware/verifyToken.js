const jwt = require("jsonwebtoken");
require("dotenv").config();
const verifytoken = (req, res, next) => {
  let bearertoken = req.headers.authorization;
  if (bearertoken == undefined) {
    return res.status(200).send({ message: "unauthorization request" });
  } else {
    let token = bearertoken.split(" ")[1];
    try {
      jwt.verify(token, process.env.SECURITY_KEY);
      next();
    } catch (err) {
      next(new Error("Session Expired. Try Logging in again!"));
    }
  }
};

module.exports = verifytoken;
