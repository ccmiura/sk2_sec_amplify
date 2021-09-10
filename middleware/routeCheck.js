import { Auth } from 'aws-amplify'

async function signOut(redirect){
  try {
    await Auth.signOut();
    redirect("/signin")
  } catch (error) {
    console.log(error);
  }
}

export default async ({ redirect, route, store }) => {
  console.log("routeCheck", route.path)
  const userInfo = await Auth.currentUserInfo()
  if (route.path != "/signin" && userInfo){
    //console.log(store)
    const userInfo = store.getters['userInfo/userInfo']
    //console.log(userInfo)
    if(!Object.keys(userInfo).length){
      console.log("no user info.")
      signOut(redirect)
    }else{
      console.log(route.path, route.path.indexOf("/admin"))
      if(route.path.indexOf("/admin") === 0 && userInfo.group != "admin"){
        console.log("no admin group.")
        signOut(redirect)
      }else if(route.path.indexOf("/user") === 0 && userInfo.group != "user"){
        console.log("no user group.")
        signOut(redirect)
      }
    }
  }
}