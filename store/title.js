export const state = () => ({
  title: "default"
})

export const getters ={
  title: state => state.title
}


export const mutations = {
  put: (state, title) => {
    state.title = title
  },
  remove: state => Object.assign(state, {title: "default"})
}