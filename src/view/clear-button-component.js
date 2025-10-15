import {createElement} from '../framework/render.js'; 
import { AbstractComponent } from '../framework/view/abstract-component.js';

function createClearButtonTemplate(isDisabled = false) {
  return `
    <button 
      type="button" 
      class="clear-btn" 
      ${isDisabled ? 'disabled' : ''}
    >
      Очистить корзину
    </button>
  `;
}

export default class ClearButtonComponent extends AbstractComponent {
  #handleClick = null;
  #isDisabled = false;

  constructor(onClick, isDisabled = false) {
    super();
    this.#handleClick = onClick;
    this.#isDisabled = isDisabled;
    this.element.addEventListener('click', this.#clickHandler);
  }

  get template() {
    return createClearButtonTemplate(this.#isDisabled);
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    if (!this.#isDisabled && this.#handleClick) {
      this.#handleClick();
    }
  };

  updateState(isDisabled) {
    this.#isDisabled = isDisabled;
    this.rerender();
  }

  rerender() {
    const oldElement = this.element;
    const parent = oldElement.parentElement;
    this.removeElement();

    const newElement = this.element;
    parent.replaceChild(newElement, oldElement);
    this.restoreHandlers();
  }

  restoreHandlers() {
    this.element.addEventListener('click', this.#clickHandler);
  }
}