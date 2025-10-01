import { createElement } from "../framework/render.js";
import { TaskStatusTitles } from '../const.js';

function createTaskListComponentTemplate() {
    return (
        `<div class="task-column backlog-column">
                <h3>Бэклог</h3>
                <ul class="tasks_list"></ul>
               
            </div>
        `
      );
}

export default class TaskListComponent {
  constructor(status) {
    this.status = status;
  }

  getTemplate() {
    const title = TaskStatusTitles[this.status] || this.status;
    
    return `
      <div class="task-list" data-status="${this.status}">
        <h3 class="task-list__title">${title}</h3>
        <ul class="tasks_list"></ul>
      </div>
    `;
  }

  getElement() {
    if (!this.element) {
      this.element = document.createElement('div');
      this.element.innerHTML = this.getTemplate();
    }
    return this.element;
  }
}