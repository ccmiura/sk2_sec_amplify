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
              <th style="white-space: nowrap;">解答</th>
              <th style="white-space: nowrap;">正解</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item, index in data"
              :key="item.user_id">
              <td>{{index+1}}</td>
              <td>{{item.question}}</td>
              <td style="font-size: 8pt;">{{item.answer}}. {{item.ans[item.answer-1]}}</td>
              <td style="font-size: 8pt;">{{item.correct}}. {{item.ans[item.correct-1]}}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-col>
  </v-row>
  </v-container>
</template>
<script>
import { API } from 'aws-amplify'
import { getQuestionsMaster, getUserResult } from '~/src/graphql/queries'

export default {
  async asyncData({route, $questionsUtilitys}){
    const question_id = route.query.question_id
    const user_id = route.query.user_id
    console.log("question_id", question_id)
    console.log("user_id", user_id)
    let userResult = null
    let questionsMaster = null
    const promis_list = []
    try{
      promis_list.push($questionsUtilitys.getQuestion(question_id))
      promis_list.push(API.graphql({query: getUserResult, variables: {user_id: user_id, question_id: question_id}}))
      const result = await Promise.all(promis_list)
      console.log(result)
      questionsMaster = result[0]
      userResult = result[1].data.getUserResult
    }catch(err){
      console.log(err)
    }
    const data = []
    questionsMaster.questions.items.forEach((e, index) => {
      const temp = Object.assign({}, e)
      temp["answer"] = userResult.answers[index]
      data.push(temp)
    })
    return {
      home: `/admin/questions_management/user_result_list?question_id=${question_id}`,
      data: data,
      questionsMaster: questionsMaster,
      question_id: question_id
    }

  }
}
</script>