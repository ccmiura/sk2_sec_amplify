import Vue from 'vue'

const messages = ["未実施", "不合格", "合格"]
Vue.mixin(
  {
    head(){
      if(this.$store != undefined){
        return {
          title: this.$store.getters['title/title']
        }
      }
    },
    methods:{
      goto(url){
        this.$router.push(url)
      },
      goHome(){
        let home = null
        if(this.home != undefined && this.home != null && this.home != ""){
          home = this.home  
        }else{
          home = this.$store.getters['userInfo/userInfo'].home
        }
        this.goto(home)
      },
      statusString(status){
        console.log(status, messages[status])
        return messages[status]
      },
      runUrlEncode(str){
        return encodeURIComponent(str)
      }
    }
  }
)
