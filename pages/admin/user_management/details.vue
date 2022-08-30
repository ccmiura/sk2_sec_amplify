<template>
<v-container>
  <v-row justify="center">
    <v-col cols="12" sm="8" md="8" lg="8" xl="8">
      <v-row justify="end">
        <v-btn class="mr-3" @click.stop="$router.push(`/admin/user_management/update?user_id=${runUrlEncode(user.user_id)}`)">ユーザー情報更新</v-btn>
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
</v-container>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, useAsync, useContext, useRoute } from '@nuxtjs/composition-api'
import { runUrlEncode, goPrevFactory } from '~/composables/helper'
/*interface User {
  username: string,
  user_id: string,
  name: string,
  email: string,
}*/
export default defineComponent({
  
  setup(){
    const ctx:any = useContext()
    const route:any = useRoute()
    const home = "/admin/user_management"
    console.log(route.value)
    const user_id = route.value.query.user_id
    let user = ref({})
    useAsync( async () => {
      const {...rest } =  await ctx.$authUtilitys.getUser(user_id);
      
      console.log(rest)
      user.value = reactive({
          username: rest.Username,
          user_id: rest.Username,
          name: rest.UserAttributes.find((e:any) => e.Name === 'name').Value,
          email: rest.UserAttributes.find((e:any) => e.Name === 'email').Value,
      })
    })
    return {
      user,
      runUrlEncode,
      goPrev: goPrevFactory(home),
    }

  }
})
</script>
