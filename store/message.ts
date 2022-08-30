import { Module, VuexModule, Mutation } from 'vuex-module-decorators'

interface RsvMessage {
  message: string,
  type? : string,
}

@Module({
  name: "message",
  namespaced: true,
  stateFactory: true
})



export default class Message extends VuexModule{
  
  public messageState = {
    message: "",
    type: "error",
  }

  @Mutation
  public putMessage(rsv : RsvMessage){
    this.messageState.message = rsv.message
    this.messageState.type = rsv.type != null ? rsv.type : "error"
  }

  @Mutation
  public clear(){
    Object.assign(this.messageState, {message: "", type: "error"})
  }

  public get message() {return this.messageState.message}
  public get type() {return this.messageState.type}
}

/*export const state = () => ({
  message: "",
  type: "error",
})

export const getters = {
  message: state => state.message,
  type: state => state.type,
}

export const mutations = {
  putMessage: (state, {message, type}) =>{
    state.message = message
    state.type = type
  },
  clear: state => Object.assign(state, {message: "", type: "error"})
}

export const actions = {
  putMessage( { commit }, {message, type}) {
    commit('putMessage', message, type)
  },
  clear( { commit } ) {
    commit('clear')
  }
}*/