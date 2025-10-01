export const TaskStatus = {
  BACKLOG: 'Backlog',
  PROCESSING: 'Processing', 
  DONE: 'Done',
  BIN: 'Bin'
};

export const TaskStatusTitles = {
  [TaskStatus.BACKLOG]: 'Бэклог',
  [TaskStatus.PROCESSING]: 'В процессе',
  [TaskStatus.DONE]: 'Готово', 
  [TaskStatus.BIN]: 'Корзина'
};