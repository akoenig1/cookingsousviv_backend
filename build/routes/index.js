"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _auth = _interopRequireDefault(require("./auth"));

var _instaPhotos = _interopRequireDefault(require("./instaPhotos"));

var _recipes = _interopRequireDefault(require("./recipes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  auth: _auth["default"],
  instaPhotos: _instaPhotos["default"],
  recipes: _recipes["default"]
};
exports["default"] = _default;
//# sourceMappingURL=index.js.map