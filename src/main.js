import HeaderComponent  from './view/header-component.js';
import FormAddTaskComponent from './view/form-add-task-component.js';
import TaskBoardPresenter from './presenter/tasks-board-presenter.js';
import {render, RenderPosition} from './framework/render.js';
import TaskModel from './model/task-model.js';

const bodyContainer= document.querySelector('.board-app');
const formContainer= document.querySelector('.add-task-form');
const taskBoardContainer = document.querySelector('.task-board');
const taskModel = new TaskModel();


const taskBoardPresenter = new TaskBoardPresenter({
    boardContainer: taskBoardContainer,
    taskModel,
});


render(new HeaderComponent(), bodyContainer, RenderPosition.AFTERBEGIN);
render(new FormAddTaskComponent(), formContainer);

taskBoardPresenter.init();