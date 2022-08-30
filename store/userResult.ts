import { Module, VuexModule, Mutation } from 'vuex-module-decorators'

@Module({
  name: "userResult",
  namespaced: true,
  stateFactory: true
})
export default class Progress extends VuexModule{
  public userResultState = {}
  @Mutation
  public put(userResult:any){
    Object.assign(this.userResultState, userResult)
  }
  @Mutation
  public remove(){
    Object.assign(this.userResultState, {})
  }
  public get userInfo(){return this.userResultState}
}
/*
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
*/