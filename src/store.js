import { createStore } from 'vuex'

const store = createStore({
    state: {
        count: 0
    },
    getters: {
        getCount: (state) => {
            return state.count;
        }
    },
    mutations: {
        setCount: (state, count) => {
            state.count = count;
        }
    },
    actions: {

    }
});

export default store;