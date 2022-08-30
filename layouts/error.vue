<template>
  <v-app dark>
    <h1 v-if="error.statusCode === 404">
      {{ pageNotFound }}
    </h1>
    <h1 v-else>
      {{ otherError }}
    </h1>
    <NuxtLink to="/">
      Home page
    </NuxtLink>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, reactive, useMeta, ref } from '@nuxtjs/composition-api'
export default defineComponent({
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  head:{},
  setup: ({error}) =>{
    const pageNotFound = ref('404 Not Found');
    const otherError = ref('An error occurred');
    const {title} = useMeta();
    title.value =
      error.statusCode === 404 ? pageNotFound.value : otherError.value
    return {
      title,
      pageNotFound,
      otherError,
    }
  }
})
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
