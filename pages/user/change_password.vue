<template>
  <v-container>
  <v-alert v-model="alert" :type="type">{{message}}</v-alert>
  <v-row justify="center">
    <v-col cols="12" sm="8" md="8" lg="8" xl="8">
      <v-row justify="end">
        <v-btn class="mr-3" @click.stop="goHome">戻る</v-btn>
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
          パスワードの制限
          <ul>
            <li>使用できる文字の種類</li>
            <ul>
              <li>アルファベットの大文字と小文字</li>
              <li>数字</li>
              <li>ピリオド(.)、スラッシュ(/)、クエスチョンマーク(?)、ハイフン(-)、シャープ(#)</li>
            </ul>
            <li>文字数</li>
              <ul><li>8文字以上24文字以下</li></ul>

            <li>パスワードの制限</li>
              <ul>
                <li>大文字のアルファベットを少なくとも一つ含む</li>
                <li>記号を少なくとも一つ含む</li>
              </ul>
          </ul>
        </v-alert>
    </v-col>
  </v-row>
  <v-row justify="center">
    <v-col cols="12" sm="8" md="8" lg="8" xl="8">
        <v-form v-model="valid">
          <v-row>
            <v-text-field
              v-model="oldPassword"
              :rules="oldPasswordRules"
              label="古いパスワード"
              counter=24
              required
              full-width
              dense
              class="pl-3 pr-3"
            ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
              v-model="newPassword"
              :rules="newPasswordRules"
              label="新しいパスワード"
              counter=24
              required
              full-width
              dense
              class="pl-3 pr-3"
            ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
              v-model="confirmPassword"
              :rules="[(newPassword === confirmPassword) || 'パスワードが一致しません。']"
              label="パスワード再入力"
              counter=24
              required
              full-width
              dense
              class="pl-3 pr-3 mb-3"
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
  <v-overlay :value="progress">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </v-overlay>
  <v-overlay :value="change">
    <v-card light>
      <v-card-title class="text-h5 grey lighten-2">
        パスワードを変更しました。
      </v-card-title>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          light
          color="primary"
          text
          @click.stop="goHome"
        >
          OK
        </v-btn>
      </v-card-actions>
      </v-card>
  </v-overlay>

  </v-container>
</template>
<script>
import { Auth } from 'aws-amplify'
export default {
  data: () => ({
    alert: false,
    type: "error",
    message: "",
    valid: false,
    dialog: false,
    progress: false,
    change: false,
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    oldPasswordRules: [
      v => !!v || 'パスワードは必須です。'
    ],
    newPasswordRules: [
      v => !!v || 'パスワードは必須です。',
      v => /^(?=.*[A-Z])(?=.*[.?/#-])[a-zA-Z0-9.?/#-]{8,24}$/.test(v) || 'パスワードの形式が正しくありません。'
    ]
  }),
  methods:{
    async changePassword(){
      this.dialog = false
      this.progress = true
      try{
        const user = await Auth.currentAuthenticatedUser() // ログイン中のユーザー情報
        await Auth.changePassword(
          user, 
          this.oldPassword, // 現在のパスワード
          this.newPassword  // 新しいパスワード
        )
        this.progress = false
        this.change = true

      }catch(err){
        this.progress = false
        console.log(err)
        this.alert=true
        this.message = err
        
      }finally{
        this.goHome()
      }
      
    }
  }

}
</script>