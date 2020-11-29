"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _passport = _interopRequireDefault(require("passport"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
router.get('/', function (req, res) {
  return res.send('index', {
    user: req.user
  });
});
router.post('/', _passport["default"].authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/'
}));
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=login.js.map