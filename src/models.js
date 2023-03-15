import { saveTodoList } from "./storage";

export class Todo {
  constructor(
    title,
    description,
    project = "Default",
    projectId = "",
    dueDate,
    priority,
    isComplete = false,
    dateAdded = new Date()
  ) {
    this.title = title;
    this.description = description;
    this.project = project;
    this.projectId = projectId;
    this.dueDate = dueDate;
    this.priority = priority;
    this.isComplete = isComplete;
    this.id = `todo-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    this.dateAdded = dateAdded;
    this.observers = [];
  }

  toggleComplete() {
    this.isComplete = !this.isComplete;
    this.notifyObservers();
  }

  updateStatus(status) {
    if (status === "2") {
      this.isComplete = true;
    } else if (status === "1") {
      this.isComplete = false;
    }
    this.notifyObservers();
  }

  updateTitle(title) {
    this.title = title;
    this.notifyObservers();
  }

  updateDescription(description) {
    this.description = description;
    this.notifyObservers();
  }

  updateDueDate(dueDate) {
    this.dueDate = dueDate;
    this.notifyObservers();
  }

  updatePriority(priority) {
    this.priority = priority;
    this.notifyObservers();
  }

  updateProject(project) {
    this.project = project;
    this.notifyObservers();
  }

  updateProjectId(projectId) {
    this.projectId = projectId;
    this.notifyObservers();
  }

  // observer pattern methods

  addObserver(observer) {
    this.observers.push(observer);
  }

  /*   removeObserver(observer) {
    this.observers.push(observer);
  } */

  notifyObservers() {
    this.observers.forEach((observer) => observer(this));
  }
}

export class Project {
  constructor(title) {
    this.title = title;
    this.todos = [];
    this.id = `project-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    this.observers = [];
  }

  updateProjectTitle(title) {
    this.title = title;
    this.notifyObservers();
  }

  getProjectTodos() {
    return this.todos;
  }

  getProjectTodosCount() {
    return this.todos.length;
  }

  addTodo(...todo) {
    this.todos.push(...todo);
    this.notifyObservers();
  }

  // observer pattern methods

  addObserver(observer) {
    this.observers.push(observer);
  }

  removeObserver(observer) {
    this.observers.push(observer);
  }

  notifyObservers() {
    this.observers.forEach((observer) => observer(this));
  }
}

export class TodoList {
  constructor(projects = [], todos = []) {
    this.projects = projects;
    this.todos = todos;
    this.observers = [];
    this.defaultProject = new Project("Default");
    this.projects.push(this.defaultProject);
    for (const project of this.projects) {
      if (project instanceof Project) {
        project.addObserver(() => this.save());
      }
    }
    for (const todo of this.todos) {
      if (todo instanceof Todo) {
        todo.addObserver(() => this.save());
      }
    }
  }

  // helper functions

  findProject(projectId) {
    return this.projects.find((project) => project.id === projectId);
  }

  findTodoById(todoId) {
    for (const project of this.projects) {
      for (const todo of project.todos) {
        if (todo.id === todoId) {
          return todo;
        }
      }
    }
    return null; // If todo is not found, return null
  }

  // add project

  addAProject(...projects) {
    projects.forEach((project) => {
      this.projects.push(project);
      this.todos = [...this.todos, ...project.todos];
    });
    this.notifyObservers();
    this.save();
  }

  addATodo(projectId, todo) {
    const project = this.findProject(projectId);
    project.todos.push(todo);
    this.todos = this.projects.reduce(
      (acc, proj) => acc.concat(proj.todos),
      []
    );
    this.notifyObservers();
    this.save();
  }

  // delete todo by id and by project

  deleteTodo(todoId) {
    let project;
    for (const proj of this.projects) {
      const todoIndex = proj.todos.findIndex((todo) => todo.id === todoId);
      if (todoIndex !== -1) {
        proj.todos.splice(todoIndex, 1);
        project = proj;
        break;
      }
    }
    if (project) {
      this.todos = this.projects.reduce(
        (acc, proj) => acc.concat(proj.todos),
        []
      );
    }
    this.notifyObservers();
    this.save();
  }

  deleteProject(projectId) {
    const project = this.projects.find((project) => project.id === projectId);
    this.projects = this.projects.filter(
      (projectItem) => projectItem !== project
    );
    this.todos = this.todos.filter((todo) => todo.project !== project);
    this.notifyObservers();
    this.save();
  }

  // get names & counts: total, by project, by date, by status

  getAllProjects() {
    let projects = [];
    this.projects.forEach((project) => {
      if (project.title !== "Default") {
        projects.push(project);
      }
    });
    return projects;
  }

  getTodoCountByProject() {
    let projectCount = [];
    this.projects.forEach((project) => {
      if (project.title !== "Default") {
        projectCount.push(project.todos.length);
      }
    });
    return projectCount;
  }

  getTodosByProject() {
    let todos = [];
    this.projects.forEach((project) => {
      todos.push(project.todos);
    });
    return todos;
  }

  getTodosByProjectId(projectId) {
    let project = this.findProject(projectId);
    let todosByProjectId = project.todos;
    return todosByProjectId;
  }

  getAllTodos() {
    return this.projects.reduce((todos, project) => {
      return todos.concat(project.todos);
    }, []);
  }

  getTotalTodoCount() {
    return this.todos.reduce((total, project) => {
      return total + project.todos.length;
    }, 0);
  }

  getProjectById(projectId) {
    let project = this.findProject(projectId);
    return project;
  }

  getTodoCountByDate(dueDate) {
    const userTimeZoneOffset = new Date().getTimezoneOffset();
    const today = new Date();
    const userToday = today.setUTCHours(0, `${userTimeZoneOffset}`, 0, 0);
    const dateObj = new Date(dueDate).setUTCHours(
      0,
      `${userTimeZoneOffset}`,
      0,
      0
    );
    return this.projects.reduce((total, project) => {
      return (
        total +
        (project.todos?.filter((todo) => {
          const todoDueDate = new Date(todo.dueDate);
          const userTodoDueDate = new Date(todoDueDate).setUTCHours(
            0,
            `${userTimeZoneOffset}`,
            0,
            0
          );
          return dateObj >= userTodoDueDate && userTodoDueDate >= userToday;
        }).length || 0)
      );
    }, 0);
  }

  getTodoCountByStatus(isComplete) {
    return this.projects.reduce((total, project) => {
      return (
        total +
          project.todos?.filter((todo) => todo.isComplete === isComplete)
            .length || 0
      );
    }, 0);
  }

  getTodoCountByPriority(priority) {
    return this.projects.reduce((total, project) => {
      return (
        total +
          project.todos?.filter((todo) => todo.priority === priority).length ||
        0
      );
    }, 0);
  }

  // observer pattern methods

  addObserver(observer) {
    this.observers.push(observer);
  }

  /*   removeObserver(observer) {
    this.observers.push(observer);
  } */

  notifyObservers() {
    this.observers.forEach((observer) => observer());
  }

  save() {
    saveTodoList(
      this.projects,
      this.todos,
      this.observers,
      this.defaultProject
    );
  }
}
