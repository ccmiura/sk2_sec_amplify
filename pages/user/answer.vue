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
        <v-card><v-card-text>{{questionsMaster.title}}</v-card-text></v-card>
    </v-col>
  </v-row>
  <v-row justify="center">
    <v-col cols="12" sm="8" md="8" lg="8" xl="8">
      
        <v-simple-table>
          <template>
            <thead>
              <tr>
                <th>No.</th>
                <th>問題</th>
                <th>選択肢</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in questionsMaster.questions.items"
                :key="item.question_sub_id">
                <td>{{index + 1}}</td>
                <td>{{item.question}}</td>
                <td>
                  <v-radio-group :name="`grp_${index+1}`" v-model="radioGroup[index]">
                    <v-radio v-for="(value, index2) in item.ans" :key="index2" :label="value" :value="index2 + 1"></v-radio>
                  </v-radio-group>
               </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
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
            <v-btn class="mr-3" @click.stop="dialog = true">回答</v-btn>
          </template>

          <v-card>
          <v-card>
            <v-card-title class="text-h5 grey lighten-2">
              回答してよろしいですか？
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
                @click.stop="ans">回答</v-btn>
            </v-card-actions>
          </v-card>
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
    radioGroup: [],
    dialog: false,
  }),
  watch: {
    radioGroup: function (val) {
      console.log(val, val.length)
    }
  },
  async asyncData({route, $questionsUtilitys}){
    const question_id = route.query.question_id
    console.log("question_id", question_id)
    let data = null
    try{
      data = await $questionsUtilitys.getQuestion(question_id)
      console.log(data)
    }catch(err){
      console.log(err)
    }
    return {
      question_id: question_id,
      questionsMaster: data
    }

  },
  methods:{
    async ans(){
      this.dialog = false
      let correctAnswers = 0
      this.radioGroup.forEach((e, index)=>{
        if(this.questionsMaster.questions.items[index].correct === parseInt(e)){
          correctAnswers++
        }
      })
      let userInfo = this.$store.getters['userInfo/userInfo']
      let ans = {
        question_id: this.question_id,
        user_id: userInfo.user_id,
        name: userInfo.name,
        answers: this.radioGroup,
        correct_answers: correctAnswers,
        status: correctAnswers === this.radioGroup.length? 2 : 1
      }
      console.log(ans)
      try {
        const result = await this.$userResultUtilitys.upsertUserResult(ans)
        console.log(result)
        this.$router.push(`/user/result?question_id=${this.question_id}`)
      }catch(err){
        console.log(err)
      }
      

    }
  }
}
</script>