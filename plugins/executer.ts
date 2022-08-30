import { NuxtAppOptions, Plugin,  } from '@nuxt/types'
import { Store } from 'vuex'

class Execute {

  store: Store<any>

  constructor(store: Store<any>) {
    this.store = store
  }

  async execute(method:any, ...args:any){
    this.store.commit("message/clear")
    this.store.commit("progress/on")
    let res = null
    try{
      res = await method(...args)
    }catch(err){
      console.log(err)
      this.store.commit("message/putMessage", err)
    }finally{
      this.store.commit("progress/off")
    }
    return res
  }

  async executeWithExc(method:any, ...args:any){
    console.log(this.store)
    this.store.commit("message/clear")
    this.store.commit("progress/on")
    let res = null
    try{
      res = await method(...args)
    }catch(err){
      console.log(err)
      this.store.commit("message/putMessage", err)
      throw err
    }finally{
      this.store.commit("progress/off")
    }
    return res
  }

}

const executer: Plugin = ({store}, inject) => {
  console.log("executer plugin", store)
  const ex = new Execute(store)
  // Vue、コンテキスト、ストアに$hello(msg）を挿入します。
  inject('executer', 
    {
      execute: ex.execute,
      executeWithExc: ex.executeWithExc,
      store: ex.store,
    }
  )
}
export default executer
