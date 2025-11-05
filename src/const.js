export const TaskStatus = {
  BACKLOG: 'backlog',
  PROCESSING: 'processing', 
  DONE: 'done',
  BIN: 'bin'
};

export const TaskStatusTitles = {
  [TaskStatus.BACKLOG]: 'Бэклог',
  [TaskStatus.PROCESSING]: 'В процессе',
  [TaskStatus.DONE]: 'Готово', 
  [TaskStatus.BIN]: 'Корзина'
};

const UserAction = {
  UPDATE_TASK: 'UPDATE_TASK',
  ADD_TASK: 'ADD_TASK', 
  DELETE_TASK: 'DELETE_TASK',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR', 
  MAJOR: 'MAJOR',
  INIT: 'INIT'
};
export { UserAction, UpdateType };