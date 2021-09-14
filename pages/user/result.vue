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
                <th class="text-center">No.</th>
                <th class="text-center">問題</th>
                <th class="text-center">あなたの回答</th>
                <th class="text-center">正解</th>
                <th class="text-center">解説</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in data"
                :key="item.question_sub_id" :style="{backgroundColor: (item.answer === item.correct ? '#BBDEFB' : '#FFCDD2' ) }">
                <td>{{index + 1}}</td>
                <td>{{item.question}}</td>
                <td>{{item.answer}}. {{item.ans[item.answer-1]}}</td>
                <td>{{item.correct}}. {{item.ans[item.correct-1]}}</td>
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
import { getUserResult } from '~/src/graphql/queries'

export default {
  async asyncData({route, store, $questionsUtilitys}){
    const question_id = route.query.question_id
    const user_id = store.getters['userInfo/userInfo'].user_id
    console.log("question_id", question_id)
    console.log("user_id", user_id)
    let questionMaster = null
    const data = []
    let promise_list = []
    try{
      promise_list.push($questionsUtilitys.getQuestion(question_id))
      promise_list.push(API.graphql({query: getUserResult, variables: {question_id: question_id, user_id: user_id}}))
      const res = await Promise.all(promise_list)
      console.log(res)
      res[0].questions.items.forEach((e, i) => {
        const tmp = Object.assign({}, e)
        tmp["answer"] = res[1].data.getUserResult.answers[i]
        data.push(tmp)
      });
      questionMaster = res[0]

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