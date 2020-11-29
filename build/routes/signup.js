"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
router.post('/', function (req, res, next) {
  bcrpyt.hash(req.body.password, 10, function (err, hashedPassword) {
    var user = new User({
      username: req.body.username,
      password: hashedPassword
    }).save(function (err) {
      if (err) {
        return next(err);
      }

      ;
      res.redirect("/");
    });
  });
});
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=signup.js.map