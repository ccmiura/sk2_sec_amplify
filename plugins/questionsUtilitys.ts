import { NuxtAppOptions, Plugin } from '@nuxt/types'
import { API, graphqlOperation } from 'aws-amplify'
import { GraphQLResult } from '@aws-amplify/api-graphql'
import { createQuestionsMaster, createQuestionsSubMaster, deleteQuestionsMaster, deleteQuestionsSubMaster } from '~/src/graphql/mutations'
import { listSortedQuestinsMaster, getQuestionsMaster } from '~/src/graphql/queries'
import { CreateQuestionsMasterInput, CreateQuestionsSubMasterInput, ListSortedQuestinsMasterQuery, GetQuestionsMasterQuery } from '@/src/API'
import DateWithOffset from "date-with-offset"

function createQuestionsMasterData(question_id:string, title:string):CreateQuestionsMasterInput{
  const jdt = new DateWithOffset(540)
  return {
    question_id: question_id,
    dummy: "dummy",
    title: title,
    participants: 1,
    taken: 0,
    createdAt: jdt.toISOString()
  }
}
function createQuestionsSubMasterData(uuid:string, data:any):CreateQuestionsSubMasterInput[]{
  const result:CreateQuestionsSubMasterInput[] = []
  data.forEach((element:any, index:number) => {
    let ans = []
    if(element.ans_1 != ""){
      ans.push(element.ans_1)
    }
    if(element.ans_2 != ""){
      ans.push(element.ans_2)
    }
    if(element.ans_3 != ""){
      ans.push(element.ans_3)
    }
    if(element.ans_4 != ""){
      ans.push(element.ans_4)
    }
    result.push(
      {
        question_id: uuid,
        question_sub_id: index,
        question: element.question,
        ans: ans,
        correct: element.correct,
        comment: element.comment,
      }
    )
  });
  return result
}
async function insertQuestionsMaster(data:CreateQuestionsMasterInput){
  const res = await API.graphql({query: createQuestionsMaster, variables: {input: data}})
  return res
}


async function batchInsertQuestionSubMaster(data: CreateQuestionsSubMasterInput[]){
  console.log(data)
  const result = await Promise.all(data.map((v:any)=>{
      const res = API.graphql({query: createQuestionsSubMaster, variables: {input: v}})
      return res as PromiseLike<GraphQLResult<any>>
  }))

  console.log(result)    // ["OK", "OK", "OK"]
  return result
}

async function insertOp(question_id:string, title:string, data:any){
  const master = createQuestionsMasterData(question_id, title)
  const sub = createQuestionsSubMasterData(question_id, data)
  console.log(master, sub)
  try{
    const m_res = await insertQuestionsMaster(master)
    const s_res = await batchInsertQuestionSubMaster(sub)
    return [m_res, s_res]
  }catch(err){
    console.log(err)
    try{
      await deleteQuestion(question_id)
    }catch(err2){
      console.log(err2)
    }finally{
      throw err
    }
  }
}
async function query(token: string|null):Promise<any>{
  //const {data: { listSortedQuestinsMaster: { items }}, nextToken} = 
  const tmp =
    await API.graphql(graphqlOperation(listSortedQuestinsMaster, {nextToken: token, dummy: "dummy", sortDirection: "DESC"})) as GraphQLResult<ListSortedQuestinsMasterQuery>
  const items = tmp.data?.listSortedQuestinsMaster?.items
  const nextToken = tmp.data?.listSortedQuestinsMaster?.nextToken

  if(nextToken != undefined){
    const tmp2 = await query(nextToken)
    items?.concat(tmp2)
  }
  return items
}

async function getQuestionsMasterList(){
  let tmp = []
  try{
    tmp = await query(null)
    console.log(tmp)
  }catch(e){
    console.log("error", e)
    throw e
  }
  return tmp
}
async function getQuestion(question_id:string): Promise<any>{
  const rest = await API.graphql(graphqlOperation(getQuestionsMaster, {question_id: question_id, sortDirection: "ASC"})) as GraphQLResult<GetQuestionsMasterQuery>
  console.log("getQuestion",rest)
  return rest.data!.getQuestionsMaster
  
  //rest.data.getQuestionsMaster.questions.items.sort((a, b) => a.question_sub_id - b.question_sub_id)
  
}

async function deleteQuestion(question_id: string){
  const data = await getQuestion(question_id)
  const promiseList:Promise<GraphQLResult<any>>[] = []
  promiseList.push(API.graphql(graphqlOperation(deleteQuestionsMaster, {input: {question_id: question_id}})))
  promiseList.concat(data.questions.items.map((v:any)=>{
    const res = API.graphql(graphqlOperation(deleteQuestionsSubMaster, {input: {
      question_id: v.question_id, 
      question_sub_id: v.question_sub_id
      }}))
    return res
  }))
  const result = await Promise.all(promiseList)
}

const questionsUtilitys:Plugin = (context, inject) => {
  // Vue、コンテキスト、ストアに$hello(msg）を挿入します。
  inject('questionsUtilitys', 
    {
      insertOp: insertOp,
      getQuestionsMasterList: getQuestionsMasterList,
      getQuestion: getQuestion,
      deleteQuestion: deleteQuestion,
    }
  )
}
export default questionsUtilitys