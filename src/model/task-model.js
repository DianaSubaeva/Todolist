import Observable from '../framework/observable.js';
import { generateID } from '../utils.js';
import { UserAction, UpdateType } from '../const.js';

export default class TasksModel extends Observable {
  #tasksApiService = null;
  #boardTasks = [];

  constructor({tasksApiService}) {
    super();
    this.#tasksApiService = tasksApiService;
  }

  get tasks() {
    return this.#boardTasks;
  }

  async init() {
    try {
      const tasks = await this.#tasksApiService.tasks;
      this.#boardTasks = tasks;
    } catch(err) {
      this.#boardTasks = [];
    }
    this._notify(UpdateType.INIT);
  }

  async addTask(title) {
    const newTask = {
      title,
      status: 'backlog',
      id: generateID(),
    };
    try {
      const createdTask = await this.#tasksApiService.addTask(newTask);
      this.#boardTasks.push(createdTask);
      this._notify(UserAction.ADD_TASK, createdTask);
      return createdTask;
    } catch (err) {
      console.error('Ошибка при добавлении задачи на сервер:', err);
      throw err;
    }
  }

  async updateTask(taskId, newTitle) {
    const task = this.#boardTasks.find(task => task.id === taskId);
    if (task) {
      const previousTitle = task.title;
      task.title = newTitle;

      try {
        const updatedTask = await this.#tasksApiService.updateTask(task);
        Object.assign(task, updatedTask);
        this._notify(UserAction.UPDATE_TASK, task);
      } catch (err) {
        console.error('Ошибка при обновлении задачи на сервер:', err);
        task.title = previousTitle; 
        throw err;
      }
    }
  }

  async updateTaskStatus(taskId, newStatus) {
    const task = this.#boardTasks.find(task => task.id === taskId);
    if (task) {
      const previousStatus = task.status; 
      task.status = newStatus;

      try {
        const updatedTask = await this.#tasksApiService.updateTask(task);
        Object.assign(task, updatedTask);
        this._notify(UserAction.UPDATE_TASK, task);
      } catch (err) {
        console.error('Ошибка при обновлении статуса задачи на сервер:', err);
        task.status = previousStatus; 
        throw err;
      }
    }
  }

  deleteTask(taskId) {
    this.#boardTasks = this.#boardTasks.filter(task => task.id !== taskId);
    this._notify(UserAction.DELETE_TASK, { id: taskId });
  }

  async clearBasketTasks() {
    const basketTasks = this.#boardTasks.filter(task => task.status === 'bin');

    try {
      await Promise.all(basketTasks.map(task => this.#tasksApiService.deleteTask(task.id)));

      this.#boardTasks = this.#boardTasks.filter(task => task.status !== 'bin');
      this._notify(UserAction.DELETE_TASK, { status: 'bin' });

    } catch (err) {
      console.error('Ошибка при удалении задач из корзины на сервере:', err);
      throw err;
    }
  }

  hasBasketTasks() {
    return this.#boardTasks.some(task => task.status === 'bin');
  }
}