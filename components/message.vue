<template>
  <v-alert v-model="alert" :type="type">{{message}}</v-alert>
</template>
<script lang="ts">
import { conditionalExpression } from '@babel/types';
import { defineComponent, computed, useStore} from '@nuxtjs/composition-api'
export default defineComponent({
  setup(){
    const store = useStore()
    console.log("message.vue",store.getters)
    const message = computed(() => store.getters["message/message"])
    const type = computed(() => store.getters["message/type"])
    const alert = computed(() => message.value != undefined && message.value != null && String(message.value).length > 0)
    return {
      message,
      type,
      alert
    }       
      
  }
})
</script>