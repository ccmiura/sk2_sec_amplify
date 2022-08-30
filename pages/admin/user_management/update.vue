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
      <v-form v-model="valid">
        <v-row>
          <v-text-field
            v-model="email"
            label="E-MAIL"
            required
            :rules="[data.rules.required, data.rules.email]"
          ></v-text-field>
        </v-row>
        <v-row>
          <v-text-field
            v-model="userName"
            :rules="[data.rules.required]"
            label="名前"
            :count=255
            required
          ></v-text-field>
        </v-row>
      </v-form>
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
            <v-btn class="mr-3" :disabled="!valid" @click.stop="dialog = true">更新</v-btn>
          </template>
          <v-card>
            <v-card-title class="text-h5 grey lighten-2">
              更新してよろしいですか？
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
                @click.stop="updateUser">更新</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </v-col>
  </v-row>
  </v-container>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, useAsync, useContext, useRoute, useStore, onMounted } from '@nuxtjs/composition-api'
import { goPrevFactory } from '~/composables/helper'
export default defineComponent({
  setup(){
    const route = useRoute()
    const ctx:any = useContext()
    console.log(ctx)
    const store = useStore()
    const valid = ref(false)
    const dialog = ref(false)
    const email = ref("")
    const userName = ref("")
    const data = reactive(
      {
        rules:{
          required: (v:string) => !!v || '必須項目です。',
          email: (v:string) => /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/.test(v) || 'emailの書式が正しくありません。'
        },
        user:{
          user_id: "",
          name: "",
          email: "",
        }
      }
    )
    const user_id:string = route.value.query.user_id as string
    const home = `/admin/user_management/details?user_id=${encodeURIComponent(user_id)}`

    useAsync(async () =>{
      const {...rest } =  await ctx.$authUtilitys.getUser(user_id);
      
      console.log(rest)
      const user = {
        user_id: rest.Username,
        name: rest.UserAttributes.find((e:any) => e.Name === 'name').Value,
        email: rest.UserAttributes.find((e:any) => e.Name === 'email').Value,
      }
      data.user = user
      email.value = user.email
      userName.value = user.name

    })
    const updateUser = async () => {
      console.log(email.value, userName.value, valid.value)
      //this.alert = false
      if(email.value != data.user.email || userName.value != data.user.name){
        try{
          dialog.value = false
          const result = await ctx.$executer.executeWithExc(ctx.$authUtilitys.updateUser, data.user.user_id, email.value, userName.value)
          //const result = await this.$authUtilitys.updateUser(this.user.user_id, this.email, this.userName)
          console.log(result)
          store.commit('userInfo/update', {email:email.value, name:userName.value}) 
        }catch(err){
          console.log(err)
          dialog.value = false
        }
      }else{
        store.commit('message/putMessage', {message:"変更箇所がないため更新できません。", type:"warning"}) 
        dialog.value = false
      }
    }
    onMounted(() =>{
      console.log("/admin/user_management/add mounted")
      console.log("valid", valid.value)
    })

    return {
      valid,
      dialog,
      email,
      userName,
      data,
      home,
      updateUser,
      goPrev: goPrevFactory(home)
    }
  }
})
</script>