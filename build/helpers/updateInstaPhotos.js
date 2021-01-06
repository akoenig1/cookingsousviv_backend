"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _getInstaPhotos = _interopRequireDefault(require("./getInstaPhotos"));

var _instaPhoto = _interopRequireDefault(require("../models/instaPhoto"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Call instaPhotoGetter asynchronously and save received values to mongoose database
function updateInstaPhotos(_x, _x2, _x3) {
  return _updateInstaPhotos.apply(this, arguments);
}

function _updateInstaPhotos() {
  _updateInstaPhotos = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var photos;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _getInstaPhotos["default"])().then(function (res) {
              return res;
            })["catch"](function (err) {
              console.log(err);
            });

          case 2:
            photos = _context.sent;
            photos.forEach(function (photo) {
              var instaPhoto = new _instaPhoto["default"]({
                id: photo.id,
                caption: photo.caption,
                media_type: photo.media_type,
                media_url: photo.media_url,
                permalink: photo.permalink,
                thumbnail_url: photo.thumbnail_url,
                timestamp: photo.timestamp,
                username: photo.username //tags: req.body.id,

              });

              _instaPhoto["default"].findOneAndUpdate({
                id: instaPhoto.id
              }, {
                caption: instaPhoto.caption,
                media_type: instaPhoto.media_type,
                media_url: instaPhoto.media_url,
                permalink: instaPhoto.permalink,
                thumbnail_url: instaPhoto.thumbnail_url,
                timestamp: instaPhoto.timestamp
              }, {
                upsert: true
              }, function (err) {
                if (err) {
                  return next(err);
                }
              });
            });

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _updateInstaPhotos.apply(this, arguments);
}

;
var _default = updateInstaPhotos;
exports["default"] = _default;
//# sourceMappingURL=updateInstaPhotos.js.map