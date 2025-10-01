import { createElement } from "../framework/render.js";
import { TaskStatusTitles } from '../const.js';

function createTaskListComponentTemplate(status) {
    const title = TaskStatusTitles[status] || status;
    const columnClass = getColumnClass(status);
    
    return (
        `<div class="task-column ${columnClass}" data-status="${status}">
            <h3 class="task-list__title">${title}</h3>
            <ul class="tasks_list"></ul>
        </div>`
    );
}

function getColumnClass(status) {
    switch(status) {
        case 'Backlog': return 'backlog-column';
        case 'Processing': return 'progress-column';
        case 'Done': return 'done-column';
        case 'Bin': return 'trash-column';
        default: return '';
    }
}

export default class TaskListComponent {
    constructor(status) {
        this.status = status;
    }

    getTemplate() {
        return createTaskListComponentTemplate(this.status);
    }

    getElement() {
        if (!this.element) {
            this.element = createElement(this.getTemplate());
        }
        return this.element;
    }
}