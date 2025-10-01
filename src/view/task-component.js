import { createElement } from "../framework/render.js";

function createTaskComponentTemplate(task) {
  const {title, status} = task;
  const taskClass = getTaskClass(status);
  
  return (
    `<div class="task ${taskClass}">
      <div class="task__body">
        <p class="task--view">${title}</p>
      </div>
      <button aria-label="Edit" class="task__edit" type="button"></button>
    </div>`
  );
}

function getTaskClass(status) {
  switch(status) {
    case 'Backlog': return 'backlog-task';
    case 'Processing': return 'progress-task';
    case 'Done': return 'done-task';
    case 'Bin': return 'trash-task';
    default: return '';
  }
}

export default class TaskComponent  {

  constructor({task}) {
    this.task = task;
    }

  getTemplate() {
    return createTaskComponentTemplate(this.task);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}