"use strict";

require("dotenv/config");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

module.exports = function (req, res, next) {
  try {
    console.log(req.headers.authorization);
    var token = req.headers.authorization.split(' ')[1];

    if (!token) {
      throw new Error('Authentication failed!');
    }

    var decodedToken = _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET);

    req.userData = {
      id: decodedToken.id
    };
    next();
  } catch (err) {
    console.log(err);
  }
};
//# sourceMappingURL=check-auth.js.map