import { Auth } from 'aws-amplify'
import { Middleware, NuxtAppOptions } from '@nuxt/types'

const checkSignin:Middleware = async ({ redirect, route, app: {store} }: NuxtAppOptions) => {
  console.log("middleware auth")
  const userInfo = await Auth.currentUserInfo()
  if (route.path != "/signin" && !userInfo){
      redirect('/signin')
  }
}
export default checkSignin