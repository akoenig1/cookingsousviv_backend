"use strict";

require("dotenv/config");

require("core-js/stable");

require("regenerator-runtime/runtime");

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _passport = _interopRequireDefault(require("passport"));

var _passportSetup = _interopRequireDefault(require("./config/passport-setup"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _keys = _interopRequireDefault(require("./config/keys"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _cors = _interopRequireDefault(require("cors"));

var _uuid = require("uuid");

var _routes = _interopRequireDefault(require("./routes"));

var _updateInstaPhotos = _interopRequireDefault(require("./helpers/updateInstaPhotos"));

var _nodeCron = _interopRequireDefault(require("node-cron"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Setup connection to MongoDB
var mongoDB = _keys["default"].MONGO_DB_URI;

_mongoose["default"].connect(mongoDB, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false
});

var db = _mongoose["default"].connection;
db.on('error', console.error.bind(console, 'Mongo Connection Error')); // Setup CORS white list

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
// Express setup

app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use((0, _cookieParser["default"])()); // CORS Setup

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,Authorization,content-type,application/json');
  next();
});
app.use((0, _cors["default"])()); // Passport Setup

app.use((0, _expressSession["default"])({
  secret: _keys["default"].SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: false
  }
}));
app.use(_passport["default"].initialize());
app.use(_passport["default"].session()); // Custom middleware //
// Check for new instagram photos every 15 minutes

app.use( /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.t0 = _nodeCron["default"];
            _context.next = 3;
            return (0, _updateInstaPhotos["default"])(req, res, next);

          case 3:
            _context.t1 = _context.sent;

            _context.t0.schedule.call(_context.t0, '*/15 * * * *', _context.t1);

            next();

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}()); // Router middleware //

app.use('/auth', _routes["default"].auth);
app.use('/instaPhotos', _routes["default"].instaPhotos);
app.use('/recipes', _routes["default"].recipes); // Run server //

app.listen(process.env.PORT, function () {
  console.log("Listening on port ".concat(process.env.PORT));
});
//# sourceMappingURL=index.js.map