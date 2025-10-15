import HeaderComponent  from './view/header-component.js';
import FormAddTaskComponent from './view/form-add-task-component.js';
import TaskBoardPresenter from './presenter/tasks-board-presenter.js';
import {render, RenderPosition} from './framework/render.js';
import TaskModel from './model/task-model.js';

const bodyContainer= document.querySelector('.board-app');
const formContainer= document.querySelector('.add-task-form');
const taskBoardContainer = document.querySelector('.task-board');
const taskModel = new TaskModel();

console.log('Containers found:');
console.log('bodyContainer:', bodyContainer);
console.log('formContainer:', formContainer);
console.log('taskBoardContainer:', taskBoardContainer);
console.log('taskModel tasks:', taskModel.tasks);


const taskBoardPresenter = new TaskBoardPresenter({
    boardContainer: taskBoardContainer,
    tasksModel: taskModel,
});

const formAddTaskComponent = new FormAddTaskComponent({
  onClick: handleNewTaskButtonClick
});

function handleNewTaskButtonClick() {
  taskBoardPresenter.createTask();
}

render(new HeaderComponent(), bodyContainer, RenderPosition.AFTERBEGIN);
render(formAddTaskComponent, formContainer);

taskBoardPresenter.init();