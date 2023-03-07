import {
  createDOMFromArr,
  makeProjectLinks,
  refreshProjectDOM,
  switchTabTitle,
  createDateCount,
} from "./DOM";

export class Project {
  constructor(project, todoArr) {
    this.project = project;
    this.todoArr = todoArr;
  }
}

export class ListItem {
  constructor(name, details, project, dueDate, priority, status, id) {
    this.name = name;
    this.details = details;
    this.project = project;
    this.dueDate = dueDate;
    this.priority = priority;
    this.status = status;
    this.id = id;
  }
}

let todoArr = [];

let newItem = new ListItem(
  "Contactar red de amigas",
  "Marketing",
  "Corporal Designer",
  "Today",
  "3",
  "Not Completed",
  1
);

let newItem2 = new ListItem(
  "Preparar cita lunes",
  "Marketing",
  "Despacho",
  "04/02/2023",
  "2",
  "Started",
  2
);

let newItem3 = new ListItem(
  "Revisar lluvia de ideas",
  "Social Media",
  "Corporal Designer",
  "05/02/2023",
  "1",
  "Not Completed",
  3
);

let newItem4 = new ListItem(
  "Agendar cita con Primo y socios",
  "Marketing",
  "Despacho",
  "06/02/2023",
  "2",
  "Not Completed",
  4
);

let newItem5 = new ListItem(
  "Revisar catalogo de servicios",
  "Marketing",
  "Despacho",
  "06/02/2023",
  "2",
  "Not Completed",
  5
);

todoArr.push(newItem, newItem2, newItem3, newItem4, newItem5);

function deleteItemArr(e) {
  let tabName = document.querySelector(".main__title").textContent;
  let pos = todoArr.findIndex(
    (item) => item.id === Number(e.target.dataset.id)
  );
  todoArr.splice(pos, 1);
  let arr;
  if (tabName === "Today" || tabName === "Next 7 days") {
    arr = returnArrSortedByDate(tabName);
  } else if (tabName === "Inbox") {
    arr = todoArr;
  } else {
    arr = returnArrSortedByProject(tabName);
  }
  if (arr.length === 0) {
    arr = todoArr;
    document.querySelector(".main__title").textContent = "Inbox";
  }
  createDOMFromArr(arr);
  refreshProjectDOM();
  makeProjectLinks();
  createDateCount();
}

function returnArrSortedByProject(projectName) {
  let sortedArr;
  if (projectName === "Inbox") {
    sortedArr = todoArr;
  } else {
    sortedArr = todoArr.filter((todo) => todo.project === projectName);
  }
  return sortedArr;
}

function returnArrSortedByDate(date) {
  let sortedArr = todoArr.filter((todo) => todo.dueDate === date);
  return sortedArr;
}

function returnToDoArr() {
  return todoArr;
}

export {
  returnToDoArr,
  deleteItemArr,
  returnArrSortedByProject,
  returnArrSortedByDate,
};

let projectArr = [];

let newProj1 = new Project(
  "Corporal Designer",
  returnArrSortedByProject("Corporal Designer")
);
let newProj2 = new Project("Despacho", returnArrSortedByProject("Despacho"));

projectArr.push(newProj1, newProj2);

function addToDoItemToProjectClass(item, projectName) {
  for (let project of projectArr) {
    if (projectName === project.project) {
      project.todoArr.push(item);
    }
  }
}

function getProjectList(arr) {
  let sumOfObj = arr.reduce(function (obj, item, project) {
    if (!obj[item.project]) {
      obj[item.project] = 0;
    }
    obj[item.project]++;
    return obj;
  }, {});
  return sumOfObj;
}

function getProjectNames(arr) {
  let namesArr = [];
  for (let obj in getProjectList(arr)) {
    namesArr.push(obj);
  }
  return namesArr;
}

function getProjectCount(projectName) {
  let todoArr = returnToDoArr();
  let proArr = todoArr.filter((todo) => todo.project === projectName);
  return proArr.length;
}

function getInboxCount(arr) {
  return arr.length;
}

function getDateCount(date) {
  let todoArr = returnToDoArr();
  let dateArr = todoArr.filter((todo) => todo.dueDate === date);
  return dateArr.length;
}

/* function getProjectCount(arr) {
    let obj = getProjectList(arr);
    let countProjectArr = [];
    for (let prop in obj) {
      countProjectArr.push(obj[prop]);
    }
    return countProjectArr;
  } */

export {
  projectArr,
  addToDoItemToProjectClass,
  getProjectList,
  getProjectNames,
  getProjectCount,
  getInboxCount,
  getDateCount,
};
