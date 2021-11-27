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
                <th class="header_border_style text-center">No.</th>
                <th colspan="3" class="header_border_style text-center">内容</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(item, index) in data" >
                <tr :key="item.question_sub_id" :style="item.style">
                  <td rowspan="5" class="period_border_style text-center">{{index + 1}}</td>
                </tr>
                <tr :style="item.style">
                  <th class="text-center">問題文</th><td class="text-left">{{item.question}}</td>
                </tr>
                <tr :style="item.style">
                  <th class="text-center">正答</th>
                    <td class="text-left ex_seito">
                      <ul class="pl-0">
                        <li v-for="(a, i) in item.ans" :key="i" :class="[(i === (item.correct - 1)) ? 'ex_seikai':'ex_fuseikai', 'pl-4']">{{a}}</li>
                      </ul>
                    </td>
                </tr>
                <tr :style="item.style">
                  <th class="text-center">初回</th>
                    <td class="text-left ex_seito" :style="(item.firstAnswer == item.correct) ? 'backgroundColor: #E8F5E9': 'backgroundColor: #FFCDD2'">
                      <ul class="pl-0">
                        <li :class="[(item.firstAnswer == item.correct) ? 'ex_seikai': 'ex_fuseikai', 'pl-4']">{{item.ans[item.firstAnswer-1]}}</li>
                      </ul>
                    </td>
                </tr>
                <tr :style="item.style">
                  <th class="text-center period_border_style">最新</th>
                    <td class="text-left ex_seito period_border_style" :style="(item.answer == item.correct) ? 'backgroundColor: #E8F5E9': 'backgroundColor: #FFCDD2'">
                      <ul class="pl-0">
                        <li :class="[(item.answer == item.correct) ? 'ex_seikai': 'ex_fuseikai', 'pl-4']">{{item.ans[item.answer-1]}}</li>
                      </ul>
                    </td>
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
.ex_seito ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.ex_seito ul li {
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
import { getQuestionsMaster, getUserResult, getFirstUserResult } from '~/src/graphql/queries'

export default {
  async asyncData({route, $questionsUtilitys}){
    const question_id = route.query.question_id
    const user_id = route.query.user_id
    console.log("question_id", question_id)
    console.log("user_id", user_id)
    let userResult = null
    let questionsMaster = null
    let firstUserResult = null
    const promis_list = []
    try{
      promis_list.push($questionsUtilitys.getQuestion(question_id))
      promis_list.push(API.graphql({query: getUserResult, variables: {user_id: user_id, question_id: question_id}}))
      promis_list.push(API.graphql({query: getFirstUserResult, variables: {user_id: user_id, question_id: question_id}}))
      const result = await Promise.all(promis_list)
      console.log(result)
      questionsMaster = result[0]
      userResult = result[1].data.getUserResult
      firstUserResult = result[2].data.getFirstUserResult
      console.log(userResult, firstUserResult)
    }catch(err){
      console.log(err)
    }
    const data = []
    questionsMaster.questions.items.forEach((e, index) => {
      const temp = Object.assign({}, e)
      temp["answer"] = userResult.answers[index]
      temp["firstAnswer"] = firstUserResult.answers[index]
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