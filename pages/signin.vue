<template>
    <amplify-authenticator>
      <amplify-sign-in slot="sign-in" :form-fields.prop="formFields">
        <div slot="secondary-footer-content"></div>
      </amplify-sign-in>
      <div v-if="authState === 'signedin' && user">
        <div>Hello, {{user.username}}</div>
      </div>
    </amplify-authenticator>
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
        inputProps: { required: true, autocomplete: 'password' },
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
        


        const userInfo = {
          username: authData.username,
          name: "name" in authData.attributes ? authData.attributes.name : undefined
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
    console.log(document.querySelector("amplify-authenticator > amplify-sign-in").shadowRoot.querySelector("#password-hint"))
    const hint = document.querySelector("amplify-authenticator > amplify-sign-in").shadowRoot.querySelector("#password-hint")
    console.log("hint", hint)
    
    console.log("aaa", document.getElementById("password-hint"))
  },
  beforeUnmount() {
    this.unsubscribeAuth();
  }
}
</script>