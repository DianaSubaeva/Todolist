import {createElement} from '../framework/render.js'; 
import { AbstractComponent } from '../framework/view/abstract-component.js';

function createClearButtonTemplate() {
    return (
         '<button class="clear-btn">Очистить</button>'
    );
}

export default class ClearButtonComponent extends AbstractComponent {
  getTemplate() {
    return createClearButtonTemplate();
  }
}