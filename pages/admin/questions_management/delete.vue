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
      <v-row justify="end">
        <v-dialog
          v-model="dialog"
          width="500"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="mr-3" @click.stop="dialog = true">削除</v-btn>
          </template>

          <v-card>
          <v-card>
            <v-card-title class="text-h5 grey lighten-2">
              削除してよろしいですか？
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
                @click.stop="deleteData">削除</v-btn>
            </v-card-actions>
          </v-card>
          </v-card>
        </v-dialog>
      </v-row>
    </v-col>
  </v-row>
  </v-container>
</template>
<script lang="ts">
import { defineComponent, ref, useAsync, useContext, useRoute, useRouter } from '@nuxtjs/composition-api'
import { goPrevFactory } from '~/composables/helper'
export default defineComponent({
  setup(){
    const ctx:any = useContext()
    const route = useRoute()
    const router = useRouter()
    // data
    const home = "/admin/questions_management"
    const dialog = ref(false)
    const question_id = ref(route.value.query.question_id)
    // console.log("question_id", question_id.value)
    const questionsMaster = ref<any>({title:""})
    useAsync(async () =>{
      questionsMaster.value = await ctx.$questionsUtilitys.getQuestion(question_id.value)
    })
    const deleteData = async () => {
      dialog.value = false
      try{
        await ctx.$executer.executeWithExc(ctx.$questionsUtilitys.deleteQuestion, question_id.value)
        router.push("/admin/questions_management")
      }catch(err){
        console.log(err)
      }
    }
    return {
      dialog,
      question_id,
      questionsMaster,
      deleteData,
      goPrev: goPrevFactory(home)
    }
  }
})
</script>