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
      <v-card><v-card-text>{{questionsMaster.title}}</v-card-text></v-card>
    </v-col>
  </v-row>
  <v-row justify="center">
    <v-col cols="12" sm="8" md="8" lg="8" xl="8">
      <v-simple-table>
        <template>
          <thead>
            <tr>
              <th class="text-center">名前</th>
              <th class="text-center">正当数</th>
              <th class="text-center">状態</th>
              <th class="text-center" style="font-size: 8pt;white-space: nowrap;">最終実施日</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in data"
              :key="item.user_id">
              <td>
                <div v-if="item.status > 0">
                  <nuxt-link :to="`/admin/questions_management/user_result?question_id=${item.question_id}&user_id=${runUrlEncode(item.user_id)}`">{{item.name}}</nuxt-link>
                </div>
                <div v-else>
                  {{item.name}}
                </div>
              </td>
              <td class="text-center">{{item.correct_answers}}</td>
              <td class="text-center" style="font-size: 8pt;white-space: nowrap;">{{statusString(item.status)}}</td>
              <td class="text-center" style="font-size: 8pt;white-space: nowrap;">{{item.updatedAt.substr(0, 10)}}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <template>
        <div class="text-center">
          <v-pagination
            v-model="page"
            :length="length"
            @input="dataSlice"
          ></v-pagination>
        </div>
      </template>
    </v-col>
  </v-row>
  </v-container>
</template>
<script lang="ts">
import { API } from 'aws-amplify'
import { question_idIndexKey } from '~/src/graphql/queries'
import { defineComponent, ref, useAsync, useContext, useRoute } from '@nuxtjs/composition-api'
import { statusString, goPrevFactory, runUrlEncode, dataSliceFactory } from '@/composables/helper'
export default defineComponent({
  head:{},
  setup(){
    const route = useRoute()
    const ctx:any = useContext()
    // data
    const page = ref(1)
    const length = ref(0)
    const limit = ref(5)
    const originalData = ref<any[]>([])
    const data = ref<any[]>([])
    const question_id = ref(route.value.query.question_id)
    const questionsMaster = ref<any>({title:"", questions:[]})
    const home = `/admin/questions_management/details?question_id=${question_id.value}`

    const dataSlice = dataSliceFactory(originalData, length, limit, data)

    useAsync(async () =>{
      
      console.log("question_id", question_id.value)
      const promiseList = []
      const tmpData:any[] = []
      try{
        promiseList.push(ctx.$questionsUtilitys.getQuestion(question_id.value))
        promiseList.push(API.graphql({query: question_idIndexKey, variables: {question_id: question_id.value}}))
        promiseList.push(ctx.$authUtilitys.listUsersInGroup("user"))

        const result = await Promise.all(promiseList)
        console.log(result)
        questionsMaster.value = result[0]
        
        result[2].Users.forEach((element:any) => {
          
          let userResult = result[1].data.question_idIndexKey.items.find((e:any) => e.user_id === element.Username)
          if(userResult == undefined || userResult == null){
            userResult = {
              name: element.Attributes.find((e:any) => e.Name === 'name').Value,
              user_id: element.username,
              correct_answers: 0,
              status: 0,
              updatedAt: "--"
            }
          }
          tmpData.push(userResult)
        })
        originalData.value = tmpData
        dataSlice(page.value)
      }catch(err){
        console.log(err)
      }
    })
    return {
      page,
      length,
      limit,
      //home,
      question_id,
      questionsMaster,
      originalData,
      data,
      dataSlice,
      statusString,
      goPrev: goPrevFactory(home),
      runUrlEncode,
    }
  }
  /*data: () => ({
    page: 1,
    length: 0,
    limit: 5,
    data: [],

  }),*/
})
</script>