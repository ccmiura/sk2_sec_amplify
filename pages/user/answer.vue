<template>
  <v-container>
  <v-row justify="center">
    <v-col cols="12" sm="8" md="8" lg="8" xl="8">
      <v-row justify="end">
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
<script lang="ts">
import { defineComponent, ref, useAsync, useContext, useRoute, useRouter, useStore, watch } from '@nuxtjs/composition-api'
import { goPrevFactory } from '~/composables/helper'
export default defineComponent({
  setup(){
    const ctx:any = useContext()
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    // data
    const radioGroup = ref([])
    const dialog = ref(false)
    const valid = ref(false)
    const question_id = ref(route.value.query.question_id)
    const questionsMaster = ref<any>({title:"", questions: []})

    watch(radioGroup, (val:string[]) => {
      console.log(val, val.length, valid.value)
      valid.value = questionsMaster.value.questions.items.length === val.length
    },  { deep: true},)

    useAsync(async () => {
      try{
        questionsMaster.value = await ctx.$questionsUtilitys.getQuestion(question_id.value)
        console.log(questionsMaster.value)
      }catch(err){
        console.log(err)
      }
    })
    const ans = async () =>{
      dialog.value = false
      let correctAnswers = 0
      radioGroup.value.forEach((e:any, index:number)=>{
        if(questionsMaster.value.questions.items[index].correct === parseInt(e)){
          correctAnswers++
        }
      })
      let userInfo = store.getters['userInfo/userInfo']
      let tmpAns = {
        question_id: question_id.value,
        user_id: userInfo.user_id,
        name: userInfo.name,
        answers: radioGroup.value,
        correct_answers: correctAnswers,
        status: correctAnswers === questionsMaster.value.questions.items.length? 2 : 1
      }
      //console.log(tmpAns)
      try {
        //const result = await this.$userResultUtilitys.upsertUserResult(ans)
        const result1 = await ctx.$executer.executeWithExc(ctx.$userResultUtilitys.upsertUserResult, tmpAns)
        //console.log(result1)
        const result2 = await ctx.$executer.executeWithExc(ctx.$userResultUtilitys.insertFirstUserResult, tmpAns)
        //console.log(result2)
        router.push(`/user/result?question_id=${question_id.value}`)
      }catch(err){
        console.log(err)
      }
    }

    return {
      radioGroup,
      dialog,
      valid,
      question_id,
      questionsMaster,
      ans,
      goPrev: goPrevFactory("")
    }
  }

})
</script>