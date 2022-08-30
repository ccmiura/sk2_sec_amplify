/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateQuestionsMasterInput = {
  question_id: string,
  title: string,
  participants?: number | null,
  taken?: number | null,
  dummy: string,
  createdAt?: string | null,
};

export type ModelQuestionsMasterConditionInput = {
  title?: ModelStringInput | null,
  participants?: ModelIntInput | null,
  taken?: ModelIntInput | null,
  dummy?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelQuestionsMasterConditionInput | null > | null,
  or?: Array< ModelQuestionsMasterConditionInput | null > | null,
  not?: ModelQuestionsMasterConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type QuestionsMaster = {
  __typename: "QuestionsMaster",
  question_id: string,
  title: string,
  participants?: number | null,
  taken?: number | null,
  questions?: ModelQuestionsSubMasterConnection | null,
  dummy: string,
  createdAt: string,
  updatedAt: string,
};

export type ModelQuestionsSubMasterConnection = {
  __typename: "ModelQuestionsSubMasterConnection",
  items?:  Array<QuestionsSubMaster | null > | null,
  nextToken?: string | null,
};

export type QuestionsSubMaster = {
  __typename: "QuestionsSubMaster",
  question_id: string,
  question_sub_id: number,
  question: string,
  ans: Array< string | null >,
  correct: number,
  comment?: string | null,
  questionmaster?: QuestionsMaster | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateQuestionsMasterInput = {
  question_id: string,
  title?: string | null,
  participants?: number | null,
  taken?: number | null,
  dummy?: string | null,
  createdAt?: string | null,
};

export type DeleteQuestionsMasterInput = {
  question_id: string,
};

export type CreateQuestionsSubMasterInput = {
  question_id: string,
  question_sub_id: number,
  question: string,
  ans: Array< string | null >,
  correct: number,
  comment?: string | null,
};

export type ModelQuestionsSubMasterConditionInput = {
  question?: ModelStringInput | null,
  ans?: ModelStringInput | null,
  correct?: ModelIntInput | null,
  comment?: ModelStringInput | null,
  and?: Array< ModelQuestionsSubMasterConditionInput | null > | null,
  or?: Array< ModelQuestionsSubMasterConditionInput | null > | null,
  not?: ModelQuestionsSubMasterConditionInput | null,
};

export type UpdateQuestionsSubMasterInput = {
  question_id: string,
  question_sub_id: number,
  question?: string | null,
  ans?: Array< string | null > | null,
  correct?: number | null,
  comment?: string | null,
};

export type DeleteQuestionsSubMasterInput = {
  question_id: string,
  question_sub_id: number,
};

export type CreateUserResultInput = {
  user_id: string,
  question_id: string,
  name?: string | null,
  status?: string | null,
  answers?: Array< number | null > | null,
  correct_answers?: number | null,
};

export type ModelUserResultConditionInput = {
  name?: ModelStringInput | null,
  status?: ModelStringInput | null,
  answers?: ModelIntInput | null,
  correct_answers?: ModelIntInput | null,
  and?: Array< ModelUserResultConditionInput | null > | null,
  or?: Array< ModelUserResultConditionInput | null > | null,
  not?: ModelUserResultConditionInput | null,
};

export type UserResult = {
  __typename: "UserResult",
  user_id: string,
  question_id: string,
  name?: string | null,
  status?: string | null,
  answers?: Array< number | null > | null,
  correct_answers?: number | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateUserResultInput = {
  user_id: string,
  question_id: string,
  name?: string | null,
  status?: string | null,
  answers?: Array< number | null > | null,
  correct_answers?: number | null,
};

export type DeleteUserResultInput = {
  user_id: string,
  question_id: string,
};

export type CreateFirstUserResultInput = {
  user_id: string,
  question_id: string,
  name?: string | null,
  status?: string | null,
  answers?: Array< number | null > | null,
  correct_answers?: number | null,
};

export type ModelFirstUserResultConditionInput = {
  name?: ModelStringInput | null,
  status?: ModelStringInput | null,
  answers?: ModelIntInput | null,
  correct_answers?: ModelIntInput | null,
  and?: Array< ModelFirstUserResultConditionInput | null > | null,
  or?: Array< ModelFirstUserResultConditionInput | null > | null,
  not?: ModelFirstUserResultConditionInput | null,
};

export type FirstUserResult = {
  __typename: "FirstUserResult",
  user_id: string,
  question_id: string,
  name?: string | null,
  status?: string | null,
  answers?: Array< number | null > | null,
  correct_answers?: number | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateFirstUserResultInput = {
  user_id: string,
  question_id: string,
  name?: string | null,
  status?: string | null,
  answers?: Array< number | null > | null,
  correct_answers?: number | null,
};

export type DeleteFirstUserResultInput = {
  user_id: string,
  question_id: string,
};

export type ModelQuestionsMasterFilterInput = {
  question_id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  participants?: ModelIntInput | null,
  taken?: ModelIntInput | null,
  dummy?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelQuestionsMasterFilterInput | null > | null,
  or?: Array< ModelQuestionsMasterFilterInput | null > | null,
  not?: ModelQuestionsMasterFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelQuestionsMasterConnection = {
  __typename: "ModelQuestionsMasterConnection",
  items?:  Array<QuestionsMaster | null > | null,
  nextToken?: string | null,
};

export type ModelIntKeyConditionInput = {
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelQuestionsSubMasterFilterInput = {
  question_id?: ModelIDInput | null,
  question_sub_id?: ModelIntInput | null,
  question?: ModelStringInput | null,
  ans?: ModelStringInput | null,
  correct?: ModelIntInput | null,
  comment?: ModelStringInput | null,
  and?: Array< ModelQuestionsSubMasterFilterInput | null > | null,
  or?: Array< ModelQuestionsSubMasterFilterInput | null > | null,
  not?: ModelQuestionsSubMasterFilterInput | null,
};

export type ModelIDKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelUserResultFilterInput = {
  user_id?: ModelIDInput | null,
  question_id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  status?: ModelStringInput | null,
  answers?: ModelIntInput | null,
  correct_answers?: ModelIntInput | null,
  and?: Array< ModelUserResultFilterInput | null > | null,
  or?: Array< ModelUserResultFilterInput | null > | null,
  not?: ModelUserResultFilterInput | null,
};

export type ModelUserResultConnection = {
  __typename: "ModelUserResultConnection",
  items?:  Array<UserResult | null > | null,
  nextToken?: string | null,
};

export type ModelFirstUserResultFilterInput = {
  user_id?: ModelIDInput | null,
  question_id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  status?: ModelStringInput | null,
  answers?: ModelIntInput | null,
  correct_answers?: ModelIntInput | null,
  and?: Array< ModelFirstUserResultFilterInput | null > | null,
  or?: Array< ModelFirstUserResultFilterInput | null > | null,
  not?: ModelFirstUserResultFilterInput | null,
};

export type ModelFirstUserResultConnection = {
  __typename: "ModelFirstUserResultConnection",
  items?:  Array<FirstUserResult | null > | null,
  nextToken?: string | null,
};

export type ModelStringKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type CreateQuestionsMasterMutationVariables = {
  input: CreateQuestionsMasterInput,
  condition?: ModelQuestionsMasterConditionInput | null,
};

export type CreateQuestionsMasterMutation = {
  createQuestionsMaster?:  {
    __typename: "QuestionsMaster",
    question_id: string,
    title: string,
    participants?: number | null,
    taken?: number | null,
    questions?:  {
      __typename: "ModelQuestionsSubMasterConnection",
      nextToken?: string | null,
    } | null,
    dummy: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateQuestionsMasterMutationVariables = {
  input: UpdateQuestionsMasterInput,
  condition?: ModelQuestionsMasterConditionInput | null,
};

export type UpdateQuestionsMasterMutation = {
  updateQuestionsMaster?:  {
    __typename: "QuestionsMaster",
    question_id: string,
    title: string,
    participants?: number | null,
    taken?: number | null,
    questions?:  {
      __typename: "ModelQuestionsSubMasterConnection",
      nextToken?: string | null,
    } | null,
    dummy: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteQuestionsMasterMutationVariables = {
  input: DeleteQuestionsMasterInput,
  condition?: ModelQuestionsMasterConditionInput | null,
};

export type DeleteQuestionsMasterMutation = {
  deleteQuestionsMaster?:  {
    __typename: "QuestionsMaster",
    question_id: string,
    title: string,
    participants?: number | null,
    taken?: number | null,
    questions?:  {
      __typename: "ModelQuestionsSubMasterConnection",
      nextToken?: string | null,
    } | null,
    dummy: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateQuestionsSubMasterMutationVariables = {
  input: CreateQuestionsSubMasterInput,
  condition?: ModelQuestionsSubMasterConditionInput | null,
};

export type CreateQuestionsSubMasterMutation = {
  createQuestionsSubMaster?:  {
    __typename: "QuestionsSubMaster",
    question_id: string,
    question_sub_id: number,
    question: string,
    ans: Array< string | null >,
    correct: number,
    comment?: string | null,
    questionmaster?:  {
      __typename: "QuestionsMaster",
      question_id: string,
      title: string,
      participants?: number | null,
      taken?: number | null,
      dummy: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateQuestionsSubMasterMutationVariables = {
  input: UpdateQuestionsSubMasterInput,
  condition?: ModelQuestionsSubMasterConditionInput | null,
};

export type UpdateQuestionsSubMasterMutation = {
  updateQuestionsSubMaster?:  {
    __typename: "QuestionsSubMaster",
    question_id: string,
    question_sub_id: number,
    question: string,
    ans: Array< string | null >,
    correct: number,
    comment?: string | null,
    questionmaster?:  {
      __typename: "QuestionsMaster",
      question_id: string,
      title: string,
      participants?: number | null,
      taken?: number | null,
      dummy: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteQuestionsSubMasterMutationVariables = {
  input: DeleteQuestionsSubMasterInput,
  condition?: ModelQuestionsSubMasterConditionInput | null,
};

export type DeleteQuestionsSubMasterMutation = {
  deleteQuestionsSubMaster?:  {
    __typename: "QuestionsSubMaster",
    question_id: string,
    question_sub_id: number,
    question: string,
    ans: Array< string | null >,
    correct: number,
    comment?: string | null,
    questionmaster?:  {
      __typename: "QuestionsMaster",
      question_id: string,
      title: string,
      participants?: number | null,
      taken?: number | null,
      dummy: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateUserResultMutationVariables = {
  input: CreateUserResultInput,
  condition?: ModelUserResultConditionInput | null,
};

export type CreateUserResultMutation = {
  createUserResult?:  {
    __typename: "UserResult",
    user_id: string,
    question_id: string,
    name?: string | null,
    status?: string | null,
    answers?: Array< number | null > | null,
    correct_answers?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateUserResultMutationVariables = {
  input: UpdateUserResultInput,
  condition?: ModelUserResultConditionInput | null,
};

export type UpdateUserResultMutation = {
  updateUserResult?:  {
    __typename: "UserResult",
    user_id: string,
    question_id: string,
    name?: string | null,
    status?: string | null,
    answers?: Array< number | null > | null,
    correct_answers?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteUserResultMutationVariables = {
  input: DeleteUserResultInput,
  condition?: ModelUserResultConditionInput | null,
};

export type DeleteUserResultMutation = {
  deleteUserResult?:  {
    __typename: "UserResult",
    user_id: string,
    question_id: string,
    name?: string | null,
    status?: string | null,
    answers?: Array< number | null > | null,
    correct_answers?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateFirstUserResultMutationVariables = {
  input: CreateFirstUserResultInput,
  condition?: ModelFirstUserResultConditionInput | null,
};

export type CreateFirstUserResultMutation = {
  createFirstUserResult?:  {
    __typename: "FirstUserResult",
    user_id: string,
    question_id: string,
    name?: string | null,
    status?: string | null,
    answers?: Array< number | null > | null,
    correct_answers?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateFirstUserResultMutationVariables = {
  input: UpdateFirstUserResultInput,
  condition?: ModelFirstUserResultConditionInput | null,
};

export type UpdateFirstUserResultMutation = {
  updateFirstUserResult?:  {
    __typename: "FirstUserResult",
    user_id: string,
    question_id: string,
    name?: string | null,
    status?: string | null,
    answers?: Array< number | null > | null,
    correct_answers?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteFirstUserResultMutationVariables = {
  input: DeleteFirstUserResultInput,
  condition?: ModelFirstUserResultConditionInput | null,
};

export type DeleteFirstUserResultMutation = {
  deleteFirstUserResult?:  {
    __typename: "FirstUserResult",
    user_id: string,
    question_id: string,
    name?: string | null,
    status?: string | null,
    answers?: Array< number | null > | null,
    correct_answers?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetQuestionsMasterQueryVariables = {
  question_id: string,
};

export type GetQuestionsMasterQuery = {
  getQuestionsMaster?:  {
    __typename: "QuestionsMaster",
    question_id: string,
    title: string,
    participants?: number | null,
    taken?: number | null,
    questions?:  {
      __typename: "ModelQuestionsSubMasterConnection",
      nextToken?: string | null,
    } | null,
    dummy: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListQuestionsMastersQueryVariables = {
  question_id?: string | null,
  filter?: ModelQuestionsMasterFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListQuestionsMastersQuery = {
  listQuestionsMasters?:  {
    __typename: "ModelQuestionsMasterConnection",
    items?:  Array< {
      __typename: "QuestionsMaster",
      question_id: string,
      title: string,
      participants?: number | null,
      taken?: number | null,
      dummy: string,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetQuestionsSubMasterQueryVariables = {
  question_id: string,
  question_sub_id: number,
};

export type GetQuestionsSubMasterQuery = {
  getQuestionsSubMaster?:  {
    __typename: "QuestionsSubMaster",
    question_id: string,
    question_sub_id: number,
    question: string,
    ans: Array< string | null >,
    correct: number,
    comment?: string | null,
    questionmaster?:  {
      __typename: "QuestionsMaster",
      question_id: string,
      title: string,
      participants?: number | null,
      taken?: number | null,
      dummy: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListQuestionsSubMastersQueryVariables = {
  question_id?: string | null,
  question_sub_id?: ModelIntKeyConditionInput | null,
  filter?: ModelQuestionsSubMasterFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListQuestionsSubMastersQuery = {
  listQuestionsSubMasters?:  {
    __typename: "ModelQuestionsSubMasterConnection",
    items?:  Array< {
      __typename: "QuestionsSubMaster",
      question_id: string,
      question_sub_id: number,
      question: string,
      ans: Array< string | null >,
      correct: number,
      comment?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetUserResultQueryVariables = {
  user_id: string,
  question_id: string,
};

export type GetUserResultQuery = {
  getUserResult?:  {
    __typename: "UserResult",
    user_id: string,
    question_id: string,
    name?: string | null,
    status?: string | null,
    answers?: Array< number | null > | null,
    correct_answers?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListUserResultsQueryVariables = {
  user_id?: string | null,
  question_id?: ModelIDKeyConditionInput | null,
  filter?: ModelUserResultFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListUserResultsQuery = {
  listUserResults?:  {
    __typename: "ModelUserResultConnection",
    items?:  Array< {
      __typename: "UserResult",
      user_id: string,
      question_id: string,
      name?: string | null,
      status?: string | null,
      answers?: Array< number | null > | null,
      correct_answers?: number | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetFirstUserResultQueryVariables = {
  user_id: string,
  question_id: string,
};

export type GetFirstUserResultQuery = {
  getFirstUserResult?:  {
    __typename: "FirstUserResult",
    user_id: string,
    question_id: string,
    name?: string | null,
    status?: string | null,
    answers?: Array< number | null > | null,
    correct_answers?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListFirstUserResultsQueryVariables = {
  user_id?: string | null,
  question_id?: ModelIDKeyConditionInput | null,
  filter?: ModelFirstUserResultFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListFirstUserResultsQuery = {
  listFirstUserResults?:  {
    __typename: "ModelFirstUserResultConnection",
    items?:  Array< {
      __typename: "FirstUserResult",
      user_id: string,
      question_id: string,
      name?: string | null,
      status?: string | null,
      answers?: Array< number | null > | null,
      correct_answers?: number | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type ListSortedQuestinsMasterQueryVariables = {
  dummy?: string | null,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelQuestionsMasterFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSortedQuestinsMasterQuery = {
  listSortedQuestinsMaster?:  {
    __typename: "ModelQuestionsMasterConnection",
    items?:  Array< {
      __typename: "QuestionsMaster",
      question_id: string,
      title: string,
      participants?: number | null,
      taken?: number | null,
      dummy: string,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type ListSortedQuestionsSubMasterQueryVariables = {
  question_id?: string | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelQuestionsSubMasterFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSortedQuestionsSubMasterQuery = {
  listSortedQuestionsSubMaster?:  {
    __typename: "ModelQuestionsSubMasterConnection",
    items?:  Array< {
      __typename: "QuestionsSubMaster",
      question_id: string,
      question_sub_id: number,
      question: string,
      ans: Array< string | null >,
      correct: number,
      comment?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type Question_idIndexKeyQueryVariables = {
  question_id?: string | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserResultFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type Question_idIndexKeyQuery = {
  question_idIndexKey?:  {
    __typename: "ModelUserResultConnection",
    items?:  Array< {
      __typename: "UserResult",
      user_id: string,
      question_id: string,
      name?: string | null,
      status?: string | null,
      answers?: Array< number | null > | null,
      correct_answers?: number | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type FirstUserResult_question_idIndexQueryVariables = {
  question_id?: string | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelFirstUserResultFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type FirstUserResult_question_idIndexQuery = {
  firstUserResult_question_idIndex?:  {
    __typename: "ModelFirstUserResultConnection",
    items?:  Array< {
      __typename: "FirstUserResult",
      user_id: string,
      question_id: string,
      name?: string | null,
      status?: string | null,
      answers?: Array< number | null > | null,
      correct_answers?: number | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type OnCreateQuestionsMasterSubscription = {
  onCreateQuestionsMaster?:  {
    __typename: "QuestionsMaster",
    question_id: string,
    title: string,
    participants?: number | null,
    taken?: number | null,
    questions?:  {
      __typename: "ModelQuestionsSubMasterConnection",
      nextToken?: string | null,
    } | null,
    dummy: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateQuestionsMasterSubscription = {
  onUpdateQuestionsMaster?:  {
    __typename: "QuestionsMaster",
    question_id: string,
    title: string,
    participants?: number | null,
    taken?: number | null,
    questions?:  {
      __typename: "ModelQuestionsSubMasterConnection",
      nextToken?: string | null,
    } | null,
    dummy: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteQuestionsMasterSubscription = {
  onDeleteQuestionsMaster?:  {
    __typename: "QuestionsMaster",
    question_id: string,
    title: string,
    participants?: number | null,
    taken?: number | null,
    questions?:  {
      __typename: "ModelQuestionsSubMasterConnection",
      nextToken?: string | null,
    } | null,
    dummy: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateQuestionsSubMasterSubscription = {
  onCreateQuestionsSubMaster?:  {
    __typename: "QuestionsSubMaster",
    question_id: string,
    question_sub_id: number,
    question: string,
    ans: Array< string | null >,
    correct: number,
    comment?: string | null,
    questionmaster?:  {
      __typename: "QuestionsMaster",
      question_id: string,
      title: string,
      participants?: number | null,
      taken?: number | null,
      dummy: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateQuestionsSubMasterSubscription = {
  onUpdateQuestionsSubMaster?:  {
    __typename: "QuestionsSubMaster",
    question_id: string,
    question_sub_id: number,
    question: string,
    ans: Array< string | null >,
    correct: number,
    comment?: string | null,
    questionmaster?:  {
      __typename: "QuestionsMaster",
      question_id: string,
      title: string,
      participants?: number | null,
      taken?: number | null,
      dummy: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteQuestionsSubMasterSubscription = {
  onDeleteQuestionsSubMaster?:  {
    __typename: "QuestionsSubMaster",
    question_id: string,
    question_sub_id: number,
    question: string,
    ans: Array< string | null >,
    correct: number,
    comment?: string | null,
    questionmaster?:  {
      __typename: "QuestionsMaster",
      question_id: string,
      title: string,
      participants?: number | null,
      taken?: number | null,
      dummy: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateUserResultSubscription = {
  onCreateUserResult?:  {
    __typename: "UserResult",
    user_id: string,
    question_id: string,
    name?: string | null,
    status?: string | null,
    answers?: Array< number | null > | null,
    correct_answers?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserResultSubscription = {
  onUpdateUserResult?:  {
    __typename: "UserResult",
    user_id: string,
    question_id: string,
    name?: string | null,
    status?: string | null,
    answers?: Array< number | null > | null,
    correct_answers?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserResultSubscription = {
  onDeleteUserResult?:  {
    __typename: "UserResult",
    user_id: string,
    question_id: string,
    name?: string | null,
    status?: string | null,
    answers?: Array< number | null > | null,
    correct_answers?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateFirstUserResultSubscription = {
  onCreateFirstUserResult?:  {
    __typename: "FirstUserResult",
    user_id: string,
    question_id: string,
    name?: string | null,
    status?: string | null,
    answers?: Array< number | null > | null,
    correct_answers?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateFirstUserResultSubscription = {
  onUpdateFirstUserResult?:  {
    __typename: "FirstUserResult",
    user_id: string,
    question_id: string,
    name?: string | null,
    status?: string | null,
    answers?: Array< number | null > | null,
    correct_answers?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteFirstUserResultSubscription = {
  onDeleteFirstUserResult?:  {
    __typename: "FirstUserResult",
    user_id: string,
    question_id: string,
    name?: string | null,
    status?: string | null,
    answers?: Array< number | null > | null,
    correct_answers?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
