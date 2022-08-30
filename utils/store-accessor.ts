
/* eslint-disable import/no-mutable-exports */
import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import message from '~/store/message'
import progress from '~/store/progress'
import title from '~/store/title'
import userInfo from '~/store/userInfo'
import userResult from '~/store/userResult'

let messageStore: message
let progressStore: progress
let titleStore: title
let userInfoStore: userInfo
let userResultStore: userResult
function initialiseStores(store: Store<any>): void {
  messageStore = getModule(message, store)
  progressStore = getModule(progress, store)
  titleStore = getModule(title, store)
  userInfoStore = getModule(userInfo, store)
  userResultStore = getModule(userResult, store)
}

export { initialiseStores, messageStore, progressStore, titleStore, userInfoStore, userResultStore }