import { AbstractComponent } from '../framework/view/abstract-component.js';

function createTaskEditTemplate(task) {
  return `
    <div class="task task--edit" data-task-id="${task.id}">
      <form class="task-edit-form">
        <input 
          type="text" 
          class="task-edit-input" 
          value="${task.title}" 
          required
        >
        <div class="task-edit-buttons">
          <button type="submit" class="task-edit-save">✓</button>
          <button type="button" class="task-edit-cancel">✕</button>
        </div>
      </form>
    </div>
  `;
}

export default class TaskEditComponent extends AbstractComponent {
  #task = null;
  #handleFormSubmit = null;
  #handleCancelClick = null;

  constructor({ task, onFormSubmit, onCancelClick }) {
    super();
    this.#task = task;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleCancelClick = onCancelClick;
    
    this.#setEventListeners();
  }

  get template() {
    return createTaskEditTemplate(this.#task);
  }

  #setEventListeners() {
    this.element.querySelector('.task-edit-form')
      .addEventListener('submit', this.#formSubmitHandler);
      
    this.element.querySelector('.task-edit-cancel')
      .addEventListener('click', this.#cancelClickHandler);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    const input = this.element.querySelector('.task-edit-input');
    const newTitle = input.value.trim();
    
    if (newTitle) {
      this.#handleFormSubmit(this.#task.id, newTitle);
    }
  }

  #cancelClickHandler = () => {
    this.#handleCancelClick();
  }
}