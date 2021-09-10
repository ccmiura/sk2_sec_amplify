<template>
<v-container>
  <v-row justify="center">
    <v-col cols="12" sm="8" md="8" lg="8" xl="8">
      <v-row justify="end">
        <v-btn class="mr-3" @click.stop="goto('/admin/user_management/add')">ユーザー追加</v-btn>
        <v-btn class="mr-3" @click.stop="goHome">戻る</v-btn>
      </v-row>
    </v-col>
  </v-row>
  <v-row justify="center">
    <v-col cols="12" sm="8" md="8" lg="8" xl="8">
      <v-card>
      <v-simple-table >
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">
                Name
              </th>
              <th class="text-left">
                delete
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in users"
              :key="item.Username"
            >
              <td><nuxt-link :to="`/admin/user_management/details?Username=${item.Username}`">{{ item.name }}</nuxt-link></td>
              <td><v-icon @click.stop="goto(`/admin/user_management/delete?Username=${item.Username}`)">mdi-delete</v-icon></td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      </v-card>
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
export default ({
  data: () =>({
    title: "ユーザー管理",
    users: [],
    page: 1,
    length: 0,
    limit: 5,
    
  }),
  async asyncData({$authUtilitys}){
    const rest =  await $authUtilitys.listUsersInGroup("user")
    console.log("rest", rest)
    const users = rest.Users.map((item) =>{
      let name = item.Attributes.find(e => e.Name === 'name')
      item['name'] = name.Value
      return item
    })
    return {
      originUsers: users,
    }
  },
  created(){
    this.dataSlice(this.page)
  },
  methods:{
    dataSlice(page){
      this.length = Math.floor(this.originUsers.length <= 5 ? 0: this.originUsers.length / this.limit) + 1
      let offset = (page > 0? page - 1: 0) * this.limit
      this.users = this.originUsers.slice(offset, (offset + this.limit))
    }
  }
})
</script>
