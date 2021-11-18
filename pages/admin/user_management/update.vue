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
            label="E-MAIL"
            required
            :rules="[rules.required, rules.email]"
          ></v-text-field>
        </v-row>
        <v-row>
          <v-text-field
            v-model="userName"
            :rules="[rules.required]"
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
  </v-container>
</template>
<script>

export default {
  data: () => ({
    valid: false,
    dialog: false,
    email: "",
    userName: "",
    rules:{
      required: v => !!v || '必須項目です。',
      email: v => /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/.test(v) || 'emailの書式が正しくありません。'
    },
  }),
  async asyncData({route, $authUtilitys}){
    const user_id = route.query.user_id
    const {...rest } =  await $authUtilitys.getUser(user_id);
    
    console.log(rest)
    const user = {
      user_id: rest.Username,
      name: rest.UserAttributes.find(e => e.Name === 'name').Value,
      email: rest.UserAttributes.find(e => e.Name === 'email').Value,
    }
    const urlUser_id = encodeURIComponent(user.user_id)
    
    return {
      home: `/admin/user_management/details?user_id=${urlUser_id}`,
      user: user,
      email: user.email,
      userName: user.name
    }
  },
  mounted(){
    console.log("/admin/user_management/add mounted")
    console.log("valid", this.valid)
  },
  methods:{
    async updateUser(){
      console.log(this.email, this.userName, this.addUserPassword, this.confirmPassword, this.valid)
      this.alert = false
      if(this.email != this.user.email || this.userName != this.user.name){
        try{
          this.dialog = false
          const result = await this.$executer.executeWithExc(this.$authUtilitys.updateUser, this.user.user_id, this.email, this.userName)
          //const result = await this.$authUtilitys.updateUser(this.user.user_id, this.email, this.userName)
          console.log(result)
          this.$store.commit('userInfo/update', this.email, this.userName) 
        }catch(err){
          console.log(err)
          this.dialog = false
        }
      }else{
        this.$store.commit('message/putMessage', "変更箇所がないため更新できません。", "warning") 
        this.dialog = false
      }
    }
  }
}
</script>