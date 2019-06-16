import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: { // 保存组件中公用的状态
    count: 0,
  },
  mutations: { // 定义状态改变的方法
    increase() {
      this.state.count += 1;
    },
  },
  actions: {

  },
});
