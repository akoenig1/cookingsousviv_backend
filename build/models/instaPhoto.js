"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var InstaPhotoSchema = new Schema({
  id: {
    type: String
  },
  caption: {
    type: String
  },
  media_type: {
    type: String
  },
  media_url: {
    type: String
  },
  permalink: {
    type: String
  },
  thumbnail_url: {
    type: String
  },
  timestamp: {
    type: String
  },
  username: {
    type: String
  },
  tags: {
    type: String
  }
}, {
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
});
InstaPhotoSchema.virtual('url').get(function () {
  return '/instaPhoto/' + this.id;
});
module.exports = _mongoose["default"].model('InstaPhoto', InstaPhotoSchema);
//# sourceMappingURL=instaPhoto.js.map