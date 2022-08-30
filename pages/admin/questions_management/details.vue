<template>
  <v-container>
  <v-row justify="center">
    <v-col cols="12" sm="8" md="8" lg="8" xl="8">
      <v-row justify="end">
        <v-btn class="mr-3" @click.stop="$router.push(`/admin/questions_management/user_result_list?question_id=${question_id}`)">ユーザー成績一覧</v-btn>
        <v-btn class="mr-3" @click.stop="goPrev">戻る</v-btn>
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
                <td class="period_border_style text-center" rowspan="6">{{index + 1}}</td>
                
              </tr>
              <tr>
                <th class="text-center">問題文</th><td>{{item.question}}</td>
              </tr>
              <tr>
                <th class="text-center">回答群</th>
                <td class="text-left ex_kaitougun">
                  <ul>
                    <li v-for="(value, index2) in item.ans" :key="index2">{{value}}</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <th class="text-center">正答</th>
                <td class="text-left" style="text-indent: -1rem; padding-left: 2rem;">
                  {{item.ans[item.correct - 1]}}
                </td>
              </tr>
              <tr>
                <th class="text-center">解説</th>
                <td class="text-left">{{item.comment}}</td>
              </tr>
              <tr>
                <th class="period_border_style text-center">正解率</th>
                <td class="period_border_style text-left">{{Math.round(item.correctAnswerRate * 10000) / 100}}%</td>
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
.ex_kaitougun ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.ex_kaitougun ul li {
  text-indent: -1rem;
  padding-left: 1rem;
}
</style>
<script lang="ts">
import { defineComponent, ref, useAsync, useContext, useRoute } from '@nuxtjs/composition-api'
import { goPrevFactory} from '~/composables/helper'
export default defineComponent({
  setup(){
    const ctx:any = useContext()
    const route = useRoute()
    // data
    const home = "/admin/questions_management"
    const question_id = ref(route.value.query.question_id)
    const questionsMaster = ref({title:"", questions:[]})
    useAsync(async () => {
      console.log("question_id", question_id.value)
      let listAnswer:any[] = []
      try{
        let data = await ctx.$questionsUtilitys.getQuestion(question_id.value)
        let results = await ctx.$userResultUtilitys.getFirstUserResult_question_idIndex(question_id.value)
        const count = results.length
        data?.questions?.items.forEach((d:any) => listAnswer.push([]))
        results.forEach((result:any) => {
          result.answers.forEach((a:any, i:number) => listAnswer[i].push(a))
        })

        data.questions.items.forEach((item:any, index:number) =>{
          let tmp = listAnswer[index].filter((v:any) => v === item.correct)
          item["correctAnswerRate"] = count ? tmp.length / count : 0
        })
        questionsMaster.value = data  
      }catch(err){
        console.log(err)
      }
    })

    return {
      question_id,
      questionsMaster,
      goPrev: goPrevFactory(home),
    }
  }
})
</script>