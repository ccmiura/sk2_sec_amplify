import { useRouter, useStore, useMeta, Ref } from '@nuxtjs/composition-api'

export function setHeaderTitle(){
  const store = useStore()
  const {title} = useMeta()
  title.value = store.getters['title/title']
}

export function goPrevFactory(orgPrev:string){
  const store = useStore()
  const router = useRouter()
  let tmpPrev:string = ""
  if(orgPrev != undefined && orgPrev != null && orgPrev != ""){
    tmpPrev = orgPrev
  }else{
    tmpPrev = store.getters['userInfo/userInfo'].home
  }
  return ():void => {router.push(tmpPrev)}
}

const passFailsStr = ["未実施", "不合格", "合格"]

export function statusString(status:number){
  console.log(status, passFailsStr[status])
  return passFailsStr[status]
}
export function runUrlEncode(str:string){
  return encodeURIComponent(str)
}

export function dataSliceFactory(originalData: Ref<any[]>, length: Ref<number>, limit: Ref<number>, data: Ref<any[]>){
  return (page:number) => {
    length.value = Math.floor(originalData.value.length / limit.value) + ((originalData.value.length % limit.value) > 0 ? 1: 0)
    let offset = (page > 0? page - 1: 0) * limit.value
    data.value = originalData.value.slice(offset, (offset + limit.value))
  }
}