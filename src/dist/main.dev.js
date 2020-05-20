"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _App = _interopRequireDefault(require("./App.vue"));

var _router = _interopRequireDefault(require("./router"));

var _store = _interopRequireDefault(require("./store"));

require("./plugins/element.js");

require("./assets/fonts/iconfont.css");

require("./assets/css/global.css");

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// 导入字体图标
// 导入全局样式表
// 配置请求的跟路径
_axios["default"].defaults.baseURL = 'https://www.liulongbin.top:8888/api/private/v1/';

_axios["default"].interceptors.request.use(function (config) {
  // console.log(config);
  config.headers.Authorization = sessionStorage.getItem('token');
  return config;
});

_vue["default"].prototype.$http = _axios["default"];
_vue["default"].config.productionTip = false;
new _vue["default"]({
  router: _router["default"],
  store: _store["default"],
  render: function render(h) {
    return h(_App["default"]);
  }
}).$mount('#app');