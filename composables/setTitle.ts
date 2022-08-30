import { useRoute, useMeta } from '@nuxtjs/composition-api'
interface TitleMap {
  [index: string]: string
}
const title_map:TitleMap = {
  "/admin": "管理者ポータル",
  "/admin/user_management": "ユーザー管理",
  "/admin/user_management/add": "ユーザー追加",
  "/admin/user_management/delete": "ユーザー削除",
  "/admin/user_management/details": "ユーザー詳細",
  "/admin/user_management/update": "ユーザー情報更新",
  "/admin/questions_management": "問題管理",
  "/admin/questions_management/details": "問題詳細",
  "/admin/questions_management/add": "問題追加",
  "/admin/questions_management/delete": "問題削除",
  "/admin/questions_management/user_result_list": "ユーザー成績一覧",
  "/admin/questions_management/user_result": "ユーザー成績詳細",
  "/user": "ユーザーポータル",
  "/user/answer": "問題回答",
  "/user/result": "結果＆解説",
  "/user/change_password": "パスワード変更",
}
export function setTitleName(){
  const route = useRoute()
  const {title} = useMeta()
  console.log("middleware title", route.value.path)
  
  let tmpTitle: string = "default"
  if(route.value.path in title_map){
    tmpTitle = title_map[route.value.path]
  }
  title.value = tmpTitle
}

