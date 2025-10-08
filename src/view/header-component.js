import {createElement} from '../framework/render.js'; 
import { AbstractComponent } from '../framework/view/abstract-component.js';

function createHeaderTemplate() {
  return (
     `<head>
    <title>Субаева Диана Ильдаровна - Список задач</title>
    <head>`
  )
  ;
}

export default class HeaderComponent extends AbstractComponent {
  constructor() {
    super();
  }

  get template() {
    return createHeaderTemplate();
  }
}