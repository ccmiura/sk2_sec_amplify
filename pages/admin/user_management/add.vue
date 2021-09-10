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
    addUserPassword: "",
    confirmPassword: "",
    emailRules:[
      v => !!v || 'Ｅメールは必須です。',
      v => /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/.test(v) || 'emailの書式が正しくありません。'
    ],
    userNameRules: [v => !!v || '名前は必須です。'],
    show: false
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
      console.log(this.email, this.userName, this.addUserPassword, this.confirmPassword, this.valid)
      try{
        this.dialog = false
        this.progress = true
        const result = await this.$authUtilitys.addUser(this.email, this.userName)
        console.log(result)
        this.progress = false
      }catch(err){
        console.log(err)
        this.progress = false
      }
    }
  }
}
</script>