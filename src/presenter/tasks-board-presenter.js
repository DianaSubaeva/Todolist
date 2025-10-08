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
  #taskModel = null;
  #boardTasks = [];

  constructor({ boardContainer, taskModel }) {
    this.#boardContainer = boardContainer;
    this.#taskModel = taskModel;
  }

  init() {
    this.#boardTasks = [...this.#taskModel.tasks];

    render(this.#taskBoardComponent, this.#boardContainer);

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

  #renderTasksList(status, label) {
    const listComponent = new TaskListComponent(status);
    render(listComponent, this.#taskBoardComponent.element);

    const tasks = this.#boardTasks.filter((task) => task.status === status);
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