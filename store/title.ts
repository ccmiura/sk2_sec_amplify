import { Module, VuexModule, Mutation } from 'vuex-module-decorators'

@Module({
  name: "title",
  namespaced: true,
  stateFactory: true
})

export default class Title extends VuexModule{
  public titleState ={
    title: "default"
  }
  
  @Mutation
  public put(title: string){
    this.titleState.title = title
  }
  @Mutation
  public remove(){
    Object.assign(this.titleState, {title: "default"})
  }

  public get title(){return this.titleState.title}
}

/*
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
}*/