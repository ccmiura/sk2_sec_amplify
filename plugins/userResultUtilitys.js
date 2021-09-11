import { API, graphqlOperation } from 'aws-amplify'
import { createUserResult, updateUserResult, deleteUserResult } from '~/src/graphql/mutations'
import { listUserResults } from '~/src/graphql/queries'

async function upsertUserResult(data){
  let result = null
  try{
    result = await API.graphql({query: createUserResult, variables: {input: data}})
  }catch(err){
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

async function getListUserResult(user_id){
  const {data: {listUserResults: {items}}} = await API.graphql(graphqlOperation(listUserResults, {user_id: user_id}))
  return items
}

async function delUserResult(user_id, question_id){
  const rest = await API.graphql(graphqlOperation(deleteUserResult, {input: {user_id: user_id, question_id: question_id}}))
  return rest
}


export default ({ app }, inject) => {
  // Vue、コンテキスト、ストアに$hello(msg）を挿入します。
  inject('userResultUtilitys', 
    {
      upsertUserResult: upsertUserResult,
      getListUserResult: getListUserResult,
      delUserResult: delUserResult,
    }
  )
}