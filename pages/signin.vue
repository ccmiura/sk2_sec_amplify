<template>
<div>
  <amplify-auth-container>
    <amplify-authenticator>
      <amplify-sign-in slot="sign-in" :form-fields.prop="data.formFields">
        <div slot="secondary-footer-content"></div>
      </amplify-sign-in>
    </amplify-authenticator>
  </amplify-auth-container>
</div>  
</template>
<script lang="ts">
//import Vue, { PropOptions } from 'vue'
import { defineComponent, useStore, useRouter, reactive } from '@nuxtjs/composition-api'
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components'

interface UserInfo {
  username: string;
  user_id: string;
  name: string;
  email: string;
  home?: string;
  group?: string;
}
export default defineComponent({
  layout: 'signin',
  setup() {
    const store = useStore()
    const router = useRouter()
    const data = reactive(
    {formFields:
      [
      {
        type: 'username',
        label: 'ユーザー名(メールアドレス)*',
        placeholder: 'ユーザー名を入力',
        inputProps: { required: true, autocomplete: 'username' },
      },
      {
        type: 'password',
        label: 'パスワード*',
        placeholder: 'パスワードを入力',
        inputProps: { required: true, autocomplete: 'current-password' },
        hint: null
      }
    ]})
    onAuthUIStateChange((authState: any, authData: any) => {
      console.log(authState, authData)

      if (authState === AuthState.SignedIn && authData) {
        console.log("signin!!!!!!")
        // CognitoUserからJWTトークンを取得
        const jwt = authData.signInUserSession.accessToken.jwtToken

        /* .(ドット)で分割したうちの２つ目(ペイロード)に、
          Cognitoのユーザー情報が格納されている */
        const decoded: any = JSON.parse(window.atob(jwt.split('.')[1]))

        // groupsは配列で取得される
        const groups:string[] = decoded['cognito:groups']
        
        //console.log("hoge", authData, groups)

        const userInfo: UserInfo = {
          username: authData.username,
          user_id: authData.username,
          name: "name" in authData.attributes ? authData.attributes.name : undefined,
          email: authData.attributes.email,
          //home: "",
          //group: ""
        }
        const group = null
        if(groups != undefined && groups.findIndex((item:string) => item === 'admin') >= 0){
          userInfo['group'] = "admin"
          userInfo['home'] = "/admin"
        }else{
          userInfo['group'] = "user"
          userInfo['home'] = "/user"
        }
        console.log(userInfo)
        store.commit('userInfo/put', userInfo) 
        router.push(userInfo.home)
        
      }
    })
    console.log("return")
    return {
      data
    }
  }
})
</script>
