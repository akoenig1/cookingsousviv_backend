"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function urlStringify(Text) {
  return Text.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');
}

var _default = urlStringify;
exports["default"] = _default;
//# sourceMappingURL=urlStringify.js.map