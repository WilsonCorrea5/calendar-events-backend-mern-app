// USER ROUTES / AUTH
// Host + /api/auth
const { Router } = require("express");
const { check } = require("express-validator");
const { fieldValidator } = require("../middlewares/field-validator");
const { jwtValidator } = require("../middlewares/jwt-validator");
const {
  createUser,
  loginUser,
  tokenRenovation,
} = require("../controllers/auth");

const router = Router();
router.post(
  "/new",
  [
    //middlewares
    check("name", "Name is required").not().isEmpty(),
    check("email", "Correct Email is required").isEmail(),
    check("password", "password must contain 6 or more characters").isLength({
      min: 6,
    }),
    fieldValidator,
  ],
  createUser
);
router.post(
  "/",
  [
    //middlewares
    check("email", "Correct Email is required").isEmail(),
    check("password", "password must contain 6 or more characters").isLength({
      min: 6,
    }),
    fieldValidator,
  ],
  loginUser
);
router.get("/renew", jwtValidator, tokenRenovation);

module.exports = router;
