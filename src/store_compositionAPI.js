import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

const state = {
  count: 0,
  theme: 'white',
  user: null
}

const mutations = {
  setCount (state, count) 
  { 
      state.count = count
  },
  setTheme (state, theme)
  { 
      state.theme = theme
  },
  setUser (state, user)
  {
    state.user = user
  },
}

const getters = {
  getCount: (state) => state.count,
  getTheme: (state) => state.theme,
  getUser: (state) => state.user,
}

export default createStore({
  plugins: [createPersistedState()],
  state,
  getters,
  mutations
})