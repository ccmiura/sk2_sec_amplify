import Vue from 'vue'
import { I18n } from 'aws-amplify'
import {Amplify} from '@aws-amplify/core'
import '@aws-amplify/ui-vue'
import awsExports from '@/src/aws-exports.js'
import { vocabularies } from '@/assets/i18n/amplify/vocabularies';

Amplify.configure(awsExports)
I18n.putVocabularies(vocabularies);
I18n.setLanguage('ja');

Vue.use(Amplify)