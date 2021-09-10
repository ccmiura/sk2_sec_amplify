export const state = () => ({})

export const getters ={
  userInfo: state => state
}

export const mutations = {
  put: (state, userResult) => {
    Object.assign(state, userResult)
  },
  remove: state => Object.assign(state, {})
}
