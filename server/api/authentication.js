const express = require("express");
const { cookieToObj } = require("../utils");

const {
  models: { User },
} = require("../db");

// checks if user is logged in
// check if user is admin or not
const requireToken = async (req, res, next) => {
  try {
    const token = cookieToObj(req.headers.cookie).token;
    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

const isAdmin = async (req, res, next) => {
  try {
    if (req.user.isAdmin === true) {
      next();
    } else {
      res.status(403).send("Not allowed");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { requireToken, isAdmin };
