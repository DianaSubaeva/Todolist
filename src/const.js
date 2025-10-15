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