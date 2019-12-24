import { getInitialData } from '../utils/api';
import {
  addUserQuestion,
  saveUserAnswer,
  receiveUsers
} from '../actions/users';
import { _saveQuestionAnswer, _saveQuestion } from '../utils/_DATA';
import {
  addQuestion,
  receiveQuestions,
  saveQuestionAnswer
} from '../actions/questions';

export function handleAddQuestion(optionOneText, optionTwoText) {
  return async (dispatch, getState) => {
    const { authedUser } = getState();
    const saveQuestion = await _saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser
    });
    dispatch(addQuestion(saveQuestion));
    dispatch(addUserQuestion(authedUser, saveQuestion.id));
  };
}

export function handleAnswer(qid, option) {
  return async (dispatch, getState) => {
    const { authedUser } = getState();
    const info = {
      authedUser: authedUser,
      qid,
      answer: option
    };

    await _saveQuestionAnswer(info);
    dispatch(saveQuestionAnswer(authedUser, qid, option));
    dispatch(saveUserAnswer(authedUser, qid, option));
  };
}

export function handleInitialData() {
  return dispatch => {
    return getInitialData().then(({ users, questions }) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
    });
  };
}
