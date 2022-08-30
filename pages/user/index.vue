<template>
  <v-container>
  <v-row justify="center">
    <v-col cols="12" sm="8" md="8" lg="8" xl="8">
      <v-row justify="end">
        <v-btn class="mr-3" @click.stop="$router.push('/user/change_password')">パスワード変更</v-btn>
      </v-row>
    </v-col>
  </v-row>
  <v-row justify="center">
    <v-col cols="12" sm="8" md="8" lg="8" xl="8">
      <v-simple-table>
        <template>
          <thead>
            <tr>
              <th class="text-center">タイトル</th>
              <th class="text-center">状態</th>
              <th class="text-center" style="font-size: 8pt;white-space: nowrap;">最終実施日</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in data"
              :key="item.question_id">
              <td class="">
                <div v-if="item.status <= 1"><nuxt-link :to="`/user/answer?question_id=${item.question_id}`">{{item.title}}</nuxt-link></div>
                <div v-else-if="item.status == 2"><nuxt-link :to="`/user/result?question_id=${item.question_id}`">{{item.title}}</nuxt-link></div>
                <div v-else>{{item.title}}</div>
              </td>
              <td class="text-center" style="font-size: 8pt;white-space: nowrap;">{{statusString(item.status)}}</td>
              <td class="text-center" style="font-size: 8pt;white-space: nowrap;">{{item.resultUpdatedAt.substr(0, 10)}}</td>
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
import { defineComponent, ref, useAsync, useContext, useStore } from '@nuxtjs/composition-api'
import { API, graphqlOperation } from 'aws-amplify'
import { listUserResults} from '~/src/graphql/queries'
import { statusString, goPrevFactory, dataSliceFactory } from '@/composables/helper'
export default defineComponent({
  setup(){
    const ctx:any = useContext()
    const store = useStore()
    // data
    const questions = ref([])
    const page = ref(1)
    const length = ref(0)
    const limit = ref(5)
    const data = ref<any>([])
    const originData = ref<any>([])

    const dataSlice = dataSliceFactory(originData, length, limit, data)
    useAsync(async ()=>{
      let tmp:any[] = []
      const promiseList = []
      const userInfo = store.getters['userInfo/userInfo']
      try{
        promiseList.push(ctx.$questionsUtilitys.getQuestionsMasterList())
        promiseList.push(API.graphql(graphqlOperation(listUserResults,{user_id: userInfo.user_id})))
        const result = await Promise.all(promiseList)
        console.log(result)
        result[0].forEach((element:any) => {
          const userResult = result[1].data.listUserResults.items.find((e:any) => e.question_id === element.question_id)
          if(userResult){
            element["status"] = userResult.status
            element["resultUpdatedAt"] = userResult.updatedAt
          }else{
            element["status"] = 0
            element["resultUpdatedAt"] = "--"
          }
          tmp.push(element)
        });
        originData.value = tmp
        dataSlice(page.value)
      }catch(e){
        console.log("error", e)
      }
    })
    return {
      questions,
      page,
      length,
      limit,
      data,
      dataSlice,
      statusString,
      goPrev: goPrevFactory(""),
    }
  }
})
</script>