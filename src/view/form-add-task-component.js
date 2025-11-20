import {createElement} from '../framework/render.js'; 
import { AbstractComponent } from '../framework/view/abstract-component.js';

function createFormAddTaskComponentTemplate() {
  return `
    <form class="add-task-form">
      <input 
        type="text" 
        id="add-task" 
        placeholder="Новая задача..." 
        class="add-task-input"
      >
      <button type="submit" class="add-task-button">Добавить</button>
    </form>
  `;
}

export default class FormAddTaskComponent extends AbstractComponent {
  #handleClick = null;

  constructor(onClick) {
    super();
    
    if (typeof onClick !== 'function') {
      console.error('FormAddTaskComponent: onClick is not a function!', onClick);
      return;
    }
    
    this.#handleClick = onClick;
    this.element.addEventListener('submit', this.#clickHandler);
    
  }

  get template() {
    return createFormAddTaskComponentTemplate();
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    
    if (typeof this.#handleClick === 'function') {
     
      this.#handleClick();
    } else {
      console.error('handleClick is not a function:', this.#handleClick);
    }
  }; 
}