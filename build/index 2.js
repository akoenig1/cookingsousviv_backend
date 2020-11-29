"use strict";

require("dotenv/config");

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _passport = _interopRequireDefault(require("passport"));

var _passportLocal = _interopRequireDefault(require("passport-local"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _cors = _interopRequireDefault(require("cors"));

var _uuid = require("uuid");

var _routes = _interopRequireDefault(require("./routes"));

var _instaPhoto = _interopRequireDefault(require("./models/instaPhoto"));

var _user = _interopRequireDefault(require("./models/user"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Setup connection to MongoDB
var mongoDB = "mongodb+srv://akoenig1:".concat(process.env.MONGO_DB_PW, "@cluster0.hhgkn.mongodb.net/<dbname>?retryWrites=true&w=majority");

_mongoose["default"].connect(mongoDB, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

var db = _mongoose["default"].connection;
db.on('error', console.error.bind(console, 'Mongo Connection Error')); // Setup Local Strategy

var LocalStrategy = _passportLocal["default"].Strategy;

_passport["default"].use(new LocalStrategy(function (username, password, done) {
  _user["default"].findOne({
    username: username
  }, function (err, user) {
    if (err) {
      return done(err);
    }

    ;

    if (!user) {
      return done(null, false, {
        msg: 'Username does not exist'
      });
    }

    _bcryptjs["default"].compare(password, user.password, function (err, res) {
      if (res) {
        // passwords match so log user in
        return done(null, user);
      } else {
        // passwords do not match
        return done(null, false, {
          msg: 'Incorrect password'
        });
      }
    });
  });
}));

_passport["default"].serializeUser(function (user, done) {
  done(null, user.id);
});

_passport["default"].deserializeUser(function (id, done) {
  _user["default"].findById(id, function (err, user) {
    done(err, user);
  });
}); // Setup CORS white list


var whitelist = ['http://www.cookingsousviv.com/'];
var corsOptions = {
  origin: function origin(_origin, callback) {
    if (whitelist.indexOf(_origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};
var app = (0, _express["default"])(); // Imported middleware //

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});
app.use((0, _cors["default"])());
app.use(_express["default"].json());
app.use((0, _expressSession["default"])({
  secret: 'cats',
  resave: false,
  saveUninitialized: true
}));
app.use(_passport["default"].initialize());
app.use(_passport["default"].session());
app.use(_express["default"].urlencoded({
  extended: true
})); // Custom middleware //
// Wait for response from Instagram API requested in instaPhotos model

app.use( /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _instaPhoto["default"];

          case 2:
            _context.t0 = _context.sent;
            req.context = {
              photos: _context.t0
            };
            next();

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}()); // Access current user in all views/controllers

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
}); // Router middleware //

app.use('/instaPhotos', _routes["default"].instaPhotos); // Run server //

app.listen(process.env.PORT, function () {
  console.log("Listening on port ".concat(process.env.PORT));
});
//# sourceMappingURL=index.js.map