import {createElement} from '../framework/render.js'; 
import { AbstractComponent } from '../framework/view/abstract-component.js';
import { TaskStatusTitles } from '../const.js';
function getColumnClass(status) {
    switch(status) {
        case 'Backlog': return 'backlog-column';
        case 'Processing': return 'progress-column';
        case 'Done': return 'done-column';
        case 'Bin': return 'trash-column';
        default: return '';
    }
}

function createTaskListTemplate(status) {
    const title = TaskStatusTitles[status] || status;
    const columnClass = getColumnClass(status); 
  return  `<div class="task-column ${columnClass}" data-status="${status}">
            <h3 class="task-list__title">${title}</h3>
            <ul class="tasks_list"></ul>
        </div>`;
}

export default class TaskListComponent extends AbstractComponent {
  #status = null;

  constructor(status) {
    super();
    this.#status = status;
  }

  get template() {
    return createTaskListTemplate(this.#status);
  }
}