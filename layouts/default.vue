<template>
  <v-app style="box-sizing: border-box; background: #FFF3E0">
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
        <Nuxt />
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

<script>
import { Auth } from 'aws-amplify'
export default {
  data: () => (
    {
      userInfo: {},
      fixed: true,
      title: "default",
      name: ""
    }
  ),

  created(){
    console.log("default created.")
    this.$nuxt.$on('updateHeader', this.setHeader)
    this.userInfo = this.$store.getters['userInfo/userInfo']
    this.name = ("name" in this.userInfo && this.userInfo.name != undefined) ? this.userInfo.name : this.userInfo.username
    console.log("name" in this.userInfo, this.name)

  },
  computed:{
    pageTitle(){
      return this.$store.getters['title/title']
    }
  },
  methods: {
    async signout(){
      try {
        await Auth.signOut();
        this.$store.commit('userInfo/remove') 
        this.$router.push("/signin")
      } catch (error) {
        console.log(error);
      }
    },
    gotoHome(){
      this.$router.push(this.userInfo.home)
    },
    setHader(title){
      this.title = title
    }
  }
}
</script>
