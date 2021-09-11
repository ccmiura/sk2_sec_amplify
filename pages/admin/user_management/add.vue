<template>
  <v-container>
  <v-row justify="center">
    <v-col cols="12" sm="8" md="8" lg="8" xl="8">
      <v-row justify="end">
        <v-btn class="mr-3" @click.stop="goHome">戻る</v-btn>
      </v-row>
    </v-col>
  </v-row>
  <v-row justify="center">
    <v-col cols="12" sm="8" md="8" lg="8" xl="8">
      <v-form v-model="valid">
        <v-row>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-MAIL"
            required
          ></v-text-field>
        </v-row>
        <v-row>
          <v-text-field
            v-model="userName"
            :rules="userNameRules"
            label="名前"
            :count=255
            required
          ></v-text-field>
        </v-row>
        <v-row>
          <v-text-field
            v-model="user_id"
            :rules="userIdRules"
            label="ユーザーID"
            :count=255
            hint="未入力の場合メールアドレスのユーザー名を自動で設定します。"
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
            <v-btn class="mr-3" :disabled="!valid" @click.stop="dialog = true">登録</v-btn>
          </template>
          <v-card>
            <v-card-title class="text-h5 grey lighten-2">
              登録してよろしいですか？
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
                @click.stop="addUser">登録</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </v-col>
  </v-row>
  <v-overlay :value="progress">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </v-overlay>
  <v-dialog
    v-model="success"
    width="500"
  >
    <v-card>
      <v-card-title class="text-h5 grey lighten-2">
        ユーザーを追加しました。
      </v-card-title>
      <v-divider></v-divider>
      <v-card-actions class="pa-4">
        <v-row justify="center">
        <v-btn 
          color="primary"
          text
          @click.stop="clear">OK</v-btn>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    home: "/admin/user_management",
    valid: false,
    dialog: false,
    progress: false,
    email: "",
    userName: "",
    user_id: "",
    addUserPassword: "",
    confirmPassword: "",
    emailRules:[
      v => !!v || 'Ｅメールは必須です。',
      v => /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/.test(v) || 'emailの書式が正しくありません。'
    ],
    userNameRules: [v => !!v || '名前は必須です。'],
    userIdRules:[
      v => /^[a-zA-Z0-9_.+-]*/.test(v) || 'ユーザー名に使用できるのは半角英数と記号のみです。'
    ],
    show: false,
    success: false,
  }),
  mounted(){
    console.log("/admin/user_management/add mounted")
    console.log("valid", this.valid)
  },
  computed: {
    toggle () {
      const icon = this.show ? 'mdi-eye' : 'mdi-eye-off'
      const type = this.show ? 'text' : 'password'
      return { icon, type }
    }
  },
  methods:{
    async addUser(){
      console.log(this.email, this.userName, this.user_id, this.addUserPassword, this.confirmPassword, this.valid)
      if(this.user_id === ""){
        this.user_id = this.email.split('@')[0]
      }
      try{
        this.dialog = false
        this.progress = true
        const result = await this.$authUtilitys.addUser(this.email, this.user_id, this.userName)
        console.log(result)
        this.progress = false
        this.success = true
      }catch(err){
        console.log(err)
        this.progress = false
      }
    },
    clear(){
      this.email = ""
      this.userName = ""
      this.user_id = ""
      this.valid = false
      this.success = false
    }
  }
}
</script>