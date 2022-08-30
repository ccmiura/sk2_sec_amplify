/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getQuestionsMaster = /* GraphQL */ `
  query GetQuestionsMaster($question_id: ID!) {
    getQuestionsMaster(question_id: $question_id) {
      question_id
      title
      participants
      taken
      questions {
        items {
          question_id
          question_sub_id
          question
          ans
          correct
          comment
          createdAt
          updatedAt
        }
        nextToken
      }
      dummy
      createdAt
      updatedAt
    }
  }
`;
export const listQuestionsMasters = /* GraphQL */ `
  query ListQuestionsMasters(
    $question_id: ID
    $filter: ModelQuestionsMasterFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listQuestionsMasters(
      question_id: $question_id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        question_id
        title
        participants
        taken
        dummy
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getQuestionsSubMaster = /* GraphQL */ `
  query GetQuestionsSubMaster($question_id: ID!, $question_sub_id: Int!) {
    getQuestionsSubMaster(
      question_id: $question_id
      question_sub_id: $question_sub_id
    ) {
      question_id
      question_sub_id
      question
      ans
      correct
      comment
      questionmaster {
        question_id
        title
        participants
        taken
        dummy
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listQuestionsSubMasters = /* GraphQL */ `
  query ListQuestionsSubMasters(
    $question_id: ID
    $question_sub_id: ModelIntKeyConditionInput
    $filter: ModelQuestionsSubMasterFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listQuestionsSubMasters(
      question_id: $question_id
      question_sub_id: $question_sub_id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        question_id
        question_sub_id
        question
        ans
        correct
        comment
        questionmaster {
          question_id
          title
          participants
          taken
          dummy
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUserResult = /* GraphQL */ `
  query GetUserResult($user_id: ID!, $question_id: ID!) {
    getUserResult(user_id: $user_id, question_id: $question_id) {
      user_id
      question_id
      name
      status
      answers
      correct_answers
      createdAt
      updatedAt
    }
  }
`;
export const listUserResults = /* GraphQL */ `
  query ListUserResults(
    $user_id: ID
    $question_id: ModelIDKeyConditionInput
    $filter: ModelUserResultFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUserResults(
      user_id: $user_id
      question_id: $question_id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        user_id
        question_id
        name
        status
        answers
        correct_answers
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getFirstUserResult = /* GraphQL */ `
  query GetFirstUserResult($user_id: ID!, $question_id: ID!) {
    getFirstUserResult(user_id: $user_id, question_id: $question_id) {
      user_id
      question_id
      name
      status
      answers
      correct_answers
      createdAt
      updatedAt
    }
  }
`;
export const listFirstUserResults = /* GraphQL */ `
  query ListFirstUserResults(
    $user_id: ID
    $question_id: ModelIDKeyConditionInput
    $filter: ModelFirstUserResultFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listFirstUserResults(
      user_id: $user_id
      question_id: $question_id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        user_id
        question_id
        name
        status
        answers
        correct_answers
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listSortedQuestinsMaster = /* GraphQL */ `
  query ListSortedQuestinsMaster(
    $dummy: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelQuestionsMasterFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSortedQuestinsMaster(
      dummy: $dummy
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        question_id
        title
        participants
        taken
        dummy
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listSortedQuestionsSubMaster = /* GraphQL */ `
  query ListSortedQuestionsSubMaster(
    $question_id: ID
    $sortDirection: ModelSortDirection
    $filter: ModelQuestionsSubMasterFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSortedQuestionsSubMaster(
      question_id: $question_id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        question_id
        question_sub_id
        question
        ans
        correct
        comment
        questionmaster {
          question_id
          title
          participants
          taken
          dummy
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const question_idIndexKey = /* GraphQL */ `
  query Question_idIndexKey(
    $question_id: ID
    $sortDirection: ModelSortDirection
    $filter: ModelUserResultFilterInput
    $limit: Int
    $nextToken: String
  ) {
    question_idIndexKey(
      question_id: $question_id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        user_id
        question_id
        name
        status
        answers
        correct_answers
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const firstUserResult_question_idIndex = /* GraphQL */ `
  query FirstUserResult_question_idIndex(
    $question_id: ID
    $sortDirection: ModelSortDirection
    $filter: ModelFirstUserResultFilterInput
    $limit: Int
    $nextToken: String
  ) {
    firstUserResult_question_idIndex(
      question_id: $question_id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        user_id
        question_id
        name
        status
        answers
        correct_answers
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
