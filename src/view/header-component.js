import {createElement} from '../framework/render.js'; 


function createHeaderComponentTemplate() {
    return (
        `<head>
    <title>Субаева Диана Ильдаровна - Список задач</title>
    <head>`
      );
}


export default class HeaderComponent {
  getTemplate() {
    return createHeaderComponentTemplate();
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
