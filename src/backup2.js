export class TodoListView {
  constructor(todoList) {
    this.todoList = todoList;
    this.currentCategory = { category: "inbox" };

    /* FORM - ADD PROJECT */

    this.formAddProjectLink = document.querySelector(".form__add-project");

    /* SIDEBAR - INBOX & DATES */
    this.inboxLink = document.querySelector("#inbox");
    this.todayLink = document.querySelector("#today");
    this.nextWeekLink = document.querySelector("#nextWeek");

    this.inboxCountLink = document.querySelector("#inboxCount");
    this.todayCountLink = document.querySelector("#todayCount");
    this.nextWeekCountLink = document.querySelector("#nextWeekCount");

    /* SIDEBAR - PROJECTS */
    this.sidebarProjectGroup = document.querySelector(
      ".sidebar__group-two-expandable-projects"
    );
    this.projectNamesLink = document.querySelector(
      "#sidebar__group-two-expandable-project-names"
    );
    this.projectTodoCountLink = document.querySelector(
      "#sidebar__group-two-expandable-project-count"
    );
    this.addProject = document.querySelector("#addProject");

    this.arrowShowProjects = document.querySelector(
      ".sidebar__group-two-icon-arrow-img-1"
    );

    /* SIDEBAR - STATUS */
    this.sidebarStatusGroup = document.querySelector(
      ".sidebar__group-two-expandable-status"
    );

    this.isCompletedLink = document.querySelector("#completed");
    this.isNotCompletedLink = document.querySelector("#notCompleted");
    this.isCompletedCountLink = document.querySelector("#completedCount");
    this.isNotCompletedCountLink = document.querySelector("#notCompletedCount");

    this.isCompletedCountUl = document.querySelector(
      ".sidebar__group-two-expandable-project-status-count"
    );

    this.arrowShowStatus = document.querySelector(
      ".sidebar__group-two-icon-arrow-img-2"
    );

    /* SIDEBAR - FILTER */
    this.sidebarPriorityGroup = document.querySelector(
      ".sidebar__group-two-expandable-priority"
    );
    this.arrowShowPriority = document.querySelector(
      ".sidebar__group-two-icon-arrow-img-3"
    );

    this.highPriorityLink = document.querySelector("#high");
    this.mediumPriorityLink = document.querySelector("#medium");
    this.lowPriorityLink = document.querySelector("#low");

    this.highPriorityCountLink = document.querySelector("#highCount");
    this.mediumPriorityCountLink = document.querySelector("#mediumCount");
    this.lowPriorityCountLink = document.querySelector("#lowCount");

    /* MAIN SECTION */
    this.todoGrid = document.querySelector(".main-section__todo-grid");
    this.title = document.querySelector(".main-section__title");
    this.sortBy = document.querySelector(".main-section__sort-container");
    this.sortByFieldsContainer = document.querySelector(
      ".main-section__sort-fields-container"
    );
    this.sortByText = document.querySelector(".main-section__sort-text");

    /* BUTTONS */
    this.buttonAddItem = document.querySelector("#itemButton"); // OK
    this.buttonAddProject = document.querySelector("#projectButton"); // OK
    this.addProjectButton = document.querySelector("#addProjectButton");
    this.showTodoForm = document.querySelector(".main-section__add-todo"); //
    this.buttonCancel = document.querySelector(".button__cancel");

    /* FORM ADD PROJECT */
    this.formProjectName = document.querySelector("#projectName");

    /* FORM ADD TODO */
    this.formAddTodo = document.querySelector(".form__add-todo-container");
    this.todoName = document.querySelector("#name");
    this.todoDescription = document.querySelector("#description");
    this.todoProject = document.querySelector("#project");
    this.todoPriority = document.querySelector("#priority");
    this.todoDueDate = document.querySelector("#dueDate");
    this.todoStatus = document.querySelector("#status");

    /* SEARCH BAR */
    this.searchBar = document.querySelector(".navbar__search-bar-container");

    /* BACKGROUND */
    this.background = document.querySelector(".background");

    /* INITALIZE */
    this.todoDueDate.valueAsDate = new Date();
    this.todosToDisplay = this.todoList.getAllTodos();
    this.renderSidebar();
    this.renderMainSection(this.todosToDisplay);
    this.renderProjectSelect();
    this.bindEvents();
    this.sortTodos();
    this.todoList.addObserver(() => this.updateView());
    this.todoList.addObserver(() => this.renderSidebar());
    this.todoList.addObserver(() => this.renderProjectSelect());
    this.todoList.addObserver(() =>
      this.renderMainSection(this.todosToDisplay)
    );
  }

  bindEvents() {
    this.deleteIconImg = document.querySelectorAll("#deleteIcon");

    this.inboxLink.addEventListener("click", () => this.filterBy("inbox"));

    this.todayLink.addEventListener("click", () => this.filterBy("today"));

    this.nextWeekLink.addEventListener("click", () =>
      this.filterBy("nextweek")
    );

    this.arrowShowProjects.addEventListener("click", () =>
      this.toggleSidebarProjectGroup()
    );

    this.arrowShowStatus.addEventListener("click", () =>
      this.toggleSidebarStatusGroup()
    );

    this.arrowShowPriority.addEventListener("click", () =>
      this.toggleSidebarPriorityGroup()
    );

    this.isCompletedLink.addEventListener("click", () =>
      this.filterBy("completed")
    );

    this.isNotCompletedLink.addEventListener("click", () =>
      this.filterBy("notcompleted")
    );

    this.highPriorityLink.addEventListener("click", () => {
      this.filterBy("highpriority");
    });

    this.mediumPriorityLink.addEventListener("click", () => {
      this.filterBy("mediumpriority");
    });

    this.lowPriorityLink.addEventListener("click", () => {
      this.filterBy("lowpriority");
    });

    this.projectNamesLink.addEventListener("click", (e) => {
      if (e.target.matches(".sidebar__group-two-expandable-project-name")) {
        this.filterBy("project", e.target.dataset.id);
      }
    });

    this.showTodoForm.addEventListener("click", () => {
      this.toggleAddTodoForm();
    });

    this.searchBar.addEventListener("keyup", () => this.filterTodos());

    this.addProject.addEventListener("click", () => this.showAddProjectForm());

    this.background.addEventListener("click", () =>
      this.removeAddProjectForm()
    );

    this.addProjectButton.addEventListener("click", (e) =>
      this.addProjectFunc(e, this.formProjectName.value)
    );

    this.buttonAddItem.addEventListener("click", (e) => this.addTodoFunc(e));

    this.todoGrid.addEventListener("click", (e) => {
      if (e.target.id === "deleteIcon") {
        this.deleteTodoFunc(e, e.target.dataset.id);
      }
    });

    this.sortBy.addEventListener("mouseenter", () => {
      this.toggleSortByMenu();
    });

    this.sortBy.addEventListener("mouseleave", () => {
      this.toggleSortByMenu();
    });

    this.sortByFieldsContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("sorter")) {
        this.sortTodos(e, e.target.getAttribute("value"));
      }
    });

    this.todoGrid.addEventListener("click", (e) => {
      if (e.target.classList.contains("todo-item__group-one")) {
        this.toggleComplete(e.target.getAttribute("data-id"));
      }
    });
  }

  // add/delete todo and project functions

  addTodoFunc(e) {
    e.preventDefault();
    const date = this.todoDueDate.value.split("-").map(Number);
    const newTodo = new Todo(
      this.todoName.value,
      this.todoDescription.value,
      this.todoProject.value,
      format(new Date(date[0], date[1] - 1, date[2]), "MM-dd-yyyy"),
      this.todoPriority.value,
      this.todoIsComplete(this.todoStatus)
    );
    const projectId =
      this.todoProject.options[this.todoProject.selectedIndex].dataset.id;
    this.todoList.addATodo(projectId, newTodo);
    this.filterBy(this.getCurrentCategory(), this.getCurrentId());
    this.clearFormFields();
    this.toggleAddTodoForm();
  }

  addProjectFunc(e, projectName) {
    e.preventDefault();
    const newProject = new Project(projectName);
    this.todoList.addAProject(newProject);
    this.formProjectName.value = "";
    this.removeAddProjectForm();
  }

  deleteTodoFunc(e, todoId) {
    e.preventDefault();
    this.todoList.deleteTodo(todoId);
    this.filterBy(this.getCurrentCategory(), this.getCurrentId());
  }

  // show hide functins

  showAddProjectForm() {
    this.formAddProjectLink.classList.add("show");
    this.background.classList.add("show");
  }

  removeAddProjectForm() {
    this.formAddProjectLink.classList.remove("show");
    this.background.classList.remove("show");
  }

  // set and get category & id functions

  setCurrentCategoryAndId(category, id = null) {
    this.currentCategory = category;
    this.currentId = id;
  }

  getCurrentCategory() {
    return this.currentCategory;
  }

  getCurrentId() {
    return this.currentId;
  }

  // filter functions

  filterBy(category, projectId = null) {
    this.searchBar.value = "";
    this.todosToDisplay = this.todoList.getAllTodos();
    this.setCurrentCategoryAndId(category, projectId);
    let todos;
    switch (category) {
      case "inbox":
        todos = this.todoList.getAllTodos();
        this.title.textContent = "Inbox";
        break;
      case "today":
        todos = this.todoList
          .getAllTodos()
          .filter((todo) => this.isToday(todo.dueDate));
        this.title.textContent = "Today";
        break;
      case "nextweek":
        todos = this.todosToDisplay.filter((todo) =>
          this.isWithinNextWeek(todo.dueDate)
        );
        this.title.textContent = "Next week";
        break;
      case "completed":
        todos = this.todosToDisplay.filter((todo) => todo.isComplete);
        this.title.textContent = "Completed";
        break;
      case "notcompleted":
        todos = this.todosToDisplay.filter((todo) => !todo.isComplete);
        this.title.textContent = "Not Completed";
        break;
      case "highpriority":
        todos = this.todosToDisplay.filter((todo) => todo.priority === "3");
        this.title.textContent = "High Priority";
        break;
      case "mediumpriority":
        todos = this.todosToDisplay.filter((todo) => todo.priority === "2");
        this.title.textContent = "Medium Priority";
        break;
      case "lowpriority":
        todos = this.todosToDisplay.filter((todo) => todo.priority === "1");
        this.title.textContent = "Low Priority";
        break;
      case "project":
        todos = this.todoList.getTodosByProjectId(projectId);
        const project = this.todoList.getProjectById(projectId);
        this.title.textContent = project.title;
        break;
      default:
        todos = this.todoList.getAllTodos();
        this.title.textContent = "Inbox";
        break;
    }
    this.renderMainSection(todos);
  }

  filterTodos() {
    const searchText = this.searchBar.value.toLowerCase().trim();
    this.todosToDisplay = this.todoList.getAllTodos();
    this.todosToDisplay = this.returnFilteredArray(
      this.getCurrentCategory(),
      this.getCurrentId(),
      searchText
    );
    this.renderMainSection(this.todosToDisplay);
  }

  filterMatches(todo, searchText) {
    if (searchText === "") {
      return true;
    }
    const title = todo.title.toLowerCase();
    return title.includes(searchText);
  }

  // sort functions

  sortTodos(e = null, value = null) {
    if (e) {
      e.preventDefault();
    }
    let todos = this.todosToDisplay;
    let sortOption = this.convertValueToSortOption(value);
    /*  console.log(sortOption); */
    switch (sortOption) {
      case "dateAddedNewest":
        todos.sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded));
        this.sortByText.textContent = "Sort By: Date Added - Newest to Oldest";
        break;
      case "dateAddedOldest":
        todos.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
        this.sortByText.textContent = "Sort By: Date Added - Oldest to Newest";
        break;
      case "dueDateChronological":
        todos.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        this.sortByText.textContent = "Sort By: Due Date - Earliest To Latest";
        break;
      case "dueDateReverseChronological":
        todos.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
        this.sortByText.textContent = "Sort By: Due Date - Latest to Earliest";
        break;
      case "projectAToZ":
        todos.sort((a, b) => a.project.localeCompare(b.project));
        this.sortByText.textContent = "Sort By: Project Name - A to Z";
        break;
      case "projectZToA":
        todos.sort((a, b) => b.project.localeCompare(a.project));
        this.sortByText.textContent = "Sort By: Project Name - Z to A";
        break;
      case "priorityHighToLow":
        todos.sort((a, b) => b.priority - a.priority);
        this.sortByText.textContent = "Sort By: Priority - High To Low";
        break;
      case "priorityLowToHigh":
        todos.sort((a, b) => a.priority - b.priority);
        this.sortByText.textContent = "Sort By: Priority - Low To High";
        break;
      case "statusCompletedFirst":
        todos.sort((a, b) => {
          if (a.isComplete && !b.isComplete) {
            return -1;
          } else if (!a.isComplete && b.isComplete) {
            return 1;
          }
          return 0;
        });
        this.sortByText.textContent = "Sort By: Completed > Not Completed";
        break;
      case "statusNotCompletedFirst":
        todos.sort((a, b) => {
          if (!a.isComplete && b.isComplete) {
            return -1;
          } else if (a.isComplete && !b.isComplete) {
            return 1;
          }
          return 0;
        });
        this.sortByText.textContent = "Sort By: Not Completed > Completed";
        break;
      default:
        todos.sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded));
        this.sortByText.textContent = "Sort By: Date Added - Newest to Oldest";
        break;
    }

    this.renderMainSection(todos);
  }

  // render functions

  renderMainSection(todos) {
    // render main section
    this.renderTodoList(todos);
  }

  renderSidebar() {
    this.projectNamesLink.innerHTML = "";
    this.projectTodoCountLink.innerHTML = "";
    this.inboxCountLink.innerHTML = "";
    this.todayCountLink.innerHTML = "";
    this.nextWeekCountLink.innerHTML = "";
    this.isCompletedCountLink.innerHTML = "";
    this.isNotCompletedCountLink.innerHTML = "";
    this.highPriorityCountLink.innerHTML = "";
    this.mediumPriorityCountLink.innerHTML = "";
    this.lowPriorityCountLink.innerHTML = "";

    const highPriorityCount = this.todoList.getTodoCountByPriority("3");
    const mediumPriorityCount = this.todoList.getTodoCountByPriority("2");
    const lowPriorityCount = this.todoList.getTodoCountByPriority("1");

    this.highPriorityCountLink.innerHTML = `${highPriorityCount}`;
    this.mediumPriorityCountLink.innerHTML = `${mediumPriorityCount}`;
    this.lowPriorityCountLink.innerHTML = `${lowPriorityCount}`;

    const projects = this.todoList.getAllProjects();
    const projectTodoCount = this.todoList.getTodoCountByProject();

    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

    const inboxTodoCount = this.todoList.getAllTodos().length;
    const todayTodoCount = this.todoList.getTodoCountByDate(today);
    const nextWeekTodoCount = this.todoList.getTodoCountByDate(nextWeek);
    const isCompletedCount = this.todoList.getTodoCountByStatus(true);
    const isNotCompletedCount = this.todoList.getTodoCountByStatus(false);

    this.isCompletedCountLink.innerHTML = `${isCompletedCount}`;
    this.isNotCompletedCountLink.innerHTML = `${isNotCompletedCount}`;

    projects.forEach((project) => {
      const li = this.createElem(
        "li",
        "sidebar__group-two-expandable-project-name",
        `${project.title}`
      );
      li.dataset.id = `${project.id}`;
      this.projectNamesLink.appendChild(li);
    });

    projectTodoCount.forEach((todoCount) => {
      const li = this.createElem(
        "li",
        "sidebar__group-two-expandable-project-count",
        `${todoCount}`
      );
      this.projectTodoCountLink.appendChild(li);
    });

    this.inboxCountLink.innerHTML = `${inboxTodoCount}`;
    this.todayCountLink.innerHTML = `${todayTodoCount}`;
    this.nextWeekCountLink.innerHTML = `${nextWeekTodoCount}`;
  }

  renderTodoList(todos) {
    // render todo list
    this.todoGrid = document.querySelector(".main-section__todo-grid");
    this.todoGrid.innerHTML = "";
    todos.forEach((todo) => {
      const todoItem = this.createElem("div", "todo-item");
      todoItem.dataset.id = todo.id;
      const itemGroupOne = this.createElem("div", "todo-item__group-one");
      itemGroupOne.dataset.id = todo.id;
      const itemGroupTwo = this.createElem("div", "todo-item__group-two");
      const statusCircle = this.createElem("div", "todo-item__status-circle");
      statusCircle.classList.add(todo.priority);
      const task = this.createElem("p", "todo-item__task");
      const todoTitle = this.createElem(
        "p",
        "todo-item__todo",
        `${todo.title} - `
      );
      const projectName = this.createElem(
        "span",
        "todo-item__project-name",
        `${todo.project}`
      );
      const dueDate = this.createElem(
        "p",
        "todo-item__due-date",
        `${todo.dueDate}`
      );
      const buttonDetails = this.createElem("a", "button__details", "Details");
      buttonDetails.classList.add("button");
      let editImg = this.createElem(
        "img",
        "todo-item__icon",
        "",
        "../src/img/edit.png"
      );
      let deleteImg = this.createElem(
        "img",
        "todo-item__icon",
        "",
        "../src/img/delete.png"
      );

      if (todo.isComplete) {
        todoTitle.style.textDecoration = "line-through";
        projectName.style.textDecoration = "line-through";
      }
      deleteImg.classList.add("delete__icon");
      deleteImg.id = "deleteIcon";
      deleteImg.dataset.id = `${todo.id}`;
      todoTitle.appendChild(projectName);
      task.appendChild(todoTitle);
      task.appendChild(dueDate);
      itemGroupOne.appendChild(statusCircle);
      itemGroupOne.appendChild(task);
      itemGroupTwo.appendChild(buttonDetails);
      itemGroupTwo.appendChild(editImg);
      itemGroupTwo.appendChild(deleteImg);
      todoItem.appendChild(itemGroupOne);
      todoItem.appendChild(itemGroupTwo);

      this.todoGrid.appendChild(todoItem);
    });
  }

  renderProjectSelect() {
    // render project select option
    const projectSelect = this.todoProject;
    const projectList = this.todoList.getAllProjects();
    while (!(projectSelect.firstChild === projectSelect.lastChild)) {
      projectSelect.removeChild(projectSelect.lastChild);
    }

    for (let i = 0; i < projectList.length; i++) {
      const option = this.createElem(
        "option",
        "option",
        `${projectList[i].title}`
      );
      option.dataset.id = `${projectList[i].id}`;
      projectSelect.appendChild(option);
    }
  }

  // update view function

  updateView() {
    const currentCategory = this.getCurrentCategory();
    switch (currentCategory.category) {
      case "inbox":
        this.filterBy("inbox");
        break;
      case "today":
        this.filterBy("today");
        break;
      case "nextweek":
        this.filterBy("nextweek");
        break;
      case "completed":
        this.filterBy("completed");
        break;
      case "notcompleted":
        this.filterBy("notcompleted");
        break;
      case "project":
        const projectId = currentCategory.id;
        this.filterBy("project", projectId);
        break;
      case "search":
        const searchQuery = this.searchInput.value.trim();
        this.filterTodos(searchQuery);
        break;
      default:
        break;
    }
  }

  // toggle functions

  toggleSidebarProjectGroup() {
    this.sidebarProjectGroup.classList.toggle("show");

    this.arrowShowProjects.classList.toggle("collapsed");
  }

  toggleSidebarStatusGroup() {
    this.sidebarStatusGroup.classList.toggle("show");

    this.arrowShowStatus.classList.toggle("collapsed");
  }

  toggleSidebarPriorityGroup() {
    this.sidebarPriorityGroup.classList.toggle("show");

    this.arrowShowPriority.classList.toggle("collapsed");
  }

  toggleSortByMenu() {
    this.sortByFieldsContainer.classList.toggle("show");
  }

  toggleAddTodoForm() {
    this.formAddTodo.classList.toggle("hide");
  }

  toggleComplete(todoId) {
    const todo = this.todoList.findTodoById(todoId);
    todo.toggleComplete();
    this.renderMainSection(this.todosToDisplay);
    this.renderSidebar();
  }

  // helper functions

  createElem(elem = "div", cls = "", txtContent = "", imgSrc = "", elemType) {
    let newElem = document.createElement(elem);
    if (cls !== "") {
      newElem.classList.add(cls);
    }
    newElem.textContent = txtContent;
    newElem.src = imgSrc;
    newElem.type = elemType;
    return newElem;
  }

  clearFormFields() {
    this.todoName.value = "";
    this.todoDescription.value = "";
    this.todoProject.value = "";
    this.todoDueDate.value = "";
    this.todoStatus.value = "";
  }

  isToday(date) {
    const today = new Date();
    const dateObj = new Date(date);
    return (
      dateObj.getDate() === today.getDate() &&
      dateObj.getMonth() === today.getMonth() &&
      dateObj.getFullYear() === today.getFullYear()
    );
  }

  isWithinNextWeek(date) {
    const today = new Date();
    const dateObj = new Date(date);
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    return (
      dateObj.getDate() >= today.getDate() &&
      dateObj.getMonth() >= today.getMonth() &&
      dateObj.getFullYear() >= today.getFullYear() &&
      dateObj <= nextWeek
    );
  }

  todoIsComplete(value) {
    let isComplete;
    value.options[value.selectedIndex].textContent === "Completed"
      ? (isComplete = true)
      : (isComplete = false);
    return isComplete;
  }

  returnFilteredArray(category, projectId, searchText) {
    let todos;
    this.setCurrentCategoryAndId(category, projectId);
    if (projectId) {
      category = "project";
    }
    switch (category) {
      case "inbox":
        todos = this.todoList.getAllTodos();
        todos = todos.filter((todo) => this.filterMatches(todo, searchText));
        break;
      case "today":
        todos = this.todosToDisplay.filter((todo) =>
          this.isToday(todo.dueDate)
        );
        todos = todos.filter((todo) => this.filterMatches(todo, searchText));
        break;
      case "nextweek":
        todos = this.todosToDisplay.filter((todo) =>
          this.isWithinNextWeek(todo.dueDate)
        );
        todos = todos.filter((todo) => this.filterMatches(todo, searchText));
        break;
      case "completed":
        todos = this.todosToDisplay.filter((todo) => todo.isComplete);
        todos = todos.filter((todo) => this.filterMatches(todo, searchText));
        break;
      case "notcompleted":
        todos = this.todosToDisplay.filter((todo) => !todo.isComplete);
        todos = todos.filter((todo) => this.filterMatches(todo, searchText));
        break;
      case "highpriority":
        todos = this.todosToDisplay.filter((todo) => todo.priority === "3");
        todos = todos.filter((todo) => this.filterMatches(todo, searchText));
        break;
      case "mediumpriority":
        todos = this.todosToDisplay.filter((todo) => todo.priority === "2");
        todos = todos.filter((todo) => this.filterMatches(todo, searchText));
        break;
      case "lowpriority":
        todos = this.todosToDisplay.filter((todo) => todo.priority === "1");
        todos = todos.filter((todo) => this.filterMatches(todo, searchText));
        break;
      case "project":
        todos = this.todoList.getTodosByProjectId(projectId);
        todos = todos.filter((todo) => this.filterMatches(todo, searchText));
        break;
      default:
        todos = this.todoList.getAllTodos();
        todos = todos.filter((todo) => this.filterMatches(todo, searchText));
        break;
    }
    return todos;
  }

  convertValueToSortOption(value) {
    let sortOption = "";
    switch (value) {
      case "1":
        sortOption = "dateAddedOldest";
        break;
      case "2":
        sortOption = "dateAddedNewest";
        break;
      case "3":
        sortOption = "dueDateChronological";
        break;
      case "4":
        sortOption = "dueDateReverseChronological";
        break;
      case "5":
        sortOption = "projectAToZ";
        break;
      case "6":
        sortOption = "projectZToA";
        break;
      case "7":
        sortOption = "priorityLowToHigh";
        break;
      case "8":
        sortOption = "priorityHighToLow";
        break;
      case "9":
        sortOption = "statusCompletedFirst";
        break;
      case "10":
        sortOption = "statusNotCompletedFirst";
        break;
    }
    return sortOption;
  }
}