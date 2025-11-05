import TaskBoardComponent from '../view/task-board-component.js';
import TaskListComponent from '../view/task-list-component.js';
import TaskComponent from '../view/task-component.js';
import TaskEditComponent from '../view/task-edit-component.js';
import ClearButtonComponent from '../view/clear-button-component.js';
import PlugComponent from '../view/plug-component.js'; 
import { render } from '../framework/render.js';
import { TaskStatus, TaskStatusTitles, UpdateType, UserAction } from '../const.js';
import LoadingViewComponent from '../view/loading-view-component.js';

export default class TasksBoardPresenter {
  #taskBoardComponent = null;
  #loadingComponent = null;
  #boardContainer = null;
  #tasksModel = null;
  #boardTasks = [];
  #clearButton = null;

  constructor({ boardContainer, tasksModel }) {
    this.#boardContainer = boardContainer;
    this.#tasksModel = tasksModel;

this.#showLoading();

    this.#taskBoardComponent = new TaskBoardComponent();
    render(this.#taskBoardComponent, this.#boardContainer);

    this.#tasksModel.addObserver(this.#handleModelEvent.bind(this));
  }
  #showLoading() {
    this.#loadingComponent = new LoadingViewComponent();
    render(this.#loadingComponent, this.#boardContainer);
  }

  #hideLoading() {
    if (this.#loadingComponent) {
      this.#loadingComponent.element.remove();
      this.#loadingComponent = null;
    }
  }

  get tasks() {
    return this.#tasksModel.tasks;
  }

 #handleModelEvent(event, payload) {
  switch (event) {
    case UserAction.ADD_TASK:
    case UserAction.UPDATE_TASK:
    case UserAction.DELETE_TASK:
      this.#clearBoard();
      this.#renderBoard();
      this.#hideLoading();
      this.#updateClearButtonState();
      break;
  }
}

  #clearBoard() {
    while (this.#taskBoardComponent.element.firstChild) {
      this.#taskBoardComponent.element.removeChild(this.#taskBoardComponent.element.firstChild);
    }
  }

  async init() {
    await this.#tasksModel.init();
    this.#clearBoard();
    this.#renderBoard();
  }

  #renderBoard() {
    this.#boardTasks = [...this.tasks];

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

  async createTask() {
  const taskTitle = document.querySelector('#add-task').value.trim();
  if (!taskTitle) {
    return;
  }
  try {
    await this.#tasksModel.addTask(taskTitle);
    document.querySelector('#add-task').value = '';
  } catch (err) {
    console.error('Ошибка при создании задачи:', err);
  }
}

  async #handleTaskDrop(taskId, newStatus) {
  try {
    await this.#tasksModel.updateTaskStatus(taskId, newStatus);
  } catch (err) {
    console.error('Ошибка при обновлении статуса задачи:', err);
  }
}

  async #handleClearBin() {
    try {
    await this.#tasksModel.clearBasketTasks();
  } catch (err) {
    console.error('Ошибка при очистке корзины:', err);
  }
  }
  

  #updateClearButtonState() {
    if (this.#clearButton) {
      const hasBinTasks = this.tasks.some(task => task.status === 'bin'); 
      this.#clearButton.disabled = !hasBinTasks;
    }
  }

  #renderTasksList(status, label) {
    const listComponent = new TaskListComponent({
      status: status,
      label: label,
      onTaskDrop: this.#handleTaskDrop.bind(this)
    });
    
    render(listComponent, this.#taskBoardComponent.element);

    const tasks = this.tasks.filter((task) => task.status === status);

    const tasksContainer = listComponent.element.querySelector('ul.tasks_list');
  
    if (!tasksContainer) {
      console.error('TASKS CONTAINER NOT FOUND!');
      return;
    }

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
  const taskComponent = new TaskComponent({
    task,
    onEditClick: this.#handleEditClick.bind(this)
  });
  
  render(taskComponent, container);
}
#handleEditClick = (task) => {
  console.log('Редактирование задачи:', task.id, task.title);
  this.#replaceTaskWithEditForm(task);
}

#replaceTaskWithEditForm(task) {
  const taskElement = document.querySelector(`[data-task-id="${task.id}"]`);
  if (!taskElement) return;
  const taskEditComponent = new TaskEditComponent({
    task,
    onFormSubmit: this.#handleEditFormSubmit.bind(this),
    onCancelClick: this.#handleEditCancel.bind(this)
  });
  taskElement.replaceWith(taskEditComponent.element);
}

#handleEditFormSubmit = async (taskId, newTitle) => {
  try {
    await this.#tasksModel.updateTask(taskId, newTitle);
  } catch (err) {
    console.error('Ошибка при обновлении задачи:', err);
  }
}

#handleEditCancel = () => {
  this.#clearBoard();
  this.#renderBoard();
}

  #renderClearButton(container) {
    const hasBinTasks = this.tasks.some(task => task.status === 'bin');
    
    const button = document.createElement('button');
    button.className = 'clear-btn';
    button.textContent = 'Очистить корзину';
    button.disabled = !hasBinTasks;
    
    button.addEventListener('click', () => this.#handleClearBin());
    
    container.appendChild(button);
    this.#clearButton = button; 
  }

  #renderPlug(status, container) { 
    const plugComponent = new PlugComponent({ status: status.toLowerCase() });
    render(plugComponent, container);
  }
}