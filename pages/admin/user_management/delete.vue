<template>
  <v-container>
  <v-row justify="center">
    <v-col cols="12" sm="8" md="8" lg="8" xl="8">
      <v-row justify="end">
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
  <v-overlay :value="progress">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </v-overlay>
  </v-container>
</template>
<script>
export default ({
  data: () => ({
    home: "/admin/user_management",
    dialog: false,
    progress: false,
    user: {}
  }),
  async asyncData({route, $authUtilitys}){
    const user_id = route.query.user_id
    const {...rest } =  await $authUtilitys.getUser(user_id);
    
    console.log(rest)
    const user = {
      user_id: rest.Username,
      name: rest.UserAttributes.find(e => e.Name === 'name').Value,
      email: rest.UserAttributes.find(e => e.Name === 'email').Value,
    }
    
    return {
      user: user,
    }
  },
  methods:{
    async deleteUser(){
      try{
        this.dialog = false
        this.progress = true
        const listUserResult = await this.$userResultUtilitys.getListUserResult(this.user.user_id)
        console.log(listUserResult)
        listUserResult.forEach(async e=> {
          await this.$userResultUtilitys.delUserResult(e.user_id, e.question_id)
        })
        const res = await this.$authUtilitys.deleteUser(this.user.user_id)
        console.log(res)
        this.progress = false
        this.$router.push("/admin/user_management")
      }catch(err){
        console.log(err)
        this.progress = false
        this.dialog = false
      }
    }
  }

})
</script>
