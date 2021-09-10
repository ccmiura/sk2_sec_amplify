import { API, graphqlOperation } from 'aws-amplify'
import { createQuestionsMaster, createQuestionsSubMaster, deleteQuestionsMaster, deleteQuestionsSubMaster } from '~/src/graphql/mutations'
import { listSortedQuestinsMaster, getQuestionsMaster } from '~/src/graphql/queries'
import DateWithOffset from "date-with-offset"

function createQuestionsMasterData(uuid, title){
  const jdt = new DateWithOffset(540)
  return {
    question_id: uuid,
    dummy: "dummy",
    title: title,
    participants: 1,
    taken: 0,
    createdAt: jdt.toISOString()
  }
}
function createQuestionsSubMasterData(uuid, data){
  const result = []
  data.forEach((element, index) => {
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
async function insertQuestionsMaster(data){
  const res = await API.graphql({query: createQuestionsMaster, variables: {input: data}})
  return res
}


async function batchInsertQuestionSubMaster(data){
  console.log(data)
  const result = await Promise.all(data.map((v)=>{
      const res = API.graphql({query: createQuestionsSubMaster, variables: {input: v}})
      return res
  }))

  console.log(result)    // ["OK", "OK", "OK"]
  return result
}

async function insertOp(uuid, title, data){
  const master = createQuestionsMasterData(uuid, title)
  const sub = createQuestionsSubMasterData(uuid, data)
  console.log(master, sub)
  try{
    const m_res = await insertQuestionsMaster(master)
    const s_res = await batchInsertQuestionSubMaster(sub)
    return (m_res, s_res)
  }catch(err){
    console.log(err)
    try{
      await deleteQuestion(quesion_id)
    }catch(err2){
      console.log(err2)
    }finally{
      throw err
    }
  }
}
async function query(token){
  const {data: { listSortedQuestinsMaster: { items }}, nextToken} = 
    await API.graphql(graphqlOperation(listSortedQuestinsMaster, {nextToken: token, dummy: "dummy", sortDirection: "DESC"}))
  if(nextToken != undefined){
    items.concat(await query(nextToken))
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
async function getQuestion(question_id){
  const rest = await API.graphql(graphqlOperation(getQuestionsMaster, {question_id: question_id, sortDirection: "ASC"}))
  rest.data.getQuestionsMaster.questions.items.sort((a, b) => a.question_sub_id - b.question_sub_id)
  return rest.data.getQuestionsMaster
}

async function deleteQuestion(question_id){
  const data = await getQuestion(quesion_id)
  const promiseList = []
  promiseList.push(API.graphql(graphqlOperation(deleteQuestionsMaster, {input: {question_id: question_id}})))
  promiseList.concat(data.questions.items.map((v)=>{
    const res = API.graphql(graphqlOperation(deleteQuestionsSubMaster, {input: {
      question_id: v.question_id, 
      question_sub_id: v.question_sub_id
      }}))
    return res
  }))
  const result = await Promise.all(promiseList)
}

export default ({ app }, inject) => {
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