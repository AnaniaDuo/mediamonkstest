const Sequelize = require("sequelize");
const db = require("../db");
const jwt = require("jsonwebtoken");

const Guest = db.define("guest", {
  trend: {
    type: Sequelize.STRING,
  },
});

module.exports = Guest;

/**
 * instanceMethods
 */

Guest.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT);
};

/**
 * classMethods
 */

Guest.findByToken = async function (token) {
  try {
    const { id } = await jwt.verify(token, process.env.JWT);
    const guest = Guest.findByPk(id);
    if (!guest) {
      throw "nooo";
    }
    return guest;
  } catch (ex) {
    const error = Error("bad token");
    error.status = 401;
    throw error;
  }
};
