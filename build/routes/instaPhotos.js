"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var router = (0, _express.Router)();
router.get('/', function (req, res) {
  return res.send(Object.values(req.context.photos));
});
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=instaPhotos.js.map