<template>
  <v-overlay :value="progress">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </v-overlay>
</template>
<script lang="ts">
import { defineComponent, computed, useStore } from '@nuxtjs/composition-api'

export default defineComponent({
  setup(){
    const store = useStore()
    const progress = computed(()=>{return store.getters["progress/progress"]})
    return {
      progress
    }
  }
  /*computed:{
    ...mapGetters({progress: "progress/progress"})
  }*/
})
</script>