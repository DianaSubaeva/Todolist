import {createElement} from '../framework/render.js'; 
import { AbstractComponent } from '../framework/view/abstract-component.js';

function createTaskBoardTemplate() {
  return  `<div class="tasks-container">
        
        </div>
        `;
}

export default class TaskBoardComponent extends AbstractComponent {
  constructor() {
    super();
  }

  get template() {
    return createTaskBoardTemplate();
  }
}