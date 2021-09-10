import { API } from 'aws-amplify'
import { createUserResult, updateUserResult } from '~/src/graphql/mutations'

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


export default ({ app }, inject) => {
  // Vue、コンテキスト、ストアに$hello(msg）を挿入します。
  inject('userResultUtilitys', 
    {
      upsertUserResult, upsertUserResult
    }
  )
}