<template>
<v-container>
  <v-row justify="center">
    <v-col cols="12" sm="8" md="8" lg="8" xl="8">
      <v-row justify="end">
        <v-btn class="mr-3" @click.stop="goto(`/admin/user_management/update?user_id=${user.user_id}`)">ユーザー情報更新</v-btn>
        <v-btn class="mr-3" @click.stop="goHome">戻る</v-btn>
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
<script>
export default ({
  data: () => ({
    home: "/admin/user_management",
    userInfo: {}
  }),
  async asyncData({route, $authUtilitys}){
    const user_id = route.query.user_id
    const {...rest } =  await $authUtilitys.getUser(user_id);
    
    console.log(rest)
    const user = {
      username: rest.Username,
      user_id: rest.Username,
      name: rest.UserAttributes.find(e => e.Name === 'name').Value,
      email: rest.UserAttributes.find(e => e.Name === 'email').Value,
    }
    
    return {
      user: user,
    }
  }

})
</script>
