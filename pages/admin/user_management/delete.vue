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
      <v-card>
      <v-simple-table>
        <template v-slot:default>
          <tbody>
            <tr>
              <td>username</td>
              <td>{{user.user_id}}</td>
            </tr>
            <tr>
              <td>名前</td>
              <td>{{user.name}}</td>
            </tr>
            <tr>
              <td>e-mail</td>
              <td>{{user.email}}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      </v-card>
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
                @click.stop="deleteUser">削除</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </v-col>
  </v-row>
  </v-container>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, useAsync, useContext, useRoute, useRouter, useStore } from '@nuxtjs/composition-api'
import { goPrevFactory } from '~/composables/helper'
export default defineComponent({
  setup(){
    const ctx:any = useContext()
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    // data
    const home = "/admin/user_management"
    const dialog = ref(false)
    const progress = ref(false)
    const user = reactive({
      user_id: "",
      name: "",
      email: "",
    })

    useAsync(async () =>{
      const user_id = route.value.query.user_id
      const {...rest } =  await ctx.$authUtilitys.getUser(user_id);
      
      console.log(rest)
      
      user.user_id = rest.Username
      user.name = rest.UserAttributes.find((e:any) => e.Name === 'name').Value
      user.email = rest.UserAttributes.find((e:any) => e.Name === 'email').Value
    })
    const deleteUser = async () => {
      try{
        dialog.value = false
        store.commit("message/clear")
        store.commit("progress/on")

        const listUserResult = await ctx.$userResultUtilitys.getListUserResult(user.user_id)
        console.log(listUserResult)
        listUserResult.forEach(async (e:any)=> {
          let tmpList = []
          tmpList.push(ctx.$userResultUtilitys.delUserResult(e.user_id, e.question_id))
          tmpList.push(ctx.$userResultUtilitys.delFirstUserResult(e.user_id, e.question_id))
          await Promise.all(tmpList)
        })
        const res = await ctx.$authUtilitys.deleteUser(user.user_id)
        console.log(res)
        store.commit("progress/off")
        router.push("/admin/user_management")
      }catch(err:any){
        console.log(err)
        store.commit("progress/off")
        store.commit("message/putMessage", {message:err.message, type:"error"})
        dialog.value = false
      }
    }
    return {
      home,
      dialog,
      progress,
      user,
      deleteUser,
      goPrev: goPrevFactory(home)
    }

  }
})
</script>
