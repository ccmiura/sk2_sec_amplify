
async function execute(method, ...args){
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

async function executeWithExc(method, ...args){
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



export default ({ app, store }, inject) => {
  // Vue、コンテキスト、ストアに$hello(msg）を挿入します。
  inject('executer', 
    {
      execute: execute,
      executeWithExc: executeWithExc,
      store: store,
    }
  )
}