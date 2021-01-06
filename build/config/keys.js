"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("dotenv/config");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var GOOGLE_TOKENS = {
  GOOGLE_ID: process.env.GOOGLE_ID,
  GOOGLE_SECRET: process.env.GOOGLE_SECRET
};
var DB_USER = process.env.MONGO_DB_USERNAME;
var DB_PASSWORD = process.env.MONGO_DB_PW;
var DB_NAME = process.env.MONGO_DB_NAME;
var MONGO_DB = {
  MONGO_DB_URI: "mongodb+srv://".concat(DB_USER, ":").concat(DB_PASSWORD, "@cluster0.hhgkn.mongodb.net/").concat(DB_NAME, "?retryWrites=true&w=majority")
};
var SESSION = {
  SESSION_SECRET: process.env.SESSION_SECRET
};
var CLIENT = {
  HOME_PAGE_URL: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'http://cookingsousviv.com'
};
var SERVER = {
  SERVER_URL: process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://cookingsousviv-backend.herokuapp.com'
};

var KEYS = _objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread({}, GOOGLE_TOKENS), MONGO_DB), SESSION), CLIENT), SERVER);

var _default = KEYS;
exports["default"] = _default;
//# sourceMappingURL=keys.js.map