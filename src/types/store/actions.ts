export default {
  makeOrder({ commit }) {
    commit('makeOrder');
  },
  removeOrder({ commit }, OrderNumber) {
    commit('removeOrder', OrderNumber);
  },
};
