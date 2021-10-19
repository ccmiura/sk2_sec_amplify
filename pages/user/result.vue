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
                <th class="header_border_style text-center">No.</th>
                <th colspan="4" class="header_border_style text-center">内容</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(item, index) in data" >
                <tr :key="item.question_sub_id" :style="getBgColor(item.answer, item.correct)">
                  <td rowspan="5" class="period_border_style text-center">{{index + 1}}</td>
                  <td class="pl-1 pr-1 period_border_style" rowspan="5">
                    <v-icon class="pl-0 pr-0" large v-if="item.answer === item.correct" color="green darken-2">mdi-checkbox-blank-circle-outline</v-icon>
                    <v-icon large v-else color="red darken-2">mdi-close</v-icon>
                  </td>
                </tr>
                <tr :style="getBgColor(item.answer, item.correct)">
                  <th class="text-center">問題文</th><td class="text-left">{{item.question}}</td>
                </tr>
                <tr :style="getBgColor(item.answer, item.correct)">
                  <th class="text-center">正答</th>
                    <td class="text-left">
                      <ul class="pl-0">
                        <li v-for="(a, i) in item.ans" :key="i" :class="[(i === (item.correct - 1)) ? 'ex_seikai':'ex_fuseikai', 'pl-4']">{{a}}</li>
                      </ul>
                    </td>
                </tr>
                <tr :style="getBgColor(item.answer, item.correct)">
                  <th class="text-center">回答</th><td class="text-left">{{item.answer}}. {{item.ans[item.answer-1]}}</td>
                </tr>
                <tr :style="getBgColor(item.answer, item.correct)">
                  <th class="period_border_style text-center" >解説</th><td class="period_border_style text-left">{{item.comment}}</td>
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
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
ul li {
  position: relative;
  padding: 0 0 0 2em;
  margin: 0;
}
.ex_seikai::before {
  position: absolute;
  left: 0;
  font-family: "Material Design Icons";
  content: "\F0766";
  color: #388E3C;
}
.ex_fuseikai::before {
  position: absolute;
  left: 0;
  font-family: "Material Design Icons";
  content: "\F0156";
  color: #D32F2F;
}
</style>
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

  },
  methods:{
    getBgColor(ans, corr) {
      if(ans === corr){
        return "backgroundColor: #E8F5E9;"
      }else{
        return "backgroundColor: #FFCDD2;"
      }
    }
  }
}
</script>