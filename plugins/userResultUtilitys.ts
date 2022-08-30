import { NuxtAppOptions, Plugin } from '@nuxt/types'
import { API, graphqlOperation } from 'aws-amplify'
import { GraphQLResult } from '@aws-amplify/api-graphql'
import { createUserResult, updateUserResult, deleteUserResult, createFirstUserResult, deleteFirstUserResult } from '~/src/graphql/mutations'
import { listUserResults, listFirstUserResults, firstUserResult_question_idIndex } from '~/src/graphql/queries'
import { ListUserResultsQuery, ListFirstUserResultsQuery, FirstUserResult_question_idIndexQuery } from '@/src/API'

async function upsertUserResult(data:any){
  let result = null
  try{
    result = await API.graphql({query: createUserResult, variables: {input: data}})
  }catch(err:any){
    console.log(err)
    if(err.errors[0].errorType === "DynamoDB:ConditionalCheckFailedException"){
      console.log("hoge")
      result = await API.graphql({query: updateUserResult, variables: {input: data}})
    }else{
      throw err
    }
  }
  return result
}

async function insertFirstUserResult(data:any){
  let result = null
  try{
    result = await API.graphql({query: createFirstUserResult, variables: {input: data}})
  }catch(err:any){
    console.log(err)
  }
  return result
}


async function getListUserResult(user_id:string){
  //const {data: {listUserResults: {items}}} = await API.graphql(graphqlOperation(listUserResults, {user_id: user_id})) as GraphQLResult<ListUserResultsQuery>
  const tmp = await API.graphql(graphqlOperation(listUserResults, {user_id: user_id})) as GraphQLResult<ListUserResultsQuery>
  return tmp.data?.listUserResults?.items
}

async function delUserResult(user_id:string, question_id:string){
  const rest = await API.graphql(graphqlOperation(deleteUserResult, {input: {user_id: user_id, question_id: question_id}}))
  return rest
}

async function getListFirstUserResult(user_id:string){
  //const {data: {listFirstUserResults: {items}}} = await API.graphql(graphqlOperation(listFirstUserResults, {user_id: user_id})) as GraphQLResult<ListFirstUserResultsQuery>
  const tmp = await API.graphql(graphqlOperation(listFirstUserResults, {user_id: user_id})) as GraphQLResult<ListFirstUserResultsQuery>
  return tmp.data?.listFirstUserResults?.items
}

async function delFirstUserResult(user_id:string, question_id:string){
  const rest = await API.graphql(graphqlOperation(deleteFirstUserResult, {input: {user_id: user_id, question_id: question_id}}))
  return rest
}

async function getFirstUserResult_question_idIndex(question_id:string){
  console.log(question_id)
  //const {data: {firstUserResult_question_idIndex: {items}}} = await API.graphql({query: firstUserResult_question_idIndex, variables: {question_id: question_id}}) as GraphQLResult<FirstUserResult_question_idIndexQuery>
  const tmp = await API.graphql({query: firstUserResult_question_idIndex, variables: {question_id: question_id}}) as GraphQLResult<FirstUserResult_question_idIndexQuery>
  console.log("getFirstUserResult_question_idIndex",tmp)
  return tmp.data?.firstUserResult_question_idIndex?.items
}

const userResultUtilitys: Plugin = (context, inject) => {
  // Vue、コンテキスト、ストアに$hello(msg）を挿入します。
  inject('userResultUtilitys', 
    {
      upsertUserResult: upsertUserResult,
      getListUserResult: getListUserResult,
      delUserResult: delUserResult,
      insertFirstUserResult: insertFirstUserResult,
      getListFirstUserResult: getListFirstUserResult,
      delFirstUserResult: delFirstUserResult,
      getFirstUserResult_question_idIndex: getFirstUserResult_question_idIndex,
    }
  )
}
export default userResultUtilitys