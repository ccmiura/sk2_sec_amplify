/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateQuestionsMaster = /* GraphQL */ `
  subscription OnCreateQuestionsMaster {
    onCreateQuestionsMaster {
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
export const onUpdateQuestionsMaster = /* GraphQL */ `
  subscription OnUpdateQuestionsMaster {
    onUpdateQuestionsMaster {
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
export const onDeleteQuestionsMaster = /* GraphQL */ `
  subscription OnDeleteQuestionsMaster {
    onDeleteQuestionsMaster {
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
export const onCreateQuestionsSubMaster = /* GraphQL */ `
  subscription OnCreateQuestionsSubMaster {
    onCreateQuestionsSubMaster {
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
        questions {
          nextToken
        }
        dummy
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateQuestionsSubMaster = /* GraphQL */ `
  subscription OnUpdateQuestionsSubMaster {
    onUpdateQuestionsSubMaster {
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
        questions {
          nextToken
        }
        dummy
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteQuestionsSubMaster = /* GraphQL */ `
  subscription OnDeleteQuestionsSubMaster {
    onDeleteQuestionsSubMaster {
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
        questions {
          nextToken
        }
        dummy
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateUserResult = /* GraphQL */ `
  subscription OnCreateUserResult {
    onCreateUserResult {
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
export const onUpdateUserResult = /* GraphQL */ `
  subscription OnUpdateUserResult {
    onUpdateUserResult {
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
export const onDeleteUserResult = /* GraphQL */ `
  subscription OnDeleteUserResult {
    onDeleteUserResult {
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
