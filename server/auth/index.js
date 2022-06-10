const router = require("express").Router();
const {
  models: { User, Guest },
} = require("../db");

const { generateRandomRedOrBlue, cookieToObj } = require("../utils");

module.exports = router;

router.post("/login", async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body) });
  } catch (err) {
    next(err);
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    } else {
      next(err);
    }
  }
});

router.get("/me", async (req, res, next) => {
  try {
    const cookieObj = cookieToObj(req.headers.cookie);
    const token = cookieObj.token;
    const user = await User.findByToken(token);
    let color;

    //if cookie only includes both token and data trend
    if (Object.keys(cookieObj).length !== 1) {
      color = cookieObj.color;
      const counter = parseInt(cookieObj[color]) + 1;
      res.cookie(`${color}`, counter);
      await user.update({
        trend: `${color}=${counter}, ${color === "red" ? "blue" : "red"}=0 `,
      });
    }
    //else if cookie only includes token
    else {
      res.cookie("token", `${token}`);
      color = generateRandomRedOrBlue();
      res.cookie("color", color);
      res.cookie(`${color}`, 1);
      res.cookie(`${color === "red" ? "blue" : "red"}`, 0);
      await user.update({
        trend: `${color}=1, ${color === "red" ? "blue" : "red"}=0`,
      });
    }

    res.send({ user, color });
  } catch (ex) {
    next(ex);
  }
});

router.get("/guestme", async (req, res, next) => {
  try {
    let color;
    let guestToken;
    if (req.headers.cookie) {
      const cookieObj = cookieToObj(req.headers.cookie);
      color = cookieObj.color;
      guestToken = cookieObj.guestToken;
      const guest = await Guest.findByToken(guestToken);
      const counter = parseInt(cookieObj[color]) + 1;
      res.cookie(`${color}`, counter);

      await guest.update({
        trend: `${color}=${counter}, ${color === "red" ? "blue" : "red"}=0 `,
      });
    } else {
      const newGuest = await Guest.create();
      guestToken = await newGuest.generateToken();
      res.cookie("guestToken", guestToken);
      color = generateRandomRedOrBlue();
      res.cookie("color", color);
      res.cookie(`${color}`, 1);
      res.cookie(`${color === "red" ? "blue" : "red"}`, 0);
      await newGuest.update({
        trend: `${color}=1, ${color === "red" ? "blue" : "red"}=0`,
      });
    }

    res.send(color);
  } catch (err) {
    next(err);
  }
});

router.get("/report", async (req, res, next) => {
  try {
    const user = await User.findAll();
    const userTrend = user.map((ele) => {
      return { [ele.id]: ele.trend };
    });
    res.send(userTrend);
  } catch (err) {
    next(err);
  }
});
