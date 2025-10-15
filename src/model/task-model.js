import { tasks } from '../mock/task.js';
import { generateID } from '../utils.js';


export default class TaskModel {
  #boardTasks = [];
  #observers = [];

  constructor(tasks = []) {
    this.#boardTasks = tasks;
  }

  get tasks() {
    return this.#boardTasks;
  }

  getTasksByStatus(status) {
    return this.#boardTasks.filter(task => task.status === status);
  }
   addTask(title) {
    const newTask = {
      title,
      status: 'backlog',
      id: generateID(), 
    };
        this.#boardTasks.push(newTask);
    this._notifyObservers();
    return newTask;
  }

  addObserver(observer) {
    this.#observers.push(observer);
  }

  removeObserver(observer) {
    this.#observers = this.#observers.filter((obs) => obs !== observer);
  }

  _notifyObservers() {
    this.#observers.forEach((observer) => observer());
  }

  clearBin() {
  const binTasksCount = this.#boardTasks.filter(task => task.status === 'bin').length;
  this.#boardTasks = this.#boardTasks.filter(task => task.status !== 'bin');
  this._notifyObservers();
}
}
