// storage.js

import { Todo, Project, TodoList } from "./models.js";
import { TodoListView } from "./UI.js";

let projects = [];
let todos = [];
let observers = [];
let defaultProject = null;
let initialized = false;

// Save the todo list data to local storage
export function saveTodoList(projects, todos, observers, defaultProject) {
  const data = { projects, todos, observers, defaultProject };
  localStorage.setItem("todoList", JSON.stringify(data));
}

// Load the todo list data from local storage and initiate page
export function loadTodoList() {
  const data = JSON.parse(localStorage.getItem("todoList"));
  let initialized = JSON.parse(localStorage.getItem("initialized"));

  if (!initialized) {
    // Page has not been initialized yet
    initialized = true;
    localStorage.setItem("initialized", JSON.stringify(initialized));

    // Run the initiation process here
    initiateTodoList();
  } else {
    if (data) {
      projects = loadProjects(data);
      observers = loadObservers(data);
      defaultProject = loadDefaultProject(data);
      todos = loadTodos(data);
    } else {
      // Data is not available
      initiateTodoList();
    }

    const newTodoList = new TodoList(projects, todos);
    const todoListView = new TodoListView(newTodoList);
  }
}

// helper functions
function initiateTodoList() {
  const project1 = new Project("Personal");
  const project2 = new Project("Work");
  const project3 = new Project("Fitness");

  let item1 = new Todo(
    "Buy groceries",
    "Get milk, bread, and eggs from the store",
    `${project1.title}`,
    `${project1.id}`,
    "2023-02-20",
    "2",
    false,
    new Date()
  );

  let item2 = new Todo(
    "Clean the house",
    "Vacuum the floors and dust the furniture",
    `${project1.title}`,
    `${project1.id}`,
    "2023-02-25",
    "1",
    false,
    new Date()
  );

  let item3 = new Todo(
    "Call mom",
    "Check in and see how she's doing",
    `${project1.title}`,
    `${project1.id}`,
    "2023-02-19",
    "3",
    false,
    new Date()
  );

  let item4 = new Todo(
    "Schedule team meeting",
    "Schedule a meeting with the team to discuss project progress",
    `${project2.title}`,
    `${project2.id}`,
    "2023-03-05",
    "2",
    false,
    new Date()
  );

  let item5 = new Todo(
    "Follow up with client",
    "Follow up with the client about the project deadline",
    `${project2.title}`,
    `${project2.id}`,
    "2023-03-07",
    "3",
    false,
    new Date()
  );

  let item6 = new Todo(
    "Finish quarterly report",
    "Complete the sales and financial reports for Q1",
    `${project2.title}`,
    `${project2.id}`,
    "2023-04-15",
    "1",
    false,
    new Date()
  );

  let item7 = new Todo(
    "Go for a run",
    "Run for 30 minutes at the park",
    `${project3.title}`,
    `${project3.id}`,
    "2023-02-19",
    "2",
    false,
    new Date()
  );

  let item8 = new Todo(
    "Hit the gym",
    "Do a full body workout",
    `${project3.title}`,
    `${project3.id}`,
    "2023-02-22",
    "1",
    false,
    new Date()
  );

  let item9 = new Todo(
    "Buy protein powder",
    "Get some whey protein powder from the store",
    `${project3.title}`,
    `${project3.id}`,
    "2023-02-16",
    "3",
    true,
    new Date()
  );
  const todoList = new TodoList();

  project1.addTodo(item1, item2, item3);
  project2.addTodo(item4, item5, item6);
  project3.addTodo(item7, item8, item9);

  todoList.addAProject(project1, project2, project3);

  const todoListView = new TodoListView(todoList);

  let todosInStorage = JSON.parse(localStorage.getItem("todoList"));
}

function loadProjects(data) {
  let projects = data.projects.map((project) => {
    // We create a new Project object from the JSON data.
    let newProject = new Project(project.title);
    newProject.todos = project.todos.map((todo) => {
      // We create a new Todo object from the JSON data.
      return new Todo(
        todo.title,
        todo.description,
        todo.project,
        todo.projectId,
        todo.dueDate,
        todo.priority,
        todo.isComplete,
        todo.dateAdded
      );
    });
    return newProject;
  });
  return projects;
}

function loadObservers(data) {
  return data.observers;
}

function loadDefaultProject(data) {
  return data.defaultProject;
}

function loadTodos(data) {
  const projects = loadProjects(data);
  let todos = [].concat(...projects.map((project) => project.todos));
  return todos;
}
