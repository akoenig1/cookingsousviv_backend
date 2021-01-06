"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _urlStringify = _interopRequireDefault(require("../helpers/urlStringify"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var RecipeSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  intro: {
    type: String,
    required: true
  },
  ingredients: {
    type: String,
    required: true
  },
  directions: {
    type: String,
    required: true
  },
  instaPhoto: {
    type: Schema.Types.ObjectId,
    ref: 'InstaPhoto'
  },
  tags: {
    type: String
  },
  comments: [{
    type: String
  }],
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
});
RecipeSchema.virtual('url').get(function () {
  return '/recipes/' + (0, _urlStringify["default"])(this.title);
});
module.exports = _mongoose["default"].model('Recipe', RecipeSchema);
//# sourceMappingURL=recipe.js.map