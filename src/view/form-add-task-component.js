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
    
    console.log('FormAddTaskComponent constructor called with:', onClick);
    console.log('Type of onClick:', typeof onClick);
    
    // Проверяем, что передана функция
    if (typeof onClick !== 'function') {
      console.error('FormAddTaskComponent: onClick is not a function!', onClick);
      return;
    }
    
    this.#handleClick = onClick;
    this.element.addEventListener('submit', this.#clickHandler);
    
    console.log('FormAddTaskComponent initialized successfully');
  }

  get template() {
    return createFormAddTaskComponentTemplate();
  }

  #clickHandler = (evt) => {
    console.log('Form submit handler called');
    evt.preventDefault();
    
    if (typeof this.#handleClick === 'function') {
      console.log('Calling handleClick');
      this.#handleClick();
    } else {
      console.error('handleClick is not a function:', this.#handleClick);
    }
  };
}