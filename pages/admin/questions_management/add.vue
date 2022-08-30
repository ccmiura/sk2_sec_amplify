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
      <v-form v-model="valid">
        <v-text-field
          v-model="title"
          :rules="rules.titleRules"
          label="タイトル"
          required
        ></v-text-field>
      </v-form>
    </v-col>
  </v-row>
  <v-row justify="center">
    <v-col cols="12" sm="8" md="8" lg="8" xl="8">
      <v-file-input
        truncate-length="15"
        @change="loadFile"
        @click:clear="uploadfile = null; upload = false"
      ></v-file-input>
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
            <v-btn class="mr-3" :disabled="!(valid && upload)" @click.stop="dialog = true">アップロード</v-btn>
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
                @click.stop="createQuestionData">登録</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </v-col>
  </v-row>
  </v-container>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, useContext, useRouter } from '@nuxtjs/composition-api'
import { goPrevFactory } from '~/composables/helper'
import { v4 as uuidv4 } from 'uuid';
import Papa from 'papaparse'

export default defineComponent({
  setup(){
    const ctx:any = useContext()
    const router = useRouter()
    // data
    const home = "/admin/questions_management"
    const title = ref("")
    const rules = reactive({
      titleRules: [
        (v:string) => !!v || 'タイトルは必須項目です。',
      ]
    })
    const uploadfile = ref(null)
    const valid = ref(false)
    const upload = ref(false)
    const dialog = ref (false)
    const progress = ref(false)
    const alert = ref(false)
    const message = ref("")
    const type = ref("error")

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
    const loadFile = async (file:any) =>{
      try {
        const content = await readFileAsync(file)
        uploadfile.value = Papa.parse(content, {header: true, skipEmptyLines: true}).data
        upload.value = true
      } catch (e) {
        console.log(e)
      }
    }
    const createQuestionData = async () => {
      console.log(uploadfile.value)
      if(uploadfile.value != null){
        dialog.value = false
        console.log(uploadfile.value)
        const uuid = uuidv4()
        let res = null
        try{
          res = await ctx.$executer.executeWithExc(ctx.$questionsUtilitys.insertOp, uuid, title.value, uploadfile.value)
          console.log(res)
          upload.value = false
          router.push("/admin/questions_management")
        }catch(err){
          console.log(err)
        }
      }
    }


    return {
      home,
      title,
      rules,
      uploadfile,
      valid,
      upload,
      dialog,
      progress,
      alert,
      message,
      type,
      loadFile,
      createQuestionData,
      goPrev: goPrevFactory(home)
    }
  }
})
</script>