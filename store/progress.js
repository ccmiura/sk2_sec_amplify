export const state = ({progress: false})

export const getters = {
  progress: state => {
    console.log(state)
    return state.progress
  }
}

export const mutations = {
  on: state => state.progress = true,
  off: state => state.progress = false,
}
