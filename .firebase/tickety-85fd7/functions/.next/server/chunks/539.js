"use strict";
exports.id = 539;
exports.ids = [539];
exports.modules = {

/***/ 8539:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "I8": () => (/* binding */ auth)
/* harmony export */ });
/* unused harmony exports functions, database */
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3745);
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(401);
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1492);
/* harmony import */ var firebase_functions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8937);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([firebase_app__WEBPACK_IMPORTED_MODULE_0__, firebase_auth__WEBPACK_IMPORTED_MODULE_1__, firebase_firestore__WEBPACK_IMPORTED_MODULE_2__, firebase_functions__WEBPACK_IMPORTED_MODULE_3__]);
([firebase_app__WEBPACK_IMPORTED_MODULE_0__, firebase_auth__WEBPACK_IMPORTED_MODULE_1__, firebase_firestore__WEBPACK_IMPORTED_MODULE_2__, firebase_functions__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);




const firebaseConfig = {
  apiKey: "AIzaSyAs-PLLtBdh0iZ0BAifDmRekZA8m7VU3gc",
  authDomain: "tickety-85fd7.firebaseapp.com",
  projectId: "tickety-85fd7",
  storageBucket: "tickety-85fd7.appspot.com",
  messagingSenderId: "276533721536",
  appId: "1:276533721536:web:cef5f50a8f5a641f0e3025",
  measurementId: "G-7T221XZYRJ"
};
const app = (0,firebase_app__WEBPACK_IMPORTED_MODULE_0__.initializeApp)(firebaseConfig);
const functions = (0,firebase_functions__WEBPACK_IMPORTED_MODULE_3__.getFunctions)(app);
const database = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.getFirestore)(app);
const auth = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_1__.getAuth)(app);

if (false) {}


__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;