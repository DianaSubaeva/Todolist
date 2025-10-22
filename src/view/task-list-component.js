import {createElement} from '../framework/render.js'; 
import { AbstractComponent } from '../framework/view/abstract-component.js';
import { TaskStatusTitles } from '../const.js';
function getColumnClass(status) {
    switch(status) {
        case 'backlog': return 'backlog-column';
        case 'processing': return 'progress-column';
        case 'done': return 'done-column';
        case 'bin': return 'trash-column';
        default: return '';
    }
}

function createTaskListComponent(status) {
    const title = TaskStatusTitles[status] || status;
    const columnClass = getColumnClass(status); 
  return  `<div class="task-column ${columnClass}" data-status="${status}">
            <h3 class="task-list__title">${title}</h3>
            <ul class="tasks_list"></ul>
        </div>`;
}

export default class TaskListComponent extends AbstractComponent {
  constructor({ status, label, onTaskDrop }) {
    super();
    this.status = status;
    this.label = label;
    this.#setDropHandler(onTaskDrop);
  }

  get template() {
    return createTaskListComponent(this.status, this.label);
  }

  #setDropHandler(onTaskDrop) {
    const container = this.element;

    container.addEventListener('dragover', (event) => {
      event.preventDefault();
    });

    container.addEventListener('drop', (event) => {
      event.preventDefault();
      const taskId = event.dataTransfer.getData('text/plain');
      const dropPosition = this.#getDropPosition(event);
      onTaskDrop(taskId, this.status, dropPosition); 
    });
  }
  #getDropPosition(event) {
  const tasks = this.element.querySelectorAll('.task');
  const containerRect = this.element.getBoundingClientRect();
  const mouseY = event.clientY - containerRect.top;


  if (tasks.length === 0) {
    return 0;
  }
  
  for (let i = 0; i < tasks.length; i++) {
    const taskRect = tasks[i].getBoundingClientRect();
    const taskTop = taskRect.top - containerRect.top;
    const taskMiddle = taskTop + taskRect.height / 2;
    
    if (mouseY < taskMiddle) {
      return i; 
    }
  }
  
  return tasks.length; 
}
}