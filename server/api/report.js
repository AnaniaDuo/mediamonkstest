const router = require("express").Router();
const {
  models: { User, Guest },
} = require("../db");
const { requireToken, isAdmin } = require("../api/authentication");
module.exports = router;

router.get(
  "/loginUserReport",
  requireToken,
  isAdmin,
  async (req, res, next) => {
    try {
      const report = await User.findAll({ attributes: ["id", "trend"] });
      res.send(report);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/guestUserReport",
  requireToken,
  isAdmin,
  async (req, res, next) => {
    try {
      const report = await Guest.findAll({ attributes: ["id", "trend"] });
      res.send(report);
    } catch (err) {
      next(err);
    }
  }
);
