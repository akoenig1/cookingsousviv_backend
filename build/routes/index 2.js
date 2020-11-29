"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _instaPhotos = _interopRequireDefault(require("./instaPhotos"));

var _login = _interopRequireDefault(require("./login"));

var _logout = _interopRequireDefault(require("./logout"));

var _signup = _interopRequireDefault(require("./signup"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  instaPhotos: _instaPhotos["default"],
  login: _login["default"],
  logout: _logout["default"],
  signup: _signup["default"]
};
exports["default"] = _default;
//# sourceMappingURL=index.js.map