import {createElement} from '../framework/render.js'; 
import { AbstractComponent } from '../framework/view/abstract-component.js';

function createFormAddTaskComponentTemplate() {
    return (
       `<form class="container">
        <h1>Список задач</h1>
         <div class="new-task">
            <h2>Новая задача</h2>
            <div class="new-task-input">
                <input type="text" placeholder="Название задачи">
                <button class="add-btn">+ Добавить</button>
            </div>
      </form>
        `
      );
}

export default class FormAddTaskComponent extends AbstractComponent {
  constructor(){
    super();
  }

  get template() {
    return createFormAddTaskComponentTemplate();
  }
}