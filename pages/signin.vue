<template>
  <amplify-auth-container>
    <amplify-authenticator>
      <amplify-sign-in slot="sign-in" :form-fields.prop="formFields">
        <div slot="secondary-footer-content"></div>
      </amplify-sign-in>
    </amplify-authenticator>
  </amplify-auth-container>
</template>
<script>
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components'
export default {
  layout: 'signin',
  data : ()=>({
    user: undefined,
    authState: undefined,
    unsubscribeAuth: undefined,
    formFields: [
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
    ]

    
  }),
  async created() {
    this.unsubscribeAuth = onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      this.user = authData;

      console.log(authState, authData)

      if (authState === AuthState.SignedIn && authData) {
        console.log("signin!!!!!!")
        // CognitoUserからJWTトークンを取得
        const jwt = authData.signInUserSession.accessToken.jwtToken

        /* .(ドット)で分割したうちの２つ目(ペイロード)に、
          Cognitoのユーザー情報が格納されている */
        const decoded = JSON.parse(window.atob(jwt.split('.')[1]))

        // groupsは配列で取得される
        const groups = decoded['cognito:groups']
        
        //console.log("hoge", authData, groups)

        const userInfo = {
          username: authData.username,
          user_id: authData.username,
          name: "name" in authData.attributes ? authData.attributes.name : undefined,
          email: authData.attributes.email
        }
        const group = null
        if(groups != undefined && groups.findIndex(item => item === 'admin') >= 0){
          userInfo['group'] = "admin"
          userInfo['home'] = "/admin"
        }else{
          userInfo['group'] = "user"
          userInfo['home'] = "/user"
        }
        console.log(userInfo)
        this.$store.commit('userInfo/put', userInfo) 
        this.$router.push(userInfo.home)
        
      }
    })
  },
  mounted(){
  },
  beforeUnmount() {
    this.unsubscribeAuth();
  }
}
</script>