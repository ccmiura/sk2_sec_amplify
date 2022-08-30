/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createQuestionsMaster = /* GraphQL */ `
  mutation CreateQuestionsMaster(
    $input: CreateQuestionsMasterInput!
    $condition: ModelQuestionsMasterConditionInput
  ) {
    createQuestionsMaster(input: $input, condition: $condition) {
      question_id
      title
      participants
      taken
      questions {
        nextToken
      }
      dummy
      createdAt
      updatedAt
    }
  }
`;
export const updateQuestionsMaster = /* GraphQL */ `
  mutation UpdateQuestionsMaster(
    $input: UpdateQuestionsMasterInput!
    $condition: ModelQuestionsMasterConditionInput
  ) {
    updateQuestionsMaster(input: $input, condition: $condition) {
      question_id
      title
      participants
      taken
      questions {
        nextToken
      }
      dummy
      createdAt
      updatedAt
    }
  }
`;
export const deleteQuestionsMaster = /* GraphQL */ `
  mutation DeleteQuestionsMaster(
    $input: DeleteQuestionsMasterInput!
    $condition: ModelQuestionsMasterConditionInput
  ) {
    deleteQuestionsMaster(input: $input, condition: $condition) {
      question_id
      title
      participants
      taken
      questions {
        nextToken
      }
      dummy
      createdAt
      updatedAt
    }
  }
`;
export const createQuestionsSubMaster = /* GraphQL */ `
  mutation CreateQuestionsSubMaster(
    $input: CreateQuestionsSubMasterInput!
    $condition: ModelQuestionsSubMasterConditionInput
  ) {
    createQuestionsSubMaster(input: $input, condition: $condition) {
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
export const updateQuestionsSubMaster = /* GraphQL */ `
  mutation UpdateQuestionsSubMaster(
    $input: UpdateQuestionsSubMasterInput!
    $condition: ModelQuestionsSubMasterConditionInput
  ) {
    updateQuestionsSubMaster(input: $input, condition: $condition) {
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
export const deleteQuestionsSubMaster = /* GraphQL */ `
  mutation DeleteQuestionsSubMaster(
    $input: DeleteQuestionsSubMasterInput!
    $condition: ModelQuestionsSubMasterConditionInput
  ) {
    deleteQuestionsSubMaster(input: $input, condition: $condition) {
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
export const createUserResult = /* GraphQL */ `
  mutation CreateUserResult(
    $input: CreateUserResultInput!
    $condition: ModelUserResultConditionInput
  ) {
    createUserResult(input: $input, condition: $condition) {
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
export const updateUserResult = /* GraphQL */ `
  mutation UpdateUserResult(
    $input: UpdateUserResultInput!
    $condition: ModelUserResultConditionInput
  ) {
    updateUserResult(input: $input, condition: $condition) {
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
export const deleteUserResult = /* GraphQL */ `
  mutation DeleteUserResult(
    $input: DeleteUserResultInput!
    $condition: ModelUserResultConditionInput
  ) {
    deleteUserResult(input: $input, condition: $condition) {
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
export const createFirstUserResult = /* GraphQL */ `
  mutation CreateFirstUserResult(
    $input: CreateFirstUserResultInput!
    $condition: ModelFirstUserResultConditionInput
  ) {
    createFirstUserResult(input: $input, condition: $condition) {
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
export const updateFirstUserResult = /* GraphQL */ `
  mutation UpdateFirstUserResult(
    $input: UpdateFirstUserResultInput!
    $condition: ModelFirstUserResultConditionInput
  ) {
    updateFirstUserResult(input: $input, condition: $condition) {
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
export const deleteFirstUserResult = /* GraphQL */ `
  mutation DeleteFirstUserResult(
    $input: DeleteFirstUserResultInput!
    $condition: ModelFirstUserResultConditionInput
  ) {
    deleteFirstUserResult(input: $input, condition: $condition) {
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
