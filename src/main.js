import HeaderComponent  from './view/header-component.js';
import FormAddTaskComponent from './view/form-add-task-component.js';
import TaskBoardPresenter from './presenter/tasks-board-presenter.js';
import {render, RenderPosition} from './framework/render.js';
import TaskModel from './model/task-model.js'; 
import TasksApiService from './tasks-api-service.js';

const END_POINT = 'https://6908ce0b2d902d0651b1c737.mockapi.io';
const bodyContainer = document.querySelector('.board-app');
const formContainer = document.querySelector('.add-task-form');
const taskBoardContainer = document.querySelector('.task-board');
const taskModel = new TaskModel({
  tasksApiService: new TasksApiService(END_POINT)
});


const taskBoardPresenter = new TaskBoardPresenter({
    boardContainer: taskBoardContainer,
    tasksModel: taskModel,
});

const formAddTaskComponent = new FormAddTaskComponent(handleNewTaskButtonClick);

function handleNewTaskButtonClick() {
  taskBoardPresenter.createTask();
}

render(new HeaderComponent(), bodyContainer, RenderPosition.AFTERBEGIN);
render(formAddTaskComponent, formContainer);

taskBoardPresenter.init();
