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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   config: () => (/* binding */ config),\n/* harmony export */   middleware: () => (/* binding */ middleware)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(middleware)/./node_modules/next/dist/esm/api/server.js\");\n\nconst allowedOrigins = [\n    \"*\"\n];\nconst corsOptions = {\n    \"Access-Control-Allow-Methods\": \"GET, POST, PUT, DELETE, OPTIONS\",\n    \"Access-Control-Allow-Headers\": \"Content-Type, Authorization\"\n};\nfunction middleware(request) {\n    // Check the origin from the request\n    const origin = request.headers.get(\"origin\") ?? \"\";\n    const isAllowedOrigin = allowedOrigins.includes(origin);\n    // Handle preflighted requests\n    const isPreflight = request.method === \"OPTIONS\";\n    if (isPreflight) {\n        const preflightHeaders = {\n            ...isAllowedOrigin && {\n                \"Access-Control-Allow-Origin\": origin\n            },\n            ...corsOptions\n        };\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({}, {\n            headers: preflightHeaders\n        });\n    }\n    // Handle simple requests\n    const response = next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.next();\n    if (isAllowedOrigin) {\n        response.headers.set(\"Access-Control-Allow-Origin\", origin);\n    }\n    Object.entries(corsOptions).forEach(([key, value])=>{\n        response.headers.set(key, value);\n    });\n    return response;\n}\nconst config = {\n    matcher: \"/api/:path*\"\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKG1pZGRsZXdhcmUpLy4vbWlkZGxld2FyZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBdUQ7QUFFdkQsTUFBTUMsaUJBQWlCO0lBQUM7Q0FBSTtBQUU1QixNQUFNQyxjQUFjO0lBQ2xCLGdDQUFnQztJQUNoQyxnQ0FBZ0M7QUFDbEM7QUFFTyxTQUFTQyxXQUFXQyxPQUFvQjtJQUM3QyxvQ0FBb0M7SUFDcEMsTUFBTUMsU0FBU0QsUUFBUUUsT0FBTyxDQUFDQyxHQUFHLENBQUMsYUFBYTtJQUNoRCxNQUFNQyxrQkFBa0JQLGVBQWVRLFFBQVEsQ0FBQ0o7SUFFaEQsOEJBQThCO0lBQzlCLE1BQU1LLGNBQWNOLFFBQVFPLE1BQU0sS0FBSztJQUV2QyxJQUFJRCxhQUFhO1FBQ2YsTUFBTUUsbUJBQW1CO1lBQ3ZCLEdBQUlKLG1CQUFtQjtnQkFBRSwrQkFBK0JIO1lBQU8sQ0FBQztZQUNoRSxHQUFHSCxXQUFXO1FBQ2hCO1FBQ0EsT0FBT0YscURBQVlBLENBQUNhLElBQUksQ0FBQyxDQUFDLEdBQUc7WUFBRVAsU0FBU007UUFBaUI7SUFDM0Q7SUFFQSx5QkFBeUI7SUFDekIsTUFBTUUsV0FBV2QscURBQVlBLENBQUNlLElBQUk7SUFFbEMsSUFBSVAsaUJBQWlCO1FBQ25CTSxTQUFTUixPQUFPLENBQUNVLEdBQUcsQ0FBQywrQkFBK0JYO0lBQ3REO0lBRUFZLE9BQU9DLE9BQU8sQ0FBQ2hCLGFBQWFpQixPQUFPLENBQUMsQ0FBQyxDQUFDQyxLQUFLQyxNQUFNO1FBQy9DUCxTQUFTUixPQUFPLENBQUNVLEdBQUcsQ0FBQ0ksS0FBS0M7SUFDNUI7SUFFQSxPQUFPUDtBQUNUO0FBRU8sTUFBTVEsU0FBUztJQUNwQkMsU0FBUztBQUNYLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vbWlkZGxld2FyZS50cz80MjJkIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXF1ZXN0LCBOZXh0UmVzcG9uc2UgfSBmcm9tICduZXh0L3NlcnZlcidcclxuIFxyXG5jb25zdCBhbGxvd2VkT3JpZ2lucyA9IFsnKiddXHJcbiBcclxuY29uc3QgY29yc09wdGlvbnMgPSB7XHJcbiAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU1ldGhvZHMnOiAnR0VULCBQT1NULCBQVVQsIERFTEVURSwgT1BUSU9OUycsXHJcbiAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LUhlYWRlcnMnOiAnQ29udGVudC1UeXBlLCBBdXRob3JpemF0aW9uJyxcclxufVxyXG4gXHJcbmV4cG9ydCBmdW5jdGlvbiBtaWRkbGV3YXJlKHJlcXVlc3Q6IE5leHRSZXF1ZXN0KSB7XHJcbiAgLy8gQ2hlY2sgdGhlIG9yaWdpbiBmcm9tIHRoZSByZXF1ZXN0XHJcbiAgY29uc3Qgb3JpZ2luID0gcmVxdWVzdC5oZWFkZXJzLmdldCgnb3JpZ2luJykgPz8gJydcclxuICBjb25zdCBpc0FsbG93ZWRPcmlnaW4gPSBhbGxvd2VkT3JpZ2lucy5pbmNsdWRlcyhvcmlnaW4pXHJcbiBcclxuICAvLyBIYW5kbGUgcHJlZmxpZ2h0ZWQgcmVxdWVzdHNcclxuICBjb25zdCBpc1ByZWZsaWdodCA9IHJlcXVlc3QubWV0aG9kID09PSAnT1BUSU9OUydcclxuIFxyXG4gIGlmIChpc1ByZWZsaWdodCkge1xyXG4gICAgY29uc3QgcHJlZmxpZ2h0SGVhZGVycyA9IHtcclxuICAgICAgLi4uKGlzQWxsb3dlZE9yaWdpbiAmJiB7ICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiBvcmlnaW4gfSksXHJcbiAgICAgIC4uLmNvcnNPcHRpb25zLFxyXG4gICAgfVxyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHt9LCB7IGhlYWRlcnM6IHByZWZsaWdodEhlYWRlcnMgfSlcclxuICB9XHJcbiBcclxuICAvLyBIYW5kbGUgc2ltcGxlIHJlcXVlc3RzXHJcbiAgY29uc3QgcmVzcG9uc2UgPSBOZXh0UmVzcG9uc2UubmV4dCgpXHJcbiBcclxuICBpZiAoaXNBbGxvd2VkT3JpZ2luKSB7XHJcbiAgICByZXNwb25zZS5oZWFkZXJzLnNldCgnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJywgb3JpZ2luKVxyXG4gIH1cclxuIFxyXG4gIE9iamVjdC5lbnRyaWVzKGNvcnNPcHRpb25zKS5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcclxuICAgIHJlc3BvbnNlLmhlYWRlcnMuc2V0KGtleSwgdmFsdWUpXHJcbiAgfSlcclxuIFxyXG4gIHJldHVybiByZXNwb25zZVxyXG59XHJcbiBcclxuZXhwb3J0IGNvbnN0IGNvbmZpZyA9IHtcclxuICBtYXRjaGVyOiAnL2FwaS86cGF0aConLFxyXG59Il0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsImFsbG93ZWRPcmlnaW5zIiwiY29yc09wdGlvbnMiLCJtaWRkbGV3YXJlIiwicmVxdWVzdCIsIm9yaWdpbiIsImhlYWRlcnMiLCJnZXQiLCJpc0FsbG93ZWRPcmlnaW4iLCJpbmNsdWRlcyIsImlzUHJlZmxpZ2h0IiwibWV0aG9kIiwicHJlZmxpZ2h0SGVhZGVycyIsImpzb24iLCJyZXNwb25zZSIsIm5leHQiLCJzZXQiLCJPYmplY3QiLCJlbnRyaWVzIiwiZm9yRWFjaCIsImtleSIsInZhbHVlIiwiY29uZmlnIiwibWF0Y2hlciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(middleware)/./middleware.ts\n");

/***/ })

});