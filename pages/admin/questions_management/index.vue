<template>
  <v-container>
  <v-row justify="center">
    <v-col cols="12" sm="8" md="8" lg="8" xl="8">
      <v-row justify="end">
        <v-btn class="mr-3" @click.stop="goto('/admin/questions_management/add')">問題追加</v-btn>
        <v-btn class="mr-3" @click.stop="goHome">戻る</v-btn>
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
              <td class="text-center"><v-icon @click.stop="goto(`/admin/questions_management/delete?question_id=${item.question_id}`)">mdi-delete</v-icon></td>
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
<script>

export default {
  data: () => ({
    questions: [],
    page: 1,
    length: 0,
    limit: 5,
  }),
  async asyncData({$questionsUtilitys}){
    let tmp = []
    try{
      tmp = await $questionsUtilitys.getQuestionsMasterList()
      console.log(tmp)
    }catch(e){
      console.log("error", e)
      throw e
    }
    return {
      originData: tmp
    }

  },
  created(){
    this.dataSlice(this.page)
  },
  methods:{
    dataSlice(page){
      this.length = Math.floor(this.originData.length <= 5 ? 0: this.originData.length / this.limit) + 1
      let offset = (page > 0? page - 1: 0) * this.limit
      this.questions = this.originData.slice(offset, (offset + this.limit))
    }
  }
}
</script>