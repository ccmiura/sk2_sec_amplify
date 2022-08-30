<template>
  <v-container>
  <v-row justify="center">
    <v-col cols="12" sm="8" md="8" lg="8" xl="8">
      <v-row justify="end">
        <v-btn class="mr-3" @click.stop="$router.push('/admin/questions_management/add')">問題追加</v-btn>
        <v-btn class="mr-3" @click.stop="goPrev">戻る</v-btn>
      </v-row>
    </v-col>
  </v-row>
  <v-row justify="center">
    <v-col cols="12" sm="8" md="8" lg="8" xl="8">
      <v-simple-table>
        <template>
          <thead>
            <tr>
              <th>タイトル</th>
              <th class="text-center" style="font-size: 8pt;white-space: nowrap;">登録日</th>
              <th class="text-center" style="font-size: 8pt;white-space: nowrap;">削除</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in questions"
              :key="item.question_id">
              <td><nuxt-link :to="`/admin/questions_management/details?question_id=${item.question_id}`">{{item.title}}</nuxt-link></td>
              <td class="text-center" style="font-size: 8pt;white-space: nowrap;">{{item.createdAt.substr(0,10)}}</td>
              <td class="text-center"><v-icon @click.stop="$router.push(`/admin/questions_management/delete?question_id=${item.question_id}`)">mdi-delete</v-icon></td>
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
import { defineComponent, ref, useAsync, useContext } from '@nuxtjs/composition-api'
import { goPrevFactory, dataSliceFactory } from '~/composables/helper'
export default defineComponent({
  setup(){
    const ctx:any = useContext()
    // data
    const questions = ref([])
    const originData = ref([])
    const page = ref(1)
    const length = ref(0)
    const limit = ref(5)

    const dataSlice = dataSliceFactory(originData, length, limit, questions)
    useAsync(async () =>{
      try{
        originData.value = await ctx.$questionsUtilitys.getQuestionsMasterList()
        console.log(originData.value)
        dataSlice(page.value)
      }catch(e){
        console.log("error", e)
        throw e
      }
    })

    return {
      questions,
      page,
      length,
      limit,
      dataSlice,
      goPrev: goPrevFactory(""),
    }
  }
})
</script>