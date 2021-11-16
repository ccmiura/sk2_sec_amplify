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
        <v-card><v-card-text class="text-no-wrap">{{questionsMaster.title}}</v-card-text></v-card>
    </v-col>
  </v-row>
  <v-row justify="center">
    <v-col cols="12" sm="8" md="8" lg="8" xl="8">
      
        <v-simple-table>
          <template>
            <thead>
              <tr>
                <th class="header_border_style text-center">No.</th>
                <th colspan="2" class="header_border_style text-center">内容</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(item, index) in questionsMaster.questions.items" >
              <tr :key="item.question_sub_id">
                <td class="period_border_style text-center" rowspan="3" >{{index + 1}}</td>
              </tr>
              <tr>
                <th class="text-center">問題</th><td class="text-left">{{item.question}}</td>
              </tr>
              <tr>
                <th class="period_border_style text-center">選択肢</th>
                <td class="period_border_style text-left">
                  <v-radio-group :name="`grp_${index+1}`" v-model="radioGroup[index]">
                    <v-radio class="ex_v-radio" v-for="(value, index2) in item.ans" :key="index2" :label="value" :value="index2 + 1"></v-radio>
                  </v-radio-group>
               </td>
              </tr>
              </template>
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
            <v-btn class="mr-3" :disabled="!valid" @click.stop="dialog = true">回答</v-btn>
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
<style>
.ex_v-radio .v-label {
  font-size: 0.875rem !important;
}
.ex_v-radio .v-icon.v-icon {
  font-size: 0.875rem !important;
}
.period_border_style {
  border-bottom: 3px solid rgba(0, 0, 0, 0.12) !important; 
}
.header_border_style {
  border-bottom: 3px double rgba(0, 0, 0, 0.12) !important; 
}
</style>
<script>
export default {
  data: () => ({
    radioGroup: [],
    dialog: false,
    valid: false,
  }),
  watch: {
    radioGroup: function (val) {
      console.log(val, val.length, this.valid)
      this.valid = this.questionsMaster.questions.items.length === val.length
    }
  },
  async asyncData({store, route, $questionsUtilitys, $userResultUtilitys}){
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
        status: correctAnswers === this.questionsMaster.questions.items.length? 2 : 1
      }
      console.log(ans)
      try {
        //const result = await this.$userResultUtilitys.upsertUserResult(ans)
        const result1 = await this.$executer.executeWithExc(this.$userResultUtilitys.upsertUserResult, ans)
        console.log(result1)
        const result2 = await this.$executer.executeWithExc(this.$userResultUtilitys.insertFirstUserResult, ans)
        console.log(result2)
        this.$router.push(`/user/result?question_id=${this.question_id}`)
      }catch(err){
        console.log(err)
      }
      

    }
  }
}
</script>