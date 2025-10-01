import { TaskStatus } from '../const.js';

export const tasks = [
  {
    id: "1",
    title: "Сходить в магазин",
    status: TaskStatus.BACKLOG,
  },
  {
    id: "2", 
    title: "Пойти погулять",
    status: TaskStatus.BACKLOG,
  },
  {
    id: "3",
    title: "Устроиться на работу", 
    status: TaskStatus.BACKLOG,
  },
  {
    id: "4",
    title: "Почитать книгу",
    status: TaskStatus.BACKLOG,
  },
  {
    id: "5",
    title: "Выучить JS",
    status: TaskStatus.PROCESSING,
  },
  {
    id: "6", 
    title: "Выучить React",
    status: TaskStatus.PROCESSING,
  },
  {
    id: "7",
    title: "Заплатить за интернет",
    status: TaskStatus.PROCESSING,
  },
  {
    id: "8",
    title: "Сделать домашнее задание",
    status: TaskStatus.DONE,
  },
  {
    id: "9", 
    title: "Позвонить другу",
    status: TaskStatus.DONE,
  },
  {
    id: "10",
    title: "Прочитать Войну и мир",
    status: TaskStatus.BIN,
  },
  {
    id: "11",
    title: "Съездить погулять", 
    status: TaskStatus.BIN,
  }
];