const { response } = require("express");
const jsonwebtoken = require("jsonwebtoken");

const jwtValidator = (req, res = response, next) => {
  // x-token headers
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "Wrong request",
    });
  }
  try {
    const payload = jsonwebtoken.verify(token, process.env.SECRET_JWT_SEED);
    console.log(`jwt-validation: active user is: ${payload.name}`);
    req.uid = payload.uid;
    req.name = payload.name;
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "invalid token",
    });
  }
  next();
};

module.exports = {
  jwtValidator,
};
