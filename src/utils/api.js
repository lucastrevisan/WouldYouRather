import { _getUsers, _getQuestions } from './_DATA.js';

export async function getInitialData() {
  const users = await _getUsers();
  const questions = await _getQuestions();

  return {
    users,
    questions
  };
}
