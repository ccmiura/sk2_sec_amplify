<template>
  <v-container>
  <v-row justify="center">
    <v-col cols="12" sm="8" md="8" lg="8" xl="8">
      <v-row justify="end">
        <v-btn class="mr-3" @click.stop="inputClick">CSVで追加</v-btn>
        <v-btn class="mr-3" @click.stop="goHome">戻る</v-btn>
      </v-row>
    </v-col>
  </v-row>
  <v-row justify="center">
    <v-col cols="12" sm="8" md="8" lg="8" xl="8">
      <v-form v-model="valid" ref="form">
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
                @click.stop="callAddUser">登録</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </v-col>
  </v-row>
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
    <input
      style="display: none"
      ref="multiInput"
      type="file"
      @change="selectedFile()"
    />
  </v-container>

  
</template>
<script>
import Papa from 'papaparse'
export default {
  data: () => ({
    home: "/admin/user_management",
    valid: false,
    dialog: false,
    csv: false,
    email: "",
    userName: "",
    user_id: "",
    addUserPassword: "",
    confirmPassword: "",
    uploadfile: [],
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
  methods:{
    async callAddUser(){
      this.dialog = false
      try{
        if(this.csv){
          await this.multiAddUser()
          this.csv = false
        }else{
          await this.singleAddUser()
        }
        this.success = true

      }catch(err){
        console.log(err)
      }
    },
    async singleAddUser(){
      console.log(this.email, this.userName, this.user_id, this.valid)
      await this.addUser(this.email, this.user_id, this.userName)
    },
    async multiAddUser(){
      this.uploadfile.forEach(async element => {
        await this.addUser(element.email, element.user_id, element.userName)
      })
    },
    async addUser(email, user_id, userName){
      console.log(email, userName, user_id)
      if(user_id === ""){
        user_id = email.split('@')[0]
      }
      const result = await this.$executer.executeWithExc(this.$authUtilitys.addUser, email, user_id, userName)
      console.log(result)
    },
    inputClick(){
      this.$refs.multiInput.click();
    },
    async selectedFile() {
      const file = this.$refs.multiInput.files[0]
      if (!file) {
        return;
      }
      try {
        const content = await this.readFileAsync(file)
        this.uploadfile = Papa.parse(content, {header: true, skipEmptyLines: true}).data
        this.valid = true
        this.csv = true
      } catch (e) {
        console.log(e)
      }
    },
    readFileAsync (file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => {
          resolve(reader.result)
        }
        reader.onerror = reject
        reader.readAsText(file)
      })
    },
    clear(){
      this.$refs.form.reset()
      this.success = false
    }
  }
}
</script>