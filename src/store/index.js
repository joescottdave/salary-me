import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: 'Alex',
    salary: 15600,
    postcode: 'CF243AA',
    area: {}
  },
  mutations: {
    SET_STATE(state, userInfo) {
      state.username = userInfo.username
      state.salary = userInfo.salary
      state.postcode = userInfo.postcode
    }
  },
  actions: {
    defineUser(context, userInfo) {
      context.commit('SET_STATE', userInfo)
    }
  },
  modules: {},
  getters: {
    salaryString: state => {
      return state.salary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    salary: state => {
      return state.salary
    }
  }
})
