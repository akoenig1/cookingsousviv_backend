"use strict";

var _passport = _interopRequireDefault(require("passport"));

var _user = _interopRequireDefault(require("../models/user"));

var _keys = _interopRequireDefault(require("./keys"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var GoogleStrategy = require("passport-google-oauth20").Strategy; // Setup Google Strategy


_passport["default"].serializeUser(function (user, done) {
  done(null, user._id);
});

_passport["default"].deserializeUser(function (_id, done) {
  console.log(_id);

  _user["default"].findById(_id, function (err, user) {
    done(err, user);
  });
});

_passport["default"].use(new GoogleStrategy({
  clientID: _keys["default"].GOOGLE_ID,
  clientSecret: _keys["default"].GOOGLE_SECRET,
  callbackURL: "".concat(_keys["default"].SERVER_URL, "/auth/google/redirect")
}, function (accessToken, refreshToken, profile, done) {
  _user["default"].findOrCreate({
    id: profile.id
  }, {
    email: profile._json.email,
    name: profile._json.name,
    imageUrl: profile._json.picture,
    admin: false
  }, function (err, user) {
    if (err) {
      console.log(err);
    } else {
      return done(err, user);
    }
  });
}));
//# sourceMappingURL=passport-setup.js.map