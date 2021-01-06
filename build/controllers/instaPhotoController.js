"use strict";

var _instaPhoto = _interopRequireDefault(require("../models/instaPhoto"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

exports.instaPhoto_get = function (req, res, next) {
  _instaPhoto["default"].find({}).sort('-timestamp').exec(function (err, list_photos) {
    if (err) {
      return next(err);
    } //Successful, so send to frontend


    res.send({
      photos: list_photos
    });
  });
};
//# sourceMappingURL=instaPhotoController.js.map