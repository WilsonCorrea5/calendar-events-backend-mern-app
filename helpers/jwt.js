const jsonwebtoken = require("jsonwebtoken");

const generateJWT = (uid, name) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name };
    console.log(payload);
    jsonwebtoken.sign(
      payload,
      process.env.SECRET_JWT_SEED,
      {
        expiresIn: "2h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("Error from JWT");
        }
        resolve(token);
      }
    );
  });
};

module.exports = {
  generateJWT,
};
