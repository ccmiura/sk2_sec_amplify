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
            <v-btn class="mr-3" :disabled="!valid" @click.stop="dialog = true">更新</v-btn>
          </template>
          <v-card>
            <v-card-title class="text-h5 grey lighten-2">
              更新してよろしいですか？
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
                @click.stop="updateUser">更新</v-btn>
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
    valid: false,
    dialog: false,
    progress: false,
    email: "",
    userName: "",
    emailRules:[
      v => !!v || 'Ｅメールは必須です。',
      v => /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/.test(v) || 'emailの書式が正しくありません。'
    ],
    userNameRules: [v => !!v || '名前は必須です。'],
    show: false,
    type: "error",
    message: "",
    alert: false
  }),
  async asyncData({route, $authUtilitys}){
    const username = route.query.Username
    const {...rest } =  await $authUtilitys.getUser(username);
    
    console.log(rest)
    const user = {
      username: rest.Username,
      name: rest.UserAttributes.find(e => e.Name === 'name').Value,
      email: rest.UserAttributes.find(e => e.Name === 'email').Value,
    }
    
    return {
      home: `/admin/user_management/details?Username=${user.username}`,
      user: user,
      email: user.email,
      userName: user.name
    }
  },
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
    async updateUser(){
      console.log(this.email, this.userName, this.addUserPassword, this.confirmPassword, this.valid)
      this.alert = false
      if(this.email != this.user.email || this.userName != this.user.name){
        try{
          this.dialog = false
          this.progress = true
          const result = await this.$authUtilitys.updateUser(this.user.username, this.email, this.userName)
          console.log(result)
          this.progress = false
        }catch(err){
          console.log(err)
          this.progress = false
          this.dialog = false
          this.alert = true
          this.type = "error"
          this.message = err
        }
      }else{
        this.dialog = false
        this.alert = true
        this.type = "warning"
        this.message = "変更箇所がないため更新できません。"
      }
    }
  }
}
</script>