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
                <th>No.</th>
                <th colspan="4" >内容</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(item, index) in questionsMaster.questions.items" >
              <tr :key="item.question_sub_id">
                <td rowspan="4">{{index + 1}}</td>
                
              </tr>
              <tr>
                <th style="writing-mode: vertical-rl;text-align: center;">問題文</th><td colspan="3">{{item.question}}</td>
              </tr>
              <tr>
                <th style="writing-mode: vertical-rl;text-align: center;">回答群</th>
                <td>
                  <ol>
                    <li v-for="(value, index2) in item.ans" :key="index2">{{value}}</li>
                  </ol>
                </td>
                <th style="writing-mode: vertical-rl;text-align: center;">正答</th><td>{{item.correct}}. {{item.ans[item.correct - 1]}}</td>
              </tr>
              <tr>
                <th style="writing-mode: vertical-rl;text-align: center;">解説</th><td colspan="3">{{item.comment}}</td>
              </tr>
              </template>
            </tbody>
          </template>
        </v-simple-table>
    </v-col>
  </v-row>
  </v-container>
</template>
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