import { Auth, API } from 'aws-amplify'
import { NuxtAppOptions, Plugin } from '@nuxt/types'

async function getUser(username: string): Promise<any>{
  let apiName:string = 'AdminQueries';
  let path:string = '/getUser';
  let myInit:Object = { 
      queryStringParameters: {
        "username": username
      },
      headers: {
        'Content-Type' : 'application/json',
        Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
      }
  }
  console.log(myInit)
  const {...rest } =  await API.get(apiName, path, myInit);
  return rest
}

async function listUsersInGroup(group: string, nextToken=undefined, limit=60): Promise<any>{
  let apiName:string = 'AdminQueries';
  let path:string = '/listUsersInGroup';
  let myInit:Object = { 
      queryStringParameters: {
        "groupname": group,
        "limit": limit,
        "token": nextToken
      },
      headers: {
        'Content-Type' : 'application/json',
        Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
      }
  }
  //console.log(myInit)
  const {NextToken, ...rest} =  await API.get(apiName, path, myInit);
  if(NextToken != undefined){
    rest.concat(await listUsersInGroup(group, NextToken, limit))
  }
  return rest
}

async function addUser(email:string, user_id:string, name:string){
  let apiName = 'AdminQueries';
  

  let myInit1 = { 
      body: {
        username: user_id,
        userAttributes: [
          {Name: "name", Value: name},
          {Name: "email", Value: email},
          { Name: 'email_verified', Value: 'true' }
        ]
      },
      headers: {
        'Content-Type' : 'application/json',
        Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
      }
  }
  let myInit2 = { 
    body: {
      username: user_id,
      groupname: "user",
    },
    headers: {
      'Content-Type' : 'application/json',
      Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
    }
  }
  console.log(myInit1, myInit2)
  let result1 = await API.post(apiName, '/createUser', myInit1);
  let result2 = await API.post(apiName, '/addUserToGroup', myInit2);

  //return (result1, result2)
}

async function updateUser(username:string, email:string, name:string){
  let apiName = 'AdminQueries';
  let path = '/updateUser';
  let myInit = { 
      body: {
        username: username,
        userAttributes: [
          {Name: "name", Value: name},
          {Name: "email", Value: email},
          { Name: 'email_verified', Value: 'true' }
        ]
      },
      headers: {
        'Content-Type' : 'application/json',
        Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
      }
  }
  console.log(myInit)
  let result1 = await API.post(apiName, path, myInit)
  return result1
}


async function deleteUser(username:string){
  let apiName = 'AdminQueries';
  let path = '/deleteUser';
  let myInit = { 
      body: {
        "username": username,
      },
      headers: {
        'Content-Type' : 'application/json',
        Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
      }
  }
  console.log(myInit)
  const result =  await API.post(apiName, path, myInit);
  return result
}

const authUtiltys:Plugin = (context, inject) => {
  // Vue、コンテキスト、ストアに$hello(msg）を挿入します。
  inject('authUtilitys', {getUser: getUser,
    listUsersInGroup: listUsersInGroup,
    addUser: addUser,
    deleteUser: deleteUser,
    updateUser: updateUser,
  })
}
export default authUtiltys