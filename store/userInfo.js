export const state = () => ({})

export const getters ={
  userInfo: state => state
}

export const mutations = {
  put: (state, userInfo) => {
    //console.log("store/userInfo.put", userInfo)
    Object.assign(state, userInfo)
    //console.log("state", state)
  },
  remove: state => Object.assign(state, {})
}