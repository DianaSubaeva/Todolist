import {createElement} from '../framework/render.js'; 
import { AbstractComponent } from '../framework/view/abstract-component.js';

function createTaskTemplate(task) {
  const {title, description, dueDate, color} = task;
  
  return (`<div class="task ${taskClass}">
      <div class="task__body">
        <p class="task--view">${title}</p>
      </div>
      <button aria-label="Edit" class="task__edit" type="button"></button>
    </div>`);
}

export default class TaskComponent extends AbstractComponent {
  #task = null;

  constructor({task}) {
    super();
    this.#task = task;
  }

  get template() {
    return createTaskTemplate(this.#task);
  }
}