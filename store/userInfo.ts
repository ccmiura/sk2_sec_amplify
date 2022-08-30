import { Module, VuexModule, Mutation } from 'vuex-module-decorators'

interface UserInfo {
  name: string,
  email: string,
}

@Module({
  name: "userInfo",
  namespaced: true,
  stateFactory: true
})

export default class Title extends VuexModule{
  userInfoState:UserInfo = {
    name: "",
    email: "",
  }
  @Mutation
  public put(userInfo: UserInfo){
    Object.assign(this.userInfoState, userInfo)
  }

  @Mutation
  public update(userInfo: UserInfo){
    this.userInfoState.name = userInfo.name
    this.userInfoState.email = userInfo.email
  }

  @Mutation
  public remove(){
    Object.assign(this.userInfoState, {name: "", email: "",})
  }

  public get userInfo(){return this.userInfoState}
}
/*
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
  update: (state, {email, userName}) =>{
    state.name = userName
    state.email = email
  },
  remove: state => Object.assign(state, {})
}*/