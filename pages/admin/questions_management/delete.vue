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
      <v-card><v-card-text>{{questionsMaster.title}}</v-card-text></v-card>
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
            <v-btn class="mr-3" @click.stop="dialog = true">削除</v-btn>
          </template>

          <v-card>
          <v-card>
            <v-card-title class="text-h5 grey lighten-2">
              削除してよろしいですか？
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
                @click.stop="deleteData">削除</v-btn>
            </v-card-actions>
          </v-card>
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
import { API, graphqlOperation } from 'aws-amplify'
import { getQuestionsMaster } from '~/src/graphql/queries'
import { deleteQuestionsMaster, deleteQuestionsSubMaster } from '~/src/graphql/mutations'

export default {
  data: () => ({
    home: "/admin/questions_management",
    alert: false,
    dialog: false,
    progress: false,
    message: "",
    type: "error"
  }),
  async asyncData({route, $questionsUtilitys}){
    const question_id = route.query.question_id
    console.log("question_id", question_id)
    const data = await $questionsUtilitys.getQuestion(question_id)
    return {
      questionsMaster: data,
      question_id: question_id
    }
  },
  methods:{
    async deleteData(){
      console.log(this.question_id)
      this.alert = false
      this.dialog = false
      this.progress = true
      
      try{
        await this.$questionsUtilitys.deleteQuestion(this.question_id)
        this.progress = false
        this.$router.push("/admin/questions_management")
      }catch(err){
        console.log(err)
        this.progress = false
        this.alert=true
        this.message = err
      }finally{
        
      }

    }
  }
}
</script>