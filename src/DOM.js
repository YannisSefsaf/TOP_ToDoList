import {
  returnArrSortedByProject,
  returnArrSortedByDate,
  deleteItemArr,
  returnToDoArr,
} from "./models";
import { getDateCount, getInboxCount, projectArr } from "./models";
import { Project, getProjectCount } from "./models";
import { ListItem } from "./models";

/* QUERY SELECTORS */

/* MAIN GRID */
const todoGrid = document.querySelector(".main-section__todo-grid");

/* BUTTONS */
const buttonAddItem = document.querySelector("#itemButton"); // OK
const buttonAddProject = document.querySelector("#projectButton"); // OK
const showTodoForm = document.querySelector(".main-section__add-todo"); //
const buttonCancel = document.querySelector(".button__cancel");

/* FORM ADD PROJECT */
const formProjectName = document.querySelector("#projectName");

/* FORM ADD TODO */
const todoName = document.querySelector("#name");
const todoDescription = document.querySelector("#description");
const todoProject = document.querySelector("#project");
const todoPriority = document.querySelector("#priority");
const todoDueDate = document.querySelector("#dueDate");
const todoStatus = document.querySelector("#status");

/* SIDEBAR SELECTORS  */

/* SIDEBAR - ADD PROJECT */
const plus = document.querySelector("#projectAdd");

/* SIDEBAR - EXPAND ARROWS */
const allArrows = document.querySelectorAll(
  ".sidebar__group-two-icon-arrow-img"
);

const arrowShowProjects = document.querySelector(
  ".sidebar__group-two-icon-arrow-img-1"
);
const arrowShowLabels = document.querySelector(
  ".sidebar__group-two-icon-arrow-img-2"
);
const arrowShowFilters = document.querySelector(
  ".sidebar__group-two-icon-arrow-img-3"
);

/* SIDEBAR - EXPANDABLE CONTAINERS */
const sidebarProjectGroup = document.querySelector(
  ".sidebar__group-two-expandable-projects"
);
const sidebarProjectNames = document.querySelector(
  "#sidebar__group-two-expandable-project-names"
);
const sidebarProjectCount = document.querySelector(
  "#sidebar__group-two-expandable-project-count"
);
const sidebarLabelGroup = document.querySelector(
  ".sidebar__group-two-expandable-labels"
);
const sidebarFilterGroup = document.querySelector(
  ".sidebar__group-two-expandable-filters"
);

/* SIDEBAR - INBOX AND BY DATES */
const inboxLink = document.querySelector("#inbox");
const todayLink = document.querySelector("#today");
const nextWeekLink = document.querySelector("#nextWeek");

const isCompleted = document.querySelector("#completed");
const isNotCompleted = document.querySelector("#notcompleted");

/* SEARCH BAR */
const input = document.querySelector(".navbar__search-bar-container");

/* BACKGROUND */
const background = document.querySelector(".background");

/* EVENT LISTENERS */
showTodoForm.addEventListener("click", showAddTodoForm);
buttonCancel.addEventListener("click", hideAddTodoForm);
buttonAddItem.addEventListener("click", addToDoFromArrToDOM);
buttonAddProject.addEventListener("click", addProjectToDOM);
arrowShowProjects.addEventListener("click", () => {
  if (sidebarProjectGroup.classList.contains("show")) {
    /*     sidebarProjectGroup.classList.add("collapsing"); */
    sidebarProjectGroup.classList.remove("show");
    arrowShowProjects.classList.remove("collapsed");
  } else {
    sidebarProjectGroup.classList.add("show");
    arrowShowProjects.classList.add("collapsed");
    /*    sidebarProjectGroup.classList.add("collapsing"); */
  }
});
arrowShowProjects.addEventListener("transitionend", () => {
  sidebarProjectGroup.classList.remove("collapsing");
});
arrowShowLabels.addEventListener("click", () => {
  if (sidebarLabelGroup.classList.contains("show")) {
    sidebarLabelGroup.classList.add("collapsing");
    sidebarLabelGroup.classList.remove("show");
    arrowShowLabels.classList.remove("collapsed");
  } else {
    sidebarLabelGroup.classList.add("show");
    arrowShowLabels.classList.add("collapsed");
    sidebarLabelGroup.classList.add("collapsing");
  }
});
arrowShowLabels.addEventListener("transitionend", () => {
  sidebarLabelGroup.classList.remove("collapsing");
});
arrowShowFilters.addEventListener("click", () => {
  if (sidebarFilterGroup.classList.contains("show")) {
    sidebarFilterGroup.classList.add("collapsing");
    sidebarFilterGroup.classList.remove("show");
    arrowShowFilters.classList.remove("collapsed");
  } else {
    sidebarFilterGroup.classList.add("show");
    arrowShowFilters.classList.add("collapsed");
    sidebarFilterGroup.classList.add("collapsing");
  }
});
arrowShowFilters.addEventListener("transitionend", () => {
  sidebarFilterGroup.classList.remove("collapsing");
});
input.addEventListener("keyup", searchItems);
inbox.addEventListener("click", (e) => {
  let arr = returnToDoArr();
  let tabName = document.querySelector(".main-section__title");
  tabName.textContent = `${e.target.textContent}`;
  createDOMFromArr(arr);
  makeProjectLinks();
  createDateCount();
});
background.addEventListener("click", removeProjectForm);
plus.addEventListener("click", showAddProjectForm);
today.addEventListener("click", switchProjectDate);

/* EVENT LISTENER FUNCTIONS */

/* EVENT LISTENER FUNCTIONS - SHOW/HIDE */

function showAddTodoForm() {
  let showTodoForm = document.querySelector(".main-section__add-todo");
  let formContainer = document.querySelector(".form__add-todo-container");
  showTodoForm.classList.add("hide");
  formContainer.classList.remove("hide");
}

function hideAddTodoForm() {
  let showTodoForm = document.querySelector(".main-section__add-todo");
  let formContainer = document.querySelector(".form__add-todo-container");
  showTodoForm.classList.remove("hide");
  formContainer.classList.add("hide");
}

function showAddProjectForm() {
  let addProjectForm = document.querySelector(".form__add-project");
  let background = document.querySelector(".background");
  addProjectForm.classList.add("show");
  background.classList.add("show");
} // OK

function removeProjectForm() {
  let addProjectForm = document.querySelector(".form__add-project");
  let background = document.querySelector(".background");
  addProjectForm.classList.remove("show");
  background.classList.remove("show");
} // OK

/* EVENT LISTENER FUNCTIONS - CREATE TODO & PROJECT */

function addToDoFromArrToDOM(e) {
  e.preventDefault(); // prevent default submit action // returns newItemArr which is all the fields needed to create the DOM entry
  createItemDOM(addTodoToArr()); //
  createDOMFromArr(returnArr());
  refreshProjectDOM();
  makeProjectLinks();
  createDateCount();
  resetForm();
} // OK

function addProjectToDOM(e) {
  e.preventDefault();
  addProjectToArr();
  createProjectDOM();
  fromProjectName.value = "";
  removeProjectForm();
  refreshProjectDOM();
  makeProjectLinks();
  createDateCount();
} // OK

/* HELPER FUNCTIONS */
function createElem(type, cls, txtContent, imgSrc) {
  let newElem = document.createElement(type);
  if (!(cls === "")) {
    newElem.classList.add(cls);
  }
  newElem.textContent = txtContent;
  newElem.src = imgSrc;
  return newElem;
} // OK

function priorityConvert(priority) {
  let color;
  priority === "1"
    ? (color = "green")
    : priority === "2"
    ? (color = "blue")
    : priority === "3"
    ? (color = "red")
    : (color = "grey");
  return color;
} // OK

function createItemDOM(name, project, date, priority, status, id) {
  let todoItem = createElem("div", "todo-item");
  todoItem.dataset.id = `${id}`;
  let itemGroupOne = createElem("div", "todo-item__group-one");
  let itemGroupTwo = createElem("div", "todo-item__group-two");
  let statusCircle = createElem("div", "todo-item__status-circle");
  statusCircle.classList.add(priority);
  let taskName = createElem("p", "todo-item__task-title", `${name} - `);
  let projectName = createElem("span", "todo-item__project-name", `${project}`);
  let dueDate = createElem("p", "todo-item__due-date", `${date}`);
  let buttonDetails = createElem("a", "button__details", "Details");
  buttonDetails.classList.add("button");
  let editImg = createElem("img", "todo-item__icon", "", "../src/img/edit.png");
  let delImg = createElem(
    "img",
    "todo-item__icon",
    "",
    "../src/img/delete.png"
  );
  delImg.classList.add("delete__icon");
  delImg.dataset.id = `${id}`;

  taskName.appendChild(projectName);
  task.appendChild(taskName);
  task.appendChild(dueDate);
  itemGroupOne.appendChild(statusCircle);
  itemGroupOne.appendChild(task);
  itemGroupTwo.appendChild(buttonDetails);
  itemGroupTwo.appendChild(editImg);
  itemGroupTwo.appendChild(delImg);
  todoItem.appendChild(itemGroupOne);
  todoItem.appendChild(itemGroupTwo);
  todoGrid.appendChild(todoItem);
} // OK

/* SORTING & SEARCHING FUNCTIONS */

function searchItems() {
  let filter = input.value.toUpperCase();
  let li = document.querySelectorAll(".todo-item__task-title");
  let todoItems = document.querySelectorAll(".todo-item");
  // Loop through all list items, and hide those who don't match the search query
  for (let i = 0; i < li.length; i++) {
    let a = li[i];
    let txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      todoItems[i].style.display = "";
    } else {
      todoItems[i].style.display = "none";
    }
  }
} // OK

function switchTabTitle(e) {
  input.value = "";
  let tabName = document.querySelector(".main-section__title");
  tabName.textContent = `${e.target.textContent}`;
  return tabName.textContent;
} // OK

function sortByProject(projectName) {
  let li = document.querySelectorAll(".todo-item__project-name");
  let todoItems = document.querySelectorAll(".todo-item");
  // Loop through all list items, and hide those who don't match the search query
  for (let i = 0; i < li.length; i++) {
    let a = li[i];
    let txtValue = a.textContent || a.innerText;
    if (txtValue.indexOf(projectName) > -1) {
      todoItems[i].style.display = "";
    } else {
      todoItems[i].style.display = "none";
    }
  }
} // OK

function switchProject(e) {
  let arr = returnArrSortedByProject(switchTabTitle(e));
  console.log(arr);
  createDOMFromArr(arr);
  makeProjectLinks();
  createDateCount();
}

function switchProjectDate(e) {
  let arr = returnArrSortedByDate(switchTabTitle(e));
  createDOMFromArr(arr);
  makeProjectLinks();
  createDateCount();
}

/* MAKE LINKS */

function makeProjectLinks() {
  let deleteIcon = document.querySelectorAll(".delete__icon");
  let projectLinks = document.querySelectorAll(
    ".sidebar__group-two-expandable-project-name"
  );
  projectLinks.forEach((project) =>
    project.addEventListener("click", switchProject)
  );
  deleteIcon.forEach((icon) => icon.addEventListener("click", deleteItemArr));
} // OK

/* CREATE DOM - MAIN SECTION */

function createDOMFromArr(arr) {
  document.querySelector(".main-section__todo-grid").innerHTML = "";
  for (let elem of arr) {
    createItemDOM(
      elem.name,
      elem.project,
      elem.dueDate,
      priorityConvert(elem.priority),
      elem.status,
      elem.id
    );
  }
} // OK

function createProjectDOM() {
  sidebarProjectNames.innerHTML = "";
  sidebarProjectCount.innerHTML = "";
  for (let i = 0; i < projectArr.length; i++) {
    let li = createElem(
      "li",
      "sidebar__group-two-expandable-project-name",
      `${projectArr[i].project}`
    );
    let liCount = createElem(
      "li",
      "sidebar__group-two-expandable-project-count",
      `${getProjectCount(projectArr[i].project)}`
    );
    sidebarProjectNames.appendChild(li);
    sidebarProjectCount.appendChild(liCount);
  }
} // OK

function createDateCount() {
  const inboxCount = document.querySelector("#inboxCount");
  const todayCount = document.querySelector("#todayCount");
  inboxCount.textContent = getInboxCount(returnToDoArr());
  todayCount.textContent = getDateCount("Today");
}

function refreshProjectDOM() {
  const project = document.querySelector("#project");
  const sidebarProjectNames = document.querySelector(
    "#sidebar__group-two-expandable-project-names"
  );
  const sidebarProjectCount = document.querySelector(
    "#sidebar__group-two-expandable-project-count"
  );

  project.innerHTML = `<option class="default" selected>Select Project</option>`;
  sidebarProjectNames.innerHTML = "";
  sidebarProjectCount.innerHTML = "";
  for (let i = 0; i < projectArr.length; i++) {
    let option = createElem("option", "option", `${projectArr[i].project}`);
    let li = createElem(
      "li",
      "sidebar__group-two-expandable-project-name",
      `${projectArr[i].project}`
    );
    let liCount = createElem(
      "li",
      "sidebar__group-two-expandable-project-count",
      `${getProjectCount(projectArr[i].project)}`
    );
    project.appendChild(option);
    sidebarProjectNames.appendChild(li);
    sidebarProjectCount.appendChild(liCount);
  }
} // OK

function returnArr() {
  let tabName = document.querySelector(".main-section__title").textContent;
  let arr;
  if (!(tabName === "Inbox")) {
    return (arr = returnArrSortedByProject(tabName));
  } else {
    return (arr = returnToDoArr());
  }
} // OK

function addTodoToArr() {
  let newItem = new ListItem(
    todoName.value,
    description.value,
    project.value,
    dueDate.value,
    priority.value,
    todoStatus.value,
    Math.floor(Math.random() * 100)
  ); // create new Todo class item
  returnToDoArr().push(newItem); // push item to todo array
  let newItemArr = [
    newItem.name,
    newItem.project,
    newItem.dueDate,
    priorityConvert(newItem.priority),
    newItem.status,
  ];
  return newItemArr;
} // OK

function resetForm() {
  todoName.value = "";
  description.value = "";
  project.value = "Select Project";
  dueDate.value = "";
  priority.value = "Select Priority";
  todoStatus.value = "Select Status";
} // OK

function addProjectToArr() {
  let newProject = new Project(fromProjectName.value, []);
  projectArr.push(newProject);
} // OK

export {
  createElem,
  priorityConvert,
  createItemDOM,
  searchItems,
  switchTabTitle,
  sortByProject,
  switchProject,
  showAddProjectForm,
  removeProjectForm,
  makeProjectLinks,
  createDOMFromArr,
  createProjectDOM,
  refreshProjectDOM,
  addToDoFromArrToDOM,
  returnArr,
  addTodoToArr,
  resetForm,
  addProjectToDOM,
  addProjectToArr,
  createDateCount,
};
