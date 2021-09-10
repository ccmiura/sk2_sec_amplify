<template>
  <v-container>
  <v-row justify="center">
    <v-col cols="12" sm="8" md="8" lg="8" xl="8">
      <v-row justify="end">
        <v-btn class="mr-3" @click="goHome">ホームへ</v-btn>
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
                <th>あなたの回答</th>
                <th>正解</th>
                <th>解説</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in data"
                :key="item.question_sub_id" :style="{backgroundColor: (item.ans === item.correct ? '#BBDEFB' : '#FFCDD2' ) }">
                <td>{{index + 1}}</td>
                <td>{{item.question}}</td>
                <td>{{item.ans}}</td>
                <td>{{item.correct}}</td>
                <td>{{item.comment}}</td>
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
  async asyncData({route, store}){
    const question_id = route.query.question_id
    const user_id = store.getters['userInfo/userInfo'].username
    console.log("question_id", question_id)
    console.log("user_id", user_id)
    let questionMaster = null
    const data = []
    let promise_list = []
    try{
      promise_list.push(API.graphql({query: getQuestionsMaster, variables: {question_id: question_id}}))
      promise_list.push(API.graphql({query: getUserResult, variables: {question_id: question_id, user_id: user_id}}))
      const res = await Promise.all(promise_list)
      console.log(res)
      res[0].data.getQuestionsMaster.questions.items.sort((a, b)=> a.question_sub_id - b.question_sub_id)
      res[0].data.getQuestionsMaster.questions.items.forEach((e, i) => {
        const tmp = Object.assign({}, e)
        tmp["ans"] = res[1].data.getUserResult.answers[i]
        data.push(tmp)
      });
      questionMaster = res[0].data.getQuestionsMaster

    }catch(err){
      console.log(err)
    }
    return {
      question_id: question_id,
      questionsMaster: questionMaster,
      data: data
    }

  }
}
</script>