"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = __importDefault(require("vue"));
var App_vue_1 = __importDefault(require("./App.vue"));
var router_1 = __importDefault(require("./router"));
var store_1 = __importDefault(require("./store"));
vue_1.default.config.productionTip = false;
new vue_1.default({
    router: router_1.default,
    store: store_1.default,
    render: function (h) { return h(App_vue_1.default); },
}).$mount('#app');
