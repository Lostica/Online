"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _Login = _interopRequireDefault(require("../components/Login.vue"));

var _Home = _interopRequireDefault(require("../components/Home.vue"));

var _Welcome = _interopRequireDefault(require("../components/Welcome.vue"));

var _Users = _interopRequireDefault(require("../components/users/Users.vue"));

var _Rights = _interopRequireDefault(require("../components/power/Rights.vue"));

var _Roles = _interopRequireDefault(require("../components/power/Roles.vue"));

var _Cate = _interopRequireDefault(require("../components/goods/Cate.vue"));

var _Params = _interopRequireDefault(require("../components/goods/Params.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vueRouter["default"]);

var routes = [{
  path: '/',
  redirect: '/login'
}, {
  path: '/login',
  component: _Login["default"]
}, {
  path: '/home',
  component: _Home["default"],
  redirect: '/welcome',
  children: [{
    path: '/welcome',
    component: _Welcome["default"]
  }, {
    path: '/users',
    component: _Users["default"]
  }, {
    path: '/rights',
    component: _Rights["default"]
  }, {
    path: '/roles',
    component: _Roles["default"]
  }, {
    path: '/categories',
    component: _Cate["default"]
  }, {
    path: '/params',
    component: _Params["default"]
  }]
}];
var router = new _vueRouter["default"]({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
});
router.beforeEach(function (to, from, next) {
  if (to.path == '/login') return next();
  var token = sessionStorage.getItem('token');
  if (!token) return next('/login');
  next();
});
var _default = router;
exports["default"] = _default;