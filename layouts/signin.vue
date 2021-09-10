<template>
  <v-app style="box-sizing: border-box; background: #FFF3E0">
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  created: ()=>{
    console.log("signin created.")
  }
}
</script>
