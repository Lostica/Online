"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _vue=_interopRequireDefault(require("vue")),_vueRouter=_interopRequireDefault(require("vue-router")),_Login=_interopRequireDefault(require("../components/Login.vue")),_Home=_interopRequireDefault(require("../components/Home.vue")),_Welcome=_interopRequireDefault(require("../components/Welcome.vue")),_Users=_interopRequireDefault(require("../components/users/Users.vue")),_Rights=_interopRequireDefault(require("../components/power/Rights.vue")),_Roles=_interopRequireDefault(require("../components/power/Roles.vue")),_Cate=_interopRequireDefault(require("../components/goods/Cate.vue")),_Params=_interopRequireDefault(require("../components/goods/Params.vue"));function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}_vue.default.use(_vueRouter.default);var routes=[{path:"/",redirect:"/login"},{path:"/login",component:_Login.default},{path:"/home",component:_Home.default,redirect:"/welcome",children:[{path:"/welcome",component:_Welcome.default},{path:"/users",component:_Users.default},{path:"/rights",component:_Rights.default},{path:"/roles",component:_Roles.default},{path:"/categories",component:_Cate.default},{path:"/params",component:_Params.default}]}],router=new _vueRouter.default({mode:"history",base:process.env.BASE_URL,routes:routes});router.beforeEach(function(e,t,o){return"/login"==e.path?o():sessionStorage.getItem("token")?void o():o("/login")});var _default=router;exports.default=_default;