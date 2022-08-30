<template>
  <v-app style="box-sizing: border-box; background: #FFF3E0">
    <head>
      <title>{{pageTitle}}</title>
    </head>
    <v-app-bar
      fixed
      app
      color="primary"
    >
      <v-toolbar-title v-text="pageTitle" class="mr-6"/>
      <v-toolbar-title >{{name}}</v-toolbar-title>
      <v-spacer />
      <v-btn icon @click.stop="goHome">
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-btn icon @click.stop="signout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        
        <message />
        <Nuxt />
        <cprogress />
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
      color="primary"
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, reactive, useMeta, useStore, useRouter, ref, computed, onUpdated, SetupContext } from '@nuxtjs/composition-api'
import { Auth } from 'aws-amplify'

export default defineComponent({
  setup(){
    console.log("default created.")
    const store = useStore()
    const router = useRouter()
    //const {title} = useMeta()
    const userInfo = reactive(store.getters['userInfo/userInfo'])
    const fixed = ref(true)
    const name = ref(("name" in userInfo && userInfo.name != undefined) ? userInfo.name : userInfo.username)
    const home = ref("")
    //title.value = store.getters['title/title']
    console.log("name" in userInfo, name)
    const pageTitle = computed(() => {
      console.log("computed.pageTitle")
      return store.getters['title/title']
    })
    const signout = async () => {
      try {
        await Auth.signOut();
        store.commit('userInfo/remove') 
        router.push("/signin")
      } catch (error) {
        console.log(error);
      }
    }
    const goHome = () => {
      let tmpHome:string = ""
      if(home != undefined && home.value != ""){
        tmpHome = home.value
      }else{
        tmpHome = store.getters['userInfo/userInfo'].home
      }
      router.push(tmpHome)
    }
    //const setHeader = (value:string) => {
    //  title.value = value
    //}
    const clearMessage = () =>{
      store.commit("message/clear")
    }
    
    onUpdated(() =>{
      console.log("default.updated")
      clearMessage()
    })

    return {
      userInfo,
      fixed,
      //title,
      name,
      //setHeader,
      clearMessage,
      pageTitle,
      signout,
      goHome,
    };


  }
})
</script>
