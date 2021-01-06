"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _uuid = require("uuid");

var _mongooseFindorcreate = _interopRequireDefault(require("mongoose-findorcreate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var userSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String
  },
  admin: {
    type: Boolean,
    required: true
  },
  comments: [{
    type: String
  }],
  likes: [{
    type: Boolean
  }]
});
userSchema.plugin(_mongooseFindorcreate["default"]);
var User = new _mongoose["default"].model("User", userSchema);
var _default = User;
exports["default"] = _default;
//# sourceMappingURL=user.js.map