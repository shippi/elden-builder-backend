"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("middleware",{

/***/ "(middleware)/./middleware.ts":
/*!***********************!*\
  !*** ./middleware.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   config: () => (/* binding */ config),\n/* harmony export */   middleware: () => (/* binding */ middleware)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(middleware)/./node_modules/next/dist/esm/api/server.js\");\n\nfunction middleware() {\n    // retrieve the current response\n    const res = next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.next();\n    // add the CORS headers to the response\n    res.headers.append(\"Access-Control-Allow-Credentials\", \"true\");\n    res.headers.append(\"Access-Control-Allow-Origin\", \"*\");\n    res.headers.append(\"Access-Control-Allow-Methods\", \"GET,DELETE,POST,PUT,OPTIONS\");\n    res.headers.append(\"Access-Control-Allow-Headers\", \"X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version\");\n    next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.next();\n    return res;\n}\nconst config = {\n    matcher: \"/api/:path*\"\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKG1pZGRsZXdhcmUpLy4vbWlkZGxld2FyZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBd0Q7QUFFakQsU0FBU0M7SUFDWixnQ0FBZ0M7SUFDaEMsTUFBTUMsTUFBTUYscURBQVlBLENBQUNHLElBQUk7SUFFN0IsdUNBQXVDO0lBQ3ZDRCxJQUFJRSxPQUFPLENBQUNDLE1BQU0sQ0FBQyxvQ0FBb0M7SUFDdkRILElBQUlFLE9BQU8sQ0FBQ0MsTUFBTSxDQUFDLCtCQUErQjtJQUNsREgsSUFBSUUsT0FBTyxDQUFDQyxNQUFNLENBQUMsZ0NBQWdDO0lBQ25ESCxJQUFJRSxPQUFPLENBQUNDLE1BQU0sQ0FDZCxnQ0FDQTtJQUVKTCxxREFBWUEsQ0FBQ0csSUFBSTtJQUNqQixPQUFPRDtBQUNYO0FBRU8sTUFBTUksU0FBUztJQUNsQkMsU0FBUztBQUNiLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vbWlkZGxld2FyZS50cz80MjJkIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXF1ZXN0LCBOZXh0UmVzcG9uc2UgfSBmcm9tIFwibmV4dC9zZXJ2ZXJcIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBtaWRkbGV3YXJlKCkge1xyXG4gICAgLy8gcmV0cmlldmUgdGhlIGN1cnJlbnQgcmVzcG9uc2VcclxuICAgIGNvbnN0IHJlcyA9IE5leHRSZXNwb25zZS5uZXh0KClcclxuXHJcbiAgICAvLyBhZGQgdGhlIENPUlMgaGVhZGVycyB0byB0aGUgcmVzcG9uc2VcclxuICAgIHJlcy5oZWFkZXJzLmFwcGVuZCgnQWNjZXNzLUNvbnRyb2wtQWxsb3ctQ3JlZGVudGlhbHMnLCBcInRydWVcIilcclxuICAgIHJlcy5oZWFkZXJzLmFwcGVuZCgnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJywgJyonKVxyXG4gICAgcmVzLmhlYWRlcnMuYXBwZW5kKCdBY2Nlc3MtQ29udHJvbC1BbGxvdy1NZXRob2RzJywgJ0dFVCxERUxFVEUsUE9TVCxQVVQsT1BUSU9OUycpXHJcbiAgICByZXMuaGVhZGVycy5hcHBlbmQoXHJcbiAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LUhlYWRlcnMnLFxyXG4gICAgICAgICdYLUNTUkYtVG9rZW4sIFgtUmVxdWVzdGVkLVdpdGgsIEFjY2VwdCwgQWNjZXB0LVZlcnNpb24sIENvbnRlbnQtTGVuZ3RoLCBDb250ZW50LU1ENSwgQ29udGVudC1UeXBlLCBEYXRlLCBYLUFwaS1WZXJzaW9uJ1xyXG4gICAgKVxyXG4gICAgTmV4dFJlc3BvbnNlLm5leHQoKVxyXG4gICAgcmV0dXJuIHJlc1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgY29uZmlnID0ge1xyXG4gICAgbWF0Y2hlcjogJy9hcGkvOnBhdGgqJyxcclxufSJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJtaWRkbGV3YXJlIiwicmVzIiwibmV4dCIsImhlYWRlcnMiLCJhcHBlbmQiLCJjb25maWciLCJtYXRjaGVyIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(middleware)/./middleware.ts\n");

/***/ })

});