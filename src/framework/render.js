const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin', 
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

function createElement(template) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(template, 'text/html');
  return doc.body.firstElementChild;
}

function createElementManual(tagName, className, content) {
  const element = document.createElement(tagName);
  if (className) {
    element.className = className;
  }
  if (content) {
    element.textContent = content;
  }
  return element;
}

function render(component, container, place = RenderPosition.BEFOREEND) {
  const element = component.getElement();
  if (element && container) {
    container.insertAdjacentElement(place, element);
  }
}

export {RenderPosition, createElement, createElementManual, render};