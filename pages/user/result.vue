<template>
  <v-container>
  <v-row justify="center">
    <v-col cols="12" sm="8" md="8" lg="8" xl="8">
      <v-row justify="end">
        <v-btn class="mr-3" @click="goPrev">ホームへ</v-btn>
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
        <v-card>
          <v-row class="justify-content:space-evenly;">
            <v-spacer/>
            <v-col class="pa-0">
              <v-card-title style="white-space : nowrap;">{{point * 10}}点</v-card-title>
            </v-col>
            <v-col class="pa-0">
              <v-card-title style="white-space : nowrap;">{{passFail ? "合格": "不合格"}}</v-card-title>
            </v-col>
            <v-spacer/>
          </v-row>
        </v-card>
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
                  <th class="text-center">回答</th>
                    <td class="text-left ex_seito">
                      <ul class="pl-0">
                        <li :class="[(item.answer == item.correct) ? 'ex_seikai': 'ex_fuseikai', 'pl-4']">{{item.ans[item.answer-1]}}</li>
                      </ul>
                    </td>
                </tr>
                <tr :style="item.style">
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
<script lang="ts">
import { defineComponent, ref, useAsync, useContext, useRoute, useStore } from '@nuxtjs/composition-api'
import { API } from 'aws-amplify'
import { getUserResult } from '~/src/graphql/queries'
import { goPrevFactory } from '~/composables/helper'
export default defineComponent({
  setup(){
    const ctx:any = useContext()
    const store = useStore()
    const route = useRoute()
    // data
    const question_id = ref(route.value.query.question_id)
    const questionsMaster = ref<any>({title:""})
    const passFail = ref(false)
    const data = ref<any>([])
    const point = ref(0)
    
    useAsync(async ()=>{
      const user_id = store.getters['userInfo/userInfo'].user_id
      
      let promise_list = []
      
      try{
        promise_list.push(ctx.$questionsUtilitys.getQuestion(question_id.value))
        promise_list.push(API.graphql({query: getUserResult, variables: {question_id: question_id.value, user_id: user_id}}))
        const res = await Promise.all(promise_list)
        console.log(res)
        
        res[0].questions.items.forEach((e:any, i:number) => {
          const tmp = Object.assign({}, e)
          tmp["answer"] = res[1].data.getUserResult.answers[i]
          tmp["rightWrong"] = false
          tmp["style"] = "backgroundColor: #FFCDD2;"
          if(tmp["answer"] === tmp["correct"]){
            tmp["rightWrong"] = true
            tmp["style"] = "backgroundColor: #E8F5E9;"
            ++point.value
          }
          data.value.push(tmp)
        });
        questionsMaster.value = res[0]
        passFail.value = data.value.length === point.value

      }catch(err){
        console.log(err)
      }

    })
    const getBgColor = (ans:number, corr:number) => {
      if(ans === corr){
        return "backgroundColor: #E8F5E9;"
      }else{
        return "backgroundColor: #FFCDD2;"
      }
    }
    return {
      question_id,
      questionsMaster,
      passFail,
      data,
      point,
      getBgColor,
      goPrev: goPrevFactory("")
    }
  }
})
</script>