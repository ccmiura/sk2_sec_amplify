import { Auth } from 'aws-amplify'

export default async ({ redirect, route, store }) => {
  console.log("middleware auth")
  const userInfo = await Auth.currentUserInfo()
  if (route.path != "/signin" && !userInfo){
      redirect('/signin')
  }
}
