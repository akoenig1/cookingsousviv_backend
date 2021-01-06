"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("dotenv/config");

var _express = require("express");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _authController = _interopRequireDefault(require("../controllers/authController"));

var _passport = _interopRequireDefault(require("passport"));

var _keys = _interopRequireDefault(require("../config/keys"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
router.get('/login/failed', _authController["default"].login_failed);
router.get('/logout', _authController["default"].logout);
router.get('/google', _authController["default"].google_auth);
router.get('/google/redirect', _passport["default"].authenticate("google", {
  failureRedirect: '/auth/login/failed',
  session: false
}), function (req, res) {
  req.logIn(req.user, function (err) {
    if (err) {
      console.log(err);
    } else {
      try {
        var token = _jsonwebtoken["default"].sign({
          id: req.user.id
        }, process.env.JWT_SECRET, {
          expiresIn: '1h'
        });

        res.header('Authorization', token).redirect("".concat(_keys["default"].HOME_PAGE_URL));
      } catch (err) {
        console.log(err);
      }
    }
  });
});
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=auth.js.map