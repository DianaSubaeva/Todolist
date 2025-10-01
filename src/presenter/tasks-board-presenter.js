import TaskBoardComponent from '../view/task-board-component.js';
import TaskListComponent from '../view/task-list-component.js';
import TaskComponent from '../view/task-component.js';
import {render} from '../framework/render.js';
import ClearButtonComponent from '../view/clear-button-component.js';
import {TaskStatus} from '../const.js';

export default class TaskBoardPresenter {
  #boardContainer = null;
  #taskModel = null;
  #taskBoardComponent = new TaskBoardComponent();
  #boardTasks = [];

  constructor({boardContainer, taskModel}) {
    this.#boardContainer = boardContainer;
    this.#taskModel = taskModel; // Исправлено: было tasksModel
  }

  init() {
    this.#boardTasks = [...this.#taskModel.getTasks()];

    render(this.#taskBoardComponent, this.#boardContainer);
    
    const statuses = [TaskStatus.BACKLOG, TaskStatus.PROCESSING, TaskStatus.DONE, TaskStatus.BIN];
    const listComponents = {}; // Добавлено: хранилище для компонентов списков
    
    for (const status of statuses) {
      const taskListComponent = new TaskListComponent(status);
      render(taskListComponent, this.#taskBoardComponent.getElement());
      
      // Сохраняем компонент для дальнейшего использования
      listComponents[status] = taskListComponent;

      const filteredTasks = this.#boardTasks.filter(task => task.status === status);
      
      const ul = taskListComponent.getElement().querySelector('.tasks_list');
      
      for (const task of filteredTasks) {
        const taskComponent = new TaskComponent({task});
        render(taskComponent, ul);
      }
    }
    
    // Рендерим кнопку очистки в колонке корзины
    render(new ClearButtonComponent(), listComponents[TaskStatus.BIN].getElement()); // Исправлено: было Status.CART
  }
}