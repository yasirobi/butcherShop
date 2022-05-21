const { expressjwt: jwt } = require("express-jwt")
require("dotenv").config({ path: "./config/.env" });

//protecting the route
exports.requireSignin = jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'], // added later
    userProperty: "auth",
  });