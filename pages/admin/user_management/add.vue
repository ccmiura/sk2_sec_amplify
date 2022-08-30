<template>
  <v-container>
  <v-row justify="center">
    <v-col cols="12" sm="8" md="8" lg="8" xl="8">
      <v-row justify="end">
        <v-btn class="mr-3" @click.stop="inputClick">CSVで追加</v-btn>
        <v-btn class="mr-3" @click.stop="goPrev">戻る</v-btn>
      </v-row>
    </v-col>
  </v-row>
  <v-row justify="center">
    <v-col cols="12" sm="8" md="8" lg="8" xl="8">
      <v-form v-model="valid" ref="addform">
        <v-row>
          <v-text-field
            v-model="email"
            :rules="data.emailRules"
            label="E-MAIL"
            required
          ></v-text-field>
        </v-row>
        <v-row>
          <v-text-field
            v-model="userName"
            :rules="data.userNameRules"
            label="名前"
            :count=255
            required
          ></v-text-field>
        </v-row>
        <v-row>
          <v-text-field
            v-model="user_id"
            :rules="data.userIdRules"
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
<script lang="ts">
import {parse} from 'papaparse'
import { defineComponent, ref, reactive, useContext } from '@nuxtjs/composition-api'
import { goPrevFactory } from '~/composables/helper'
export default defineComponent({
  setup(props, setupContext){
    const ctx:any = useContext()
    // data
    const home = "/admin/user_management"
    const valid = ref(false)
    const dialog = ref(false)
    const csv = ref(false)
    const email = ref("")
    const userName = ref("")
    const user_id = ref("")
    const addUserPassword = ref("")
    const confirmPassword = ref("")
    const uploadfile = ref([])
    const data = reactive({
      emailRules:[
        (v:string) => !!v || 'Ｅメールは必須です。',
        (v:string) => /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/.test(v) || 'emailの書式が正しくありません。'
      ],
      userNameRules: [(v:string) => !!v || '名前は必須です。'],
      userIdRules:[
        (v:string) => /^[a-zA-Z0-9_.+-]*/.test(v) || 'ユーザー名に使用できるのは半角英数と記号のみです。'
      ],
    })
    const show = ref(false)
    const success = ref(false)
    const addform = ref<HTMLFormElement>()
    const multiInput = ref<HTMLInputElement>()

    // methods
    const callAddUser = async () =>{
      const addUser = async (email:string, user_id:string, userName:string) => {
        console.log(email, userName, user_id)
        if(user_id === ""){
          user_id = email.split('@')[0]
        }
        const result = await ctx.$executer.executeWithExc(ctx.$authUtilitys.addUser, email, user_id, userName)
        console.log(result)
      }
      dialog.value = false
      try{
        if(csv.value){
          uploadfile.value.forEach(async (element:any) => {
            await addUser(element.email, element.user_id, element.userName)
          })
          csv.value = false
        }else{
          console.log(email.value, userName.value, user_id.value, valid.value)
          await addUser(email.value, user_id.value, userName.value)
        }
        success.value = true

      }catch(err){
        console.log(err)
      }
    }
    const selectedFile = async () =>{
      const readFileAsync = (file:any) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = () => {
            resolve(reader.result)
          }
          reader.onerror = reject
          reader.readAsText(file)
        })
      }
      const file = (multiInput.value?.files as FileList)[0]
      if (!file) {
        return;
      }
      try {
        const content = await readFileAsync(file)
        uploadfile.value = parse(content, {header: true, skipEmptyLines: true}).data
        valid.value = true
        csv.value = true
      } catch (e) {
        console.log(e)
      }
    }
    const inputClick = () =>{
      multiInput.value?.click();
    }

    const clear = () => {
      addform.value?.reset()
      success.value = false
    }
    return {
      valid,
      dialog,
      csv,
      email,
      userName,
      user_id,
      addUserPassword,
      confirmPassword,
      uploadfile,
      data,
      show,
      success,
      multiInput,
      addform,
      callAddUser,
      selectedFile,
      inputClick,
      clear,
      goPrev: goPrevFactory(home)
    }
  }
})
</script>