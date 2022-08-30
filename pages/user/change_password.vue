<template>
  <v-container>
  <v-row justify="center">
    <v-col cols="12" sm="8" md="8" lg="8" xl="8">
      <v-row justify="end">
        <v-btn class="mr-3" @click.stop="goPrev">戻る</v-btn>
      </v-row>
    </v-col>
  </v-row>
  <v-row justify="center">
    <v-col cols="12" sm="8" md="8" lg="8" xl="8">
        <v-alert
          border="left"
          colored-border
          type="info"
          elevation="2"
          class="text-caption "
          width="100%"
        >
          パスワードの条件
          <ol>
            <li>パスワードの文字数制限: 8～128 文字</li>
            <li>大文字、小文字、数字、! @ # $ % ^ & * ( ) _ + - = [ ] { } | ' 記号の全ての文字タイプの組み合わせ</li>
            <li>AWSアカウント名またはEメールアドレスと同じでないこと</li>
          </ol>
        </v-alert>
    </v-col>
  </v-row>
  <v-row justify="center">
    <v-col cols="12" sm="8" md="8" lg="8" xl="8">
        <v-form v-model="valid">
          <v-row>
            <v-text-field
              v-model="oldPassword"
              :rules="[rules.required]"
              label="古いパスワード"
              counter=true
              required
              full-width
              dense
              class="pl-3 pr-3"
              type="password"
            ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
              v-model="newPassword"
              :rules="[rules.required, rules.minLength, rules.stringKind, 
              (newPassword != oldPassword) || '古いパスワードと同じパスワードは使用できません。',
              (userInfo.email != newPassword) || 'emailと同じパスワードは使用できません。']"
              label="新しいパスワード"
              counter=true
              required
              full-width
              dense
              class="pl-3 pr-3"
              type="password"
            ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
              v-model="confirmPassword"
              :rules="[(newPassword === confirmPassword) || 'パスワードが一致しません。']"
              label="パスワード再入力"
              counter=true
              required
              full-width
              dense
              class="pl-3 pr-3 mb-3"
              type="password"
            ></v-text-field>
          </v-row>
        </v-form>
    </v-col>
  </v-row>
  <v-row justify="center">
    <v-col cols="12" sm="8" md="8" lg="8" xl="8">
      <v-row justify="end">
        <v-dialog
          v-model="dialog"
          width="500"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="mr-3" :disabled="!valid" @click.stop="dialog = true">パスワード変更</v-btn>
          </template>
          <v-card>
            <v-card-title class="text-h5 grey lighten-2">
              変更してよろしいですか？
            </v-card-title>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                text
                @click.stop="dialog = false"
              >
                キャンセル
              </v-btn>
              <v-btn
                color="primary"
                text
                @click.stop="changePassword">パスワード変更</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </v-col>
  </v-row>
  <v-overlay :value="change">
    <v-card light>
      <v-card-title class="text-h5 grey lighten-2">
        パスワードを変更しました。
      </v-card-title>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn
          light
          color="primary"
          text
          class="mx-auto"
          @click.stop="goPrev"
        >
          OK
        </v-btn>
      </v-card-actions>
      </v-card>
  </v-overlay>

  </v-container>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, useContext, useStore, computed} from '@nuxtjs/composition-api'
import { Auth } from 'aws-amplify'
import { goPrevFactory } from '~/composables/helper'
const symbol = "!@#$%^&*()_+\\-=\\]\\[\\{\\}\\|\\.'";

/*const regex = new RegExp(
 `^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])|
 (?=.*[a-z])(?=.*[A-Z])(?=.*[${symbol}])|
 (?=.*[A-Z])(?=.*[0-9])(?=.*[${symbol}])|
 (?=.*[a-z])(?=.*[0-9])(?=.*[${symbol}]))[a-zA-Z0-9${symbol}]{8,128}$`);
*/
const regex = new RegExp(
 `^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[${symbol}]))[a-zA-Z0-9${symbol}]{8,128}$`);
export default defineComponent({
  setup(){
    const ctx:any = useContext()
    const store = useStore()
    //data 
    const alert = ref(false)
    const type = ref("error")
    const message = ref("")
    const valid = ref(false)
    const dialog = ref(false)
    const progress = ref(false)
    const change = ref(false)
    const oldPassword = ref("")
    const newPassword = ref("")
    const confirmPassword = ref("")
    const rules = reactive({
      required: (v:string) => !!v || 'パスワードは必須です。',
      minLength: (v:string) => v.length >= 8 || 'パスワードは8文字以上です',
      stringKind: (v:string) => regex.test(v) || 'パスワードの形式が正しくありません。',
    })
    const userInfo = computed(() => {return store.getters["userInfo/userInfo"]})
    const changePassword = async () =>{
      dialog.value = false
      store.commit("message/clear")
      store.commit("progress/on")
      try{
        const user = await Auth.currentAuthenticatedUser() // ログイン中のユーザー情報
        await Auth.changePassword(
          user, 
          oldPassword.value, // 現在のパスワード
          newPassword.value  // 新しいパスワード
        )
        store.commit("progress/off")
        change.value = true
      }catch(err:any){
        store.commit("progress/off")
        console.log(err)
        store.commit("message/putMessage", err.message)
      }
      
    }
    return {
      alert,
      type,
      message,
      valid,
      dialog,
      progress,
      change,
      oldPassword,
      newPassword,
      confirmPassword,
      rules,
      userInfo,
      changePassword,
      goPrev: goPrevFactory("")
    }
  }
  
})
</script>