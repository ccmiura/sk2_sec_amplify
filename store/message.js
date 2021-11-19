export const state = () => ({
  message: "",
  type: "error",
})

export const getters = {
  message: state => state.message,
  type: state => state.type,
}

export const mutations = {
  putMessage: (state, msg, type="error") =>{
    state.message = msg
    state.type = type
  },
  clear: state => Object.assign(state, {message: "", type: "error"})
}

export const actions = {
  putMessage( { commit }, message, type="error") {
    commit('putMessage', message, type)
  },
  clear( { commit } ) {
    commit('clear')
  }
}