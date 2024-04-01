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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   config: () => (/* binding */ config),\n/* harmony export */   middleware: () => (/* binding */ middleware)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(middleware)/./node_modules/next/dist/esm/api/server.js\");\n\nfunction middleware() {\n    // retrieve the current response\n    const res = next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.next();\n    // add the CORS headers to the response\n    res.headers.append(\"Access-Control-Allow-Credentials\", \"true\");\n    res.headers.append(\"Access-Control-Allow-Origin\", \"http://localhost:3000/build-creator\");\n    res.headers.append(\"Access-Control-Allow-Methods\", \"GET,DELETE,POST,PUT,OPTIONS\");\n    res.headers.append(\"Access-Control-Allow-Headers\", \"X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version\");\n    console.log(res);\n    return res;\n}\nconst config = {\n    matcher: \"/api/:path*\"\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKG1pZGRsZXdhcmUpLy4vbWlkZGxld2FyZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBd0Q7QUFFakQsU0FBU0M7SUFDWixnQ0FBZ0M7SUFDaEMsTUFBTUMsTUFBTUYscURBQVlBLENBQUNHLElBQUk7SUFFN0IsdUNBQXVDO0lBQ3ZDRCxJQUFJRSxPQUFPLENBQUNDLE1BQU0sQ0FBQyxvQ0FBb0M7SUFDdkRILElBQUlFLE9BQU8sQ0FBQ0MsTUFBTSxDQUFDLCtCQUErQjtJQUNsREgsSUFBSUUsT0FBTyxDQUFDQyxNQUFNLENBQUMsZ0NBQWdDO0lBQ25ESCxJQUFJRSxPQUFPLENBQUNDLE1BQU0sQ0FDZCxnQ0FDQTtJQUVKQyxRQUFRQyxHQUFHLENBQUNMO0lBQ1osT0FBT0E7QUFDWDtBQUVPLE1BQU1NLFNBQVM7SUFDbEJDLFNBQVM7QUFDYixFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL21pZGRsZXdhcmUudHM/NDIyZCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVxdWVzdCwgTmV4dFJlc3BvbnNlIH0gZnJvbSBcIm5leHQvc2VydmVyXCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbWlkZGxld2FyZSgpIHtcclxuICAgIC8vIHJldHJpZXZlIHRoZSBjdXJyZW50IHJlc3BvbnNlXHJcbiAgICBjb25zdCByZXMgPSBOZXh0UmVzcG9uc2UubmV4dCgpXHJcbiAgICBcclxuICAgIC8vIGFkZCB0aGUgQ09SUyBoZWFkZXJzIHRvIHRoZSByZXNwb25zZVxyXG4gICAgcmVzLmhlYWRlcnMuYXBwZW5kKCdBY2Nlc3MtQ29udHJvbC1BbGxvdy1DcmVkZW50aWFscycsIFwidHJ1ZVwiKVxyXG4gICAgcmVzLmhlYWRlcnMuYXBwZW5kKCdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nLCAnaHR0cDovL2xvY2FsaG9zdDozMDAwL2J1aWxkLWNyZWF0b3InKVxyXG4gICAgcmVzLmhlYWRlcnMuYXBwZW5kKCdBY2Nlc3MtQ29udHJvbC1BbGxvdy1NZXRob2RzJywgJ0dFVCxERUxFVEUsUE9TVCxQVVQsT1BUSU9OUycpXHJcbiAgICByZXMuaGVhZGVycy5hcHBlbmQoXHJcbiAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LUhlYWRlcnMnLFxyXG4gICAgICAgICdYLUNTUkYtVG9rZW4sIFgtUmVxdWVzdGVkLVdpdGgsIEFjY2VwdCwgQWNjZXB0LVZlcnNpb24sIENvbnRlbnQtTGVuZ3RoLCBDb250ZW50LU1ENSwgQ29udGVudC1UeXBlLCBEYXRlLCBYLUFwaS1WZXJzaW9uJ1xyXG4gICAgKVxyXG4gICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgcmV0dXJuIHJlc1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgY29uZmlnID0ge1xyXG4gICAgbWF0Y2hlcjogJy9hcGkvOnBhdGgqJyxcclxufSJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJtaWRkbGV3YXJlIiwicmVzIiwibmV4dCIsImhlYWRlcnMiLCJhcHBlbmQiLCJjb25zb2xlIiwibG9nIiwiY29uZmlnIiwibWF0Y2hlciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(middleware)/./middleware.ts\n");

/***/ })

});