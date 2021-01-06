"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _instaPhotoController = _interopRequireDefault(require("../controllers/instaPhotoController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
router.get('/', _instaPhotoController["default"].instaPhoto_get);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=instaPhotos.js.map