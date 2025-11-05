import {createElement} from '../framework/render.js'; 
import { AbstractComponent } from '../framework/view/abstract-component.js';

function getTaskClass(status) {
    switch(status) {
        case 'Backlog': return 'backlog-task';
        case 'Processing': return 'progress-task';
        case 'Done': return 'done-task';
        case 'Bin': return 'trash-task';
        default: return '';
    }
}

function createTaskComponentTemplate(task) {
  const {title, status, id} = task;
  const taskClass = getTaskClass(status);
  
  return `<div class="task ${taskClass}" data-task-id="${id}">
      <div class="task__body">
        <p class="task--view">${title}</p>
      </div>
      <button aria-label="Edit" class="task__edit" type="button">✏️</button>
    </div>`;
}

export default class TaskComponent extends AbstractComponent {
  #handleEditClick = null;

  constructor({ task, onEditClick }) {
    super();
    this.task = task;
    this.#handleEditClick = onEditClick;
    this.#afterCreateElement();
  }

  get template() {
    return createTaskComponentTemplate(this.task);
  }

  #afterCreateElement() {
    this.#makeTaskDraggable();
    this.#setEditButtonHandler();
  }

  #makeTaskDraggable() {
    this.element.setAttribute('draggable', true);

    this.element.addEventListener('dragstart', (event) => {
      event.dataTransfer.setData('text/plain', this.task.id);
    });
  }

  #setEditButtonHandler() {
    const editButton = this.element.querySelector('.task__edit');
    if (editButton && this.#handleEditClick) {
      editButton.addEventListener('click', this.#editClickHandler);
    }
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
    this.#handleEditClick(this.task);
  }
}