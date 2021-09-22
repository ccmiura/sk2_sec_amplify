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
        <v-text-field
          v-model="title"
          :rules="titleRules"
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
<script>
import { v4 as uuidv4 } from 'uuid';
import Papa from 'papaparse'

export default {
  data: () => ({
    home: "/admin/questions_management",
    title: "",
    titleRules: [
        v => !!v || 'タイトルは必須項目です。',
    ],
    uploadfile: null,
    valid: false,
    upload: false,
    dialog: false,
    progress: false,
    alert: false,
    message: "",
    type: "error"

  }),
  methods:{
    async loadFile(file){
      try {
        const content = await this.readFileAsync(file)
        this.uploadfile = Papa.parse(content, {header: true, skipEmptyLines: true}).data
        this.upload = true
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
    async createQuestionData(){
      console.log(this.uploadfile)
      if(this.uploadfile != null){
        this.dialog = false
        console.log(this.uploadfile)
        const uuid = uuidv4()
        let res = null
        try{
          res = await this.$executer.executeWithExc(this.$questionsUtilitys.insertOp, uuid, this.title, this.uploadfile)
          console.log(res)
          this.upload = false
          this.$router.push("/admin/questions_management")
        }catch(err){
          console.log(err)
        }
      }
    },
  }
}
</script>