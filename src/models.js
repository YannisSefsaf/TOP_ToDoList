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
  }

  toggleComplete() {
    this.isComplete = !this.isComplete;
  }

  updateStatus(status) {
    if (status === "2") {
      this.isComplete = true;
    } else if (status === "1") {
      this.isComplete = false;
    }
  }

  updateTitle(title) {
    this.title = title;
  }

  updateDescription(description) {
    this.description = description;
  }

  updateDueDate(dueDate) {
    this.dueDate = dueDate;
  }

  updatePriority(priority) {
    this.priority = priority;
  }

  updateProject(project) {
    this.project = project;
  }

  updateProjectId(projectId) {
    this.projectId = projectId;
  }
}

export class Project {
  constructor(title) {
    this.title = title;
    this.todos = [];
    this.id = `project-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  }

  updateProjectTitle(title) {
    this.title = title;
  }

  getProjectTodos() {
    return this.todos;
  }

  getProjectTodosCount() {
    return this.todos.length;
  }

  addTodo(...todo) {
    this.todos.push(...todo);
  }
}

export class TodoList {
  constructor() {
    this.projects = [];
    this.todos = [];
    this.observers = [];
    this.defaultProject = new Project("Default");
    this.projects.push(this.defaultProject);
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
      this.todos.push(project.todos);
    });
    this.notifyObservers();
  }

  addATodo(projectId, todo) {
    const project = this.findProject(projectId);
    project.todos.push(todo);
    this.todos = this.projects.reduce(
      (acc, proj) => acc.concat(proj.todos),
      []
    );
    this.notifyObservers();
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
  }

  deleteProject(projectId) {
    const project = this.projects.find((project) => project.id === projectId);
    this.projects = this.projects.filter(
      (projectItem) => projectItem !== project
    );
    this.todos = this.todos.filter((todo) => todo.project !== project);
    this.notifyObservers();
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

  isToday(date) {
    const today = new Date().setUTCHours(0, 0, 0, 0);
    const dateObj = new Date(date).setUTCHours(0, 0, 0, 0);
    return dateObj === today;
  }

  isWithinNextWeek(date) {
    const today = new Date();
    const dateObj = new Date(date);
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    return (
      dateObj.setUTCHours(0, 0, 0, 0) <= nextWeek.setUTCHours(0, 0, 0, 0) &&
      dateObj.setUTCHours(0, 0, 0, 0) >= today.setUTCHours(0, 0, 0, 0)
    );
  }

  /*   getTodoCountByDate(dueDate) {
    const today = new Date().setUTCHours(0, 0, 0, 0);
    return this.projects.reduce((total, project) => {
      return (
        total +
        (project.todos?.filter((todo) => {
          const todoDueDate = new Date(todo.dueDate).setUTCHours(0, 0, 0, 0);
          return todoDueDate <= dueDate && todoDueDate >= today;
        }).length || 0)
      );
    }, 0);
  } */
  /*   getTodoCountByDate(dueDate) {
    const userTimeZoneOffset = new Date().getTimezoneOffset() * 60000;
    const today = new Date(Date.now() - userTimeZoneOffset);
    const dateObj = new Date(dueDate);
    return this.projects.reduce((total, project) => {
      return (
        total +
        (project.todos?.filter((todo) => {
          const todoDueDate = new Date(todo.dueDate);
          const userTodoDueDate = new Date(
            todoDueDate.getTime() - userTimeZoneOffset
          ).setUTCHours(0, 0, 0, 0);
          return userTodoDueDate <= dateObj && userTodoDueDate >= today;
        }).length || 0)
      );
    }, 0);
  }
 */

  isToday(date) {
    const userTimeZoneOffset = new Date().getTimezoneOffset();
    const today = new Date();
    const userToday = today.setUTCHours(0, `${userTimeZoneOffset}`, 0, 0);
    const dateObj = new Date(date).setUTCHours(
      0,
      `${userTimeZoneOffset}`,
      0,
      0
    );
    return dateObj === userToday;
  }

  isWithinNextWeek(date) {
    const userTimeZoneOffset = new Date().getTimezoneOffset();
    const today = new Date();
    const userToday = today.setUTCHours(0, `${userTimeZoneOffset}`, 0, 0);
    const dateObj = new Date(date).setUTCHours(
      0,
      `${userTimeZoneOffset}`,
      0,
      0
    );
    const nextWeek = new Date(
      today.getTime() + 7 * 24 * 60 * 60 * 1000
    ).setUTCHours(0, `${userTimeZoneOffset}`, 0, 0);
    return dateObj <= nextWeek && dateObj >= userToday;
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

  removeObserver(observer) {
    this.observers.push(observer);
  }

  notifyObservers() {
    this.observers.forEach((observer) => observer());
  }
}
