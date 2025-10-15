import TaskBoardComponent from '../view/task-board-component.js';
import TaskListComponent from '../view/task-list-component.js';
import TaskComponent from '../view/task-component.js';
import ClearButtonComponent from '../view/clear-button-component.js';
import PlugComponent from '../view/plug-component.js'; 
import { render } from '../framework/render.js';
import { TaskStatus, TaskStatusTitles } from '../const.js';

export default class TasksBoardPresenter {
  #taskBoardComponent = new TaskBoardComponent();
  #boardContainer = null;
  #tasksModel = null;
  #boardTasks = [];

  constructor({boardContainer, tasksModel}) {
    this.#boardContainer = boardContainer;
    this.#tasksModel = tasksModel;

    this.#tasksModel.addObserver(this.#handleModelChange.bind(this));
}
 get tasks() {
    return this.#tasksModel.tasks;
  }
 #handleModelChange() {
    console.log('Модель изменилась - перерисовываем доску');
    this.init(); 
}
 #clearBoard() {
    this.#taskBoardComponent.element.innerHTML = '';
  }

  init() {
     this.#clearBoard();
    this.#boardTasks = [...this.tasks];

    if (!this.#taskBoardComponent.element.parentElement) {
      this.#taskBoardComponent = new TaskBoardComponent();
      render(this.#taskBoardComponent, this.#boardContainer);
    }

    const lists = [
      { status: TaskStatus.BACKLOG, label: TaskStatusTitles[TaskStatus.BACKLOG] },
      { status: TaskStatus.PROCESSING, label: TaskStatusTitles[TaskStatus.PROCESSING] },
      { status: TaskStatus.DONE, label: TaskStatusTitles[TaskStatus.DONE] },
      { status: TaskStatus.BIN, label: TaskStatusTitles[TaskStatus.BIN] },
    ];

    for (const { status, label } of lists) {
      this.#renderTasksList(status, label);
    }
  }

  createTask() {
    const taskTitle = document.querySelector('#add-task').value.trim();
    
    if (!taskTitle) {
      return;
    }

    this.#tasksModel.addTask(taskTitle);
    document.querySelector('#add-task').value = '';
  }

  #renderTasksList(status, label) {
    const listComponent = new TaskListComponent(status);
    render(listComponent, this.#taskBoardComponent.element);

    const tasks = this.tasks.filter((task) => task.status === status);
    const tasksContainer = listComponent.element.querySelector('.tasks_list');

    if (tasks.length === 0) {
      this.#renderPlug(status, tasksContainer); 
    } else {
      tasks.forEach((task) => this.#renderTask(task, tasksContainer));
    }

    if (status === TaskStatus.BIN) {
      this.#renderClearButton(listComponent.element);
    }
  }

  #renderTask(task, container) {
    const taskComponent = new TaskComponent({ task });
    render(taskComponent, container);
  }

  #renderClearButton(container) {
    const button = new ClearButtonComponent();
    render(button, container);
  }

  #renderPlug(status, container) { 
    const plugComponent = new PlugComponent({status: status.toLowerCase()});
    render(plugComponent, container);
  }
}