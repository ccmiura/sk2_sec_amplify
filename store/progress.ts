import { Module, VuexModule, Mutation } from 'vuex-module-decorators'

@Module({
  name: "progress",
  namespaced: true,
  stateFactory: true
})
export default class Progress extends VuexModule{
  public progressState = {
    progress: false,
  }
  @Mutation
  public on(){this.progressState.progress = true}
  @Mutation
  public off(){this.progressState.progress = false}

  public get progress(){
    return this.progressState.progress
  }
}
/*
export const state = () =>({progress: false})

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
*/