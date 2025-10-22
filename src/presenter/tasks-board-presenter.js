import TaskBoardComponent from '../view/task-board-component.js';
import TaskListComponent from '../view/task-list-component.js';
import TaskComponent from '../view/task-component.js';
import ClearButtonComponent from '../view/clear-button-component.js';
import PlugComponent from '../view/plug-component.js'; 
import { render } from '../framework/render.js';
import { TaskStatus, TaskStatusTitles } from '../const.js';

export default class TasksBoardPresenter {
  #taskBoardComponent = null;
  #boardContainer = null;
  #tasksModel = null;
  #boardTasks = [];
   #clearButton = null;

  constructor({ boardContainer, tasksModel }) {
    this.#boardContainer = boardContainer;
    this.#tasksModel = tasksModel;

    this.#taskBoardComponent = new TaskBoardComponent();
    render(this.#taskBoardComponent, this.#boardContainer);

    this.#tasksModel.addObserver(this.#handleModelChange.bind(this));
  }

  get tasks() {
    return this.#tasksModel.tasks;
  }

  #handleModelChange() {
    this.init(); 

    this.#updateClearButtonState();
  }

  #clearBoard() {
    // Безопасная очистка - удаляем все дочерние элементы
    while (this.#taskBoardComponent.element.firstChild) {
      this.#taskBoardComponent.element.removeChild(this.#taskBoardComponent.element.firstChild);
    }
  }

  init() {
    if (!this.#taskBoardComponent.element.parentElement) {
      this.#taskBoardComponent = new TaskBoardComponent();
      render(this.#taskBoardComponent, this.#boardContainer);
    }
    
    this.#clearBoard();
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

  createTask() {
    const taskTitle = document.querySelector('#add-task').value.trim();
    
    if (!taskTitle) {
      return;
    }

    this.#tasksModel.addTask(taskTitle);
    document.querySelector('#add-task').value = '';
  }

  #handleTaskDrop(taskId, newStatus) {
    this.#tasksModel.updateTaskStatus(taskId, newStatus);
  }

  #handleClearBin() {
    this.#tasksModel.clearBin();
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
    const taskComponent = new TaskComponent({ task });
    render(taskComponent, container);
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