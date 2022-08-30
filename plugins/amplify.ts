//import Vue from 'vue'
import Amplify, {I18n} from 'aws-amplify'
import '@aws-amplify/ui-vue'
import awsExports from '@/src/aws-exports.js'
import { vocabularies } from '@/assets/i18n/amplify/vocabularies';
import { Plugin } from '@nuxt/types'

const awsPlugin: Plugin = (ctx, inject) =>{
  Amplify.configure(awsExports)
  I18n.putVocabularies(vocabularies);
  I18n.setLanguage('ja');
  
}
export default awsPlugin

//Vue.use(AmplifyPlugin, awsModules)
