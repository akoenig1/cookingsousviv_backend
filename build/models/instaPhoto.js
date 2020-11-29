"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

require("dotenv/config");

require("regenerator-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Request photo data from Instagram API. Wait for promise to resolve and return result.
function getPhotos() {
  return _getPhotos.apply(this, arguments);
} // Call getPhotos asynchronously and assign resolved promise to instaPhotos constant for export


function _getPhotos() {
  _getPhotos = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var fields, user_id, token, photo_limit, photos;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            fields = "id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,username";
            user_id = process.env.REACT_APP_INSTAGRAM_USER_ID;
            token = process.env.REACT_APP_INSTAGRAM_API_KEY;
            photo_limit = 1000;
            _context.next = 6;
            return _axios["default"].get("https://graph.instagram.com/".concat(user_id, "/media?fields=").concat(fields, "&access_token=").concat(token, "&limit=").concat(photo_limit)).then(function (res) {
              return res.data.data;
            })["catch"](function (err) {
              console.log(err);
            });

          case 6:
            photos = _context.sent;
            return _context.abrupt("return", photos);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getPhotos.apply(this, arguments);
}

var instaPhoto = getPhotos().then(function (res) {
  return res;
})["catch"](function (err) {
  console.log(err);
});
var _default = instaPhoto;
exports["default"] = _default;
//# sourceMappingURL=instaPhoto.js.map