<template>
<v-container>
  <v-row justify="center">
    <v-col cols="12" sm="8" md="8" lg="8" xl="8">
      <v-row justify="end">
        <v-btn class="mr-3" @click.stop="$router.push('/admin/user_management/add')">ユーザー追加</v-btn>
        <v-btn class="mr-3" @click.stop="goPrev">戻る</v-btn>
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
              <td><nuxt-link :to="`/admin/user_management/details?user_id=${runUrlEncode(item.Username)}`">{{ item.name }}</nuxt-link></td>
              <td><v-icon @click.stop="$router.push(`/admin/user_management/delete?user_id=${runUrlEncode(item.Username)}`)">mdi-delete</v-icon></td>
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
<script lang="ts">
import { defineComponent, ref, useAsync, useContext } from '@nuxtjs/composition-api'
import { goPrevFactory, runUrlEncode, dataSliceFactory } from '~/composables/helper'
export default defineComponent({
  setup(){
    const ctx:any = useContext()
    const title = ref("ユーザー管理")
    const page = ref(1)
    const length = ref(0)
    const limit = ref(5)
    
    const users = ref([])
    const originUsers = ref([])

    const dataSlice = dataSliceFactory(originUsers, length, limit, users)

    useAsync( async () => {
      const rest = await ctx.$authUtilitys.listUsersInGroup("user")
      originUsers.value = rest.Users.map((item:any) =>{
        let name = item.Attributes.find((e:any) => e.Name === 'name')
        item['name'] = name.Value
        return item
      })
      dataSlice(page.value)
    })
    
    return {
      title,
      users,
      page,
      length,
      limit,
      originUsers,
      dataSlice,
      goPrev: goPrevFactory(""),
      runUrlEncode,
    }
  }
})
</script>
