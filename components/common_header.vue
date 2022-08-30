<template></template>
<script lang="ts">
import { defineComponent, useStore, useMeta } from '@nuxtjs/composition-api'
export default defineComponent({
  head:{},
  setup(){
    const store = useStore()
    const {title} = useMeta()
    title.value = store.getters['title/title']
  }
})
</script>