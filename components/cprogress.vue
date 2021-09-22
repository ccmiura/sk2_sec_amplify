<template>
  <v-overlay :value="progress">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </v-overlay>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  computed:{
    ...mapGetters({progress: "progress/progress"})
  }
}
</script>