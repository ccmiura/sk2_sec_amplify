<template>
  <v-container>
  <v-row justify="center">
    <v-col cols="12" sm="8" md="8" lg="8" xl="8">
      <v-row justify="end">
        <v-btn class="mr-3" @click.stop="goto(`/admin/questions_management/user_result_list?question_id=${question_id}`)">ユーザー成績一覧</v-btn>
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
                <th class="header_border_style text-center">No.</th>
                <th colspan="2" class="header_border_style text-center">内容</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(item, index) in questionsMaster.questions.items" >
              <tr :key="item.question_sub_id">
                <td class="period_border_style text-center" rowspan="5">{{index + 1}}</td>
                
              </tr>
              <tr>
                <th class="text-center">問題文</th><td>{{item.question}}</td>
              </tr>
              <tr>
                <th class="text-center">回答群</th>
                <td class="text-left">
                  <ol>
                    <li v-for="(value, index2) in item.ans" :key="index2">{{value}}</li>
                  </ol>
                </td>
              </tr>
              <tr>
                <th class="text-center">正答</th>
                <td class="text-left">
                  <ol>
                    <li :value="item.correct"> {{item.ans[item.correct - 1]}}</li>
                  </ol>
                </td>
              </tr>
              <tr>
                <th class="period_border_style text-center">解説</th>
                <td class="period_border_style text-left">{{item.comment}}</td>
              </tr>
              </template>
            </tbody>
          </template>
        </v-simple-table>
    </v-col>
  </v-row>
  </v-container>
</template>
<style>
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
    home: "/admin/questions_management"
  }),
  async asyncData({route, $questionsUtilitys}){
    const question_id = route.query.question_id
    console.log("question_id", question_id)
    let data = {}
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

  }
}
</script>