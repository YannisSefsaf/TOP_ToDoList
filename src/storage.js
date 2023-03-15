// storage.js

/* const DATA_VERSION = "v1";
const STORAGE_KEY = `todo_${DATA_VERSION}`; */
/* import { TodoList } from "./models"; */

import { Todo, Project, TodoList } from "./models.js";
import { TodoListView } from "./UI.js";

// Save the todo list data to local storage
let projects = [];
let todos = [];
let observers = [];
let defaultProject = null;
let initialized = false;

function saveTodoList(projects, todos, observers, defaultProject) {
  const data = { projects, todos, observers, defaultProject };
  console.log("todos being saved:", todos);
  localStorage.setItem("todoList", JSON.stringify(data));
  console.log(
    "todolist ater setting items:",
    JSON.parse(localStorage.getItem("todoList"))
  );
}

// Load the todo list data from local storage
function loadTodoList() {
  const data = JSON.parse(localStorage.getItem("todoList"));
  let initialized = JSON.parse(localStorage.getItem("initialized"));
  if (!initialized) {
    // Page has not been initialized yet
    console.log("Initializing page...");
    initialized = true;
    localStorage.setItem("initialized", JSON.stringify(initialized));

    // Run the initiation process here
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
    console.log("todos in storage:", todosInStorage.todos);
  } else {
    console.log("Loading saved data...");
    console.log("data:", data);
    /*   console.log("Loaded Todo List:", data); // log the loaded data */

    if (data) {
      projects = data.projects.map((project) => {
        let newProject = new Project(project.title);
        newProject.todos = project.todos.map((todo) => {
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
      observers = data.observers;
      defaultProject = data.defaultProject;
      todos = [].concat(...projects.map((project) => project.todos));
    }
    /*     if (data) {
      projects = [];

      let projectsInStorage = data.projects;
      projectsInStorage.forEach((project) => {
        let newProject = new Project(project.title);
        projects.push(newProject);
      });

      console.log("projects right after iterating", projects);
            projects = data.projects; 
      observers = data.observers;
      defaultProject = data.defaultProject;

      // create a new array for todos
      todos = [];

      // iterate through each project and add its todos to the new array
      projectsInStorage.forEach((project) => {
        project.todos.forEach((todo) => {
          let newTodo = new Todo(
            todo.title,
            todo.description,
            todo.project,
            todo.projectId,
            todo.dueDate,
            todo.priority,
            todo.isComplete,
            todo.dateAdded
          );
          todos.push(newTodo);
        });
      });
    } */

    /*     console.log("projects", projects);
    for (let prajact of projects) {
      console.log("prajact instanceof Project:", prajact instanceof Project);
    }
    console.log("todos", todos);
    for (let tada of todos) {
      console.log("tada instanceof Todo:", tada instanceof Todo);
    }
    console.log("todolist:", JSON.parse(localStorage.getItem("todoList"))); */
    const newTodoList = new TodoList(projects, todos);
    /*    console.log("todoList todos:", todoList.todos);
    console.log("todoList projects:", todoList.projects); */
    const todoListView = new TodoListView(newTodoList);
    /*  console.log("todoListView:", todoListView); */
  }
}

export { saveTodoList, loadTodoList };

/* function updateLocalStorage(todoList) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todoList));
} */

/* function updateLocalStorage(todoList) {
  const data = {
    version: DATA_VERSION,
    projects: todoList.projects,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
 */
/* function loadFromLocalStorage() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      // If the data doesn't exist, return an empty object
      return {};
    }
    // Parse the JSON data and return it
    return JSON.parse(data);
  } catch (error) {
    console.error("Error loading data from localStorage:", error);
    return {};
  }
} */

/* function loadFromLocalStorage() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    try {
      const todoList = JSON.parse(data);
      if (todoList.version === DATA_VERSION) {
        todoList.projects.forEach((project) => {
          project.todos.forEach((todo) => {
            todo.dueDate = todo.dueDate ? new Date(todo.dueDate) : null;
          });
        });
        return todoList;
      }
    } catch (error) {
      console.error("Error parsing data from local storage", error);
    }
  }
  return null;
}
 */
/* function loadFromLocalStorage() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    try {
      const todoList = JSON.parse(data);
      let foundTodo = false;
      todoList.projects.forEach((project) => {
        project.todos.forEach((storedTodo, index) => {
          if (storedTodo.id === todo.id) {
            project.todos[index] = todo;
            foundTodo = true;
          }
        });
      });
      if (!foundTodo) {
        todoList.projects[0].todos.push(todo);
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todoList));
    } catch (error) {
      console.error("Error parsing data from local storage", error);
    }
  }
} */

/* function loadTodoList() {
  const data = JSON.parse(localStorage.getItem("todoList"));
  /*   console.log("Loaded Todo List:", data); // log the loaded data 
  if (data) {
    projects = data.projects;
    observers = data.observers;
    defaultProject = data.defaultProject;

    // create a new array for todos
    todos = [];

    // iterate through each project and add its todos to the new array
    projects.forEach((project) => {
      project.todos.forEach((todo) => {
        todos.push(todo);
      });
    });
  }
  return { projects, todos };
} */

/* 
const STORAGE_KEY = "todo-app-data"; */
/* 
import { Todo, Project } from "./models";

// Save data to local storage
function saveData(data) {
  localStorage.setItem("todoData", JSON.stringify(data));
}

// Load data from local storage
function loadData() {
  try {
    const data = JSON.parse(localStorage.getItem("todoList"));
    if (data) {
      // Clear existing todos and projects
      this.todos = [];
      this.projects = [];

      // Add loaded todos and projects
      for (const todoData of data.todos) {
        const todo = new Todo(
          todoData.title,
          todoData.description,
          todoData.dueDate,
          todoData.priority
        );
        todo.id = todoData.id;
        todo.completed = todoData.completed;
        todo.project = todoData.project;
        this.todos.push(todo);
      }
      for (const projectData of data.projects) {
        const project = new Project(projectData.name);
        project.id = projectData.id;
        for (const todoId of projectData.todos) {
          const todo = this.todos.find((todo) => todo.id === todoId);
          if (todo) {
            project.todos.push(todo);
          }
        }
        this.projects.push(project);
      }
      this.notifyObservers();
    }
  } catch (error) {
    console.error(error);
  }
}
 */
// Save the data to localStorage
/* function saveData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving data to localStorage:", error);
  }
}

// Retrieve the data from localStorage
function loadData() {
  const projects = JSON.parse(localStorage.getItem("todoListProjects")) || [];

  // For each project, also load the todos
  projects.forEach((project) => {
    const todos = JSON.parse(localStorage.getItem(`todos_${project.id}`)) || [];
    project.todos = todos.map(
      (todo) =>
        new Todo(
          todo.title,
          todo.description,
          todo.projectTitle,
          todo.projectId,
          todo.dueDate,
          todo.priority,
          todo.completed,
          new Date(todo.createdAt)
        )
    );
  });

  return { projects };
} */
/* function loadData() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      // If the data doesn't exist, return an empty object
      return {};
    }
    // Parse the JSON data and return it
    return JSON.parse(data);
  } catch (error) {
    console.error("Error loading data from localStorage:", error);
    return {};
  }
} */

/* export { saveData, loadData }; */
