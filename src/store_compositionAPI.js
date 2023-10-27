import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

const state = {
  count: 0,
  theme: 'white'
}

const mutations = {
    setCount (state, count) 
    { 
        state.count = count
    },
    setTheme (state, theme)
    { 
        state.theme = theme
    }
}

const getters = {
    getCount: (state) => state.count,
    getTheme: (state) => state.theme,
}

export default createStore({
  plugins: [createPersistedState()],
  state,
  getters,
  mutations
})