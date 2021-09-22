<template>
  <v-alert v-model="alert" :type="type">{{message}}</v-alert>
</template>
<script>

import { mapGetters } from 'vuex';
export default {
  computed:{
    ...mapGetters({
      message: "message/message",
      type: "message/type"
    }
    ),
    alert(){
      return this.message != undefined && this.message != null && this.message.length > 0
    }
      
    
  }
}
</script>