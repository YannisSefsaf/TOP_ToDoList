import { Todo, Project, TodoList } from "./models.js";
import { format } from "date-fns";
import { closeHamburgerMenu } from "./hamburger.js";

export class TodoListView {
  constructor(todoList) {
    this.todoList = todoList;
    this.currentCategory = { category: "inbox" };
    this.currentSortOption = { sortOption: "dateAddedNewest" };

    /* INITIALIZE */
    this.initQuerySelectors();
    this.todoDueDate.valueAsDate = new Date();
    this.todosToDisplay = this.todoList.getAllTodos();
    this.renderMobileSidebar();
    this.renderSidebar();
    this.sortTodos();
    this.renderMainSection(this.todosToDisplay);
    this.renderProjectSelect();
    this.bindEvents();
    this.todoList.addObserver(() => this.updateView());
  }

  bindEvents() {
    this.resetButton.addEventListener("click", () => {
      localStorage.clear();
      const initialized = false;
      localStorage.setItem("initialized", JSON.stringify(initialized));
      location.reload();
    });

    this.deleteIconImg = document.querySelectorAll("#deleteIcon");

    this.arrowShowProjectsMobile.addEventListener("click", () =>
      this.toggleSidebarProjectGroupMobile()
    );

    this.arrowShowStatusMobile.addEventListener("click", () =>
      this.toggleSidebarStatusGroupMobile()
    );

    this.arrowShowPriorityMobile.addEventListener("click", () =>
      this.toggleSidebarPriorityGroupMobile()
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

    /* MOBILE LINKS */

    this.inboxLinkMobile.addEventListener("click", () => {
      let currentSortOption = this.getCurrentSortOption();
      this.searchBar.value = "";
      let filteredTodos = this.filterBy("inbox");
      filteredTodos = this.sortTodos(currentSortOption);
      this.renderTodoList(filteredTodos);
      closeHamburgerMenu();
      this.sidebarMobile.classList.remove("sidebar-mobile--shown");
      this.sidebarMobile.classList.add("sidebar-mobile--hidden");
    });

    this.todayLinkMobile.addEventListener("click", () => {
      const currentSortOption = this.getCurrentSortOption();
      this.searchBar.value = "";
      let filteredTodos = this.filterBy("today");
      filteredTodos = this.sortTodos(currentSortOption);
      this.renderTodoList(filteredTodos);
      closeHamburgerMenu();
      this.sidebarMobile.classList.remove("sidebar-mobile--shown");
      this.sidebarMobile.classList.add("sidebar-mobile--hidden");
    });

    this.nextWeekLinkMobile.addEventListener("click", () => {
      const currentSortOption = this.getCurrentSortOption();
      this.searchBar.value = "";
      let filteredTodos = this.filterBy("nextweek");
      filteredTodos = this.sortTodos(currentSortOption);
      this.renderTodoList(filteredTodos);
      closeHamburgerMenu();
      this.sidebarMobile.classList.remove("sidebar-mobile--shown");
      this.sidebarMobile.classList.add("sidebar-mobile--hidden");
    });

    this.isCompletedLinkMobile.addEventListener("click", () => {
      const currentSortOption = this.getCurrentSortOption();
      this.searchBar.value = "";
      let filteredTodos = this.filterBy("completed");
      filteredTodos = this.sortTodos(currentSortOption);
      this.renderTodoList(filteredTodos);
      closeHamburgerMenu();
      this.sidebarMobile.classList.remove("sidebar-mobile--shown");
      this.sidebarMobile.classList.add("sidebar-mobile--hidden");
    });

    this.isNotCompletedLinkMobile.addEventListener("click", () => {
      const currentSortOption = this.getCurrentSortOption();
      this.searchBar.value = "";
      let filteredTodos = this.filterBy("notcompleted");
      filteredTodos = this.sortTodos(currentSortOption);
      this.renderTodoList(filteredTodos);
      closeHamburgerMenu();
      this.sidebarMobile.classList.remove("sidebar-mobile--shown");
      this.sidebarMobile.classList.add("sidebar-mobile--hidden");
    });

    this.highPriorityLinkMobile.addEventListener("click", () => {
      const currentSortOption = this.getCurrentSortOption();
      this.searchBar.value = "";
      let filteredTodos = this.filterBy("highpriority");
      filteredTodos = this.sortTodos(currentSortOption);
      this.renderTodoList(filteredTodos);
      closeHamburgerMenu();
      this.sidebarMobile.classList.remove("sidebar-mobile--shown");
      this.sidebarMobile.classList.add("sidebar-mobile--hidden");
    });

    this.mediumPriorityLinkMobile.addEventListener("click", () => {
      const currentSortOption = this.getCurrentSortOption();
      this.searchBar.value = "";
      let filteredTodos = this.filterBy("mediumpriority");
      filteredTodos = this.sortTodos(currentSortOption);
      this.renderTodoList(filteredTodos);
      closeHamburgerMenu();
      this.sidebarMobile.classList.remove("sidebar-mobile--shown");
      this.sidebarMobile.classList.add("sidebar-mobile--hidden");
    });

    this.lowPriorityLinkMobile.addEventListener("click", () => {
      const currentSortOption = this.getCurrentSortOption();
      this.searchBar.value = "";
      let filteredTodos = this.filterBy("lowpriority");
      filteredTodos = this.sortTodos(currentSortOption);
      this.renderTodoList(filteredTodos);
      closeHamburgerMenu();
      this.sidebarMobile.classList.remove("sidebar-mobile--shown");
      this.sidebarMobile.classList.add("sidebar-mobile--hidden");
    });

    this.projectNamesLinkMobile.addEventListener("click", (e) => {
      if (e.target.matches(".sidebar__group-two-expandable-project-name")) {
        this.searchBar.value = "";
        const currentSortOption = this.getCurrentSortOption();
        let filteredTodos = this.filterBy("project", e.target.dataset.id);
        filteredTodos = this.sortTodos(currentSortOption);
        this.renderTodoList(filteredTodos);
        closeHamburgerMenu();
        this.sidebarMobile.classList.remove("sidebar-mobile--shown");
        this.sidebarMobile.classList.add("sidebar-mobile--hidden");
      }
    });

    this.projectDeleteLinkMobile.addEventListener("click", (e) => {
      if (e.target.matches(".sidebar__group-two-icon-delete-img")) {
        this.deleteProject(e.target.id);
      }
    });

    /* DESKTOP LINKS */
    this.inboxLink.addEventListener("click", () => {
      let currentSortOption = this.getCurrentSortOption();
      this.searchBar.value = "";
      let filteredTodos = this.filterBy("inbox");
      filteredTodos = this.sortTodos(currentSortOption);
      this.renderTodoList(filteredTodos);
    });

    this.todayLink.addEventListener("click", () => {
      const currentSortOption = this.getCurrentSortOption();
      this.searchBar.value = "";
      let filteredTodos = this.filterBy("today");
      filteredTodos = this.sortTodos(currentSortOption);
      this.renderTodoList(filteredTodos);
    });

    this.nextWeekLink.addEventListener("click", () => {
      const currentSortOption = this.getCurrentSortOption();
      this.searchBar.value = "";
      let filteredTodos = this.filterBy("nextweek");
      filteredTodos = this.sortTodos(currentSortOption);
      this.renderTodoList(filteredTodos);
    });

    this.isCompletedLink.addEventListener("click", () => {
      const currentSortOption = this.getCurrentSortOption();
      this.searchBar.value = "";
      let filteredTodos = this.filterBy("completed");
      filteredTodos = this.sortTodos(currentSortOption);
      this.renderTodoList(filteredTodos);
    });

    this.isNotCompletedLink.addEventListener("click", () => {
      const currentSortOption = this.getCurrentSortOption();
      this.searchBar.value = "";
      let filteredTodos = this.filterBy("notcompleted");
      filteredTodos = this.sortTodos(currentSortOption);
      this.renderTodoList(filteredTodos);
    });

    this.highPriorityLink.addEventListener("click", () => {
      const currentSortOption = this.getCurrentSortOption();
      this.searchBar.value = "";
      let filteredTodos = this.filterBy("highpriority");
      filteredTodos = this.sortTodos(currentSortOption);
      this.renderTodoList(filteredTodos);
    });

    this.mediumPriorityLink.addEventListener("click", () => {
      const currentSortOption = this.getCurrentSortOption();
      this.searchBar.value = "";
      let filteredTodos = this.filterBy("mediumpriority");
      filteredTodos = this.sortTodos(currentSortOption);
      this.renderTodoList(filteredTodos);
    });

    this.lowPriorityLink.addEventListener("click", () => {
      const currentSortOption = this.getCurrentSortOption();
      this.searchBar.value = "";
      let filteredTodos = this.filterBy("lowpriority");
      filteredTodos = this.sortTodos(currentSortOption);
      this.renderTodoList(filteredTodos);
    });

    this.projectNamesLink.addEventListener("click", (e) => {
      if (e.target.matches(".sidebar__group-two-expandable-project-name")) {
        this.searchBar.value = "";
        const currentSortOption = this.getCurrentSortOption();
        let filteredTodos = this.filterBy("project", e.target.dataset.id);
        filteredTodos = this.sortTodos(currentSortOption);
        this.renderTodoList(filteredTodos);
      }
    });

    this.projectDeleteLink.addEventListener("click", (e) => {
      if (e.target.matches(".sidebar__group-two-icon-delete-img")) {
        this.deleteProject(e.target.id);
      }
    });

    this.showTodoForm.addEventListener("click", () => {
      this.toggleAddTodoForm();
    });

    this.buttonCancel.addEventListener("click", () => {
      this.toggleAddTodoForm();
    });

    this.searchBar.addEventListener("keyup", () => {
      const currentSortOption = this.getCurrentSortOption();
      const currentCategory = this.getCurrentCategory();
      const currentId = this.getCurrentId();
      let filteredTodos;
      if (currentCategory === "project") {
        filteredTodos = this.filterBy("project", currentId);
      } else {
        filteredTodos = this.filterBy(currentCategory);
      }
      filteredTodos = this.filterTodos();
      filteredTodos = this.sortTodos(currentSortOption);
      this.renderTodoList(filteredTodos);
    });

    this.addProjectDesktop.addEventListener("click", () =>
      this.showAddProjectForm()
    );

    this.addProjectMobile.addEventListener("click", () => {
      closeHamburgerMenu();
      this.sidebarMobile.classList.remove("sidebar-mobile--shown");
      this.sidebarMobile.classList.add("sidebar-mobile--hidden");
      this.showAddProjectForm();
    });

    this.background.addEventListener("click", () => {
      this.removeAddProjectForm();
      this.removeEditTodoForm();
      this.removeViewTodoForm();
    });

    this.addProjectButton.addEventListener("click", (e) => {
      this.addProject(e, this.formProjectName.value);
    });

    this.buttonAddItem.addEventListener("click", (e) => this.addTodo(e));

    this.todoGrid.addEventListener("click", (e) => {
      if (
        e.target.classList.contains("todo-item__project-name") ||
        e.target.classList.contains("todo-item__todo") ||
        e.target.classList.contains("todo-item__notes") ||
        e.target.classList.contains("todo-item__task") ||
        e.target.classList.contains("todo-item")
      ) {
        this.showViewForm(e.target.dataset.id);
      }
    });

    this.todoGrid.addEventListener("click", (e) => {
      if (e.target.id === "deleteIcon") {
        this.deleteTodo(e, e.target.dataset.id);
      }
    });

    this.todoGrid.addEventListener("click", (e) => {
      if (e.target.id === "editIcon") {
        this.showEditForm(e.target.dataset.id);
      }
    });

    this.editButton.addEventListener("click", (e) => {
      this.editTodo(this.editId.id, e);
    });

    this.sortByMobile.addEventListener("click", () => {
      this.toggleSortByMobileMenu();
    });

    this.sortBy.addEventListener("click", () => {
      this.toggleSortByMenu();
    });

    this.sortByFieldsContainerMobile.addEventListener("click", (e) => {
      if (e.target.classList.contains("sorter-mobile")) {
        e.preventDefault();
        let currentFilter;
        if (this.getCurrentId()) {
          currentFilter = this.getCurrentId();
        } else {
          currentFilter = this.getCurrentCategory();
        }
        let filteredTodos = this.filterTodos(currentFilter);
        filteredTodos = this.sortTodos(e.target.getAttribute("id"), e);
        this.renderTodoList(filteredTodos);
      }
    });

    this.sortByFieldsContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("sorter")) {
        e.preventDefault();
        let currentFilter;
        if (this.getCurrentId()) {
          currentFilter = this.getCurrentId();
        } else {
          currentFilter = this.getCurrentCategory();
        }
        let filteredTodos = this.filterTodos(currentFilter);
        filteredTodos = this.sortTodos(e.target.getAttribute("id"), e);
        this.renderTodoList(filteredTodos);
      }
    });

    this.todoGrid.addEventListener("click", (e) => {
      if (e.target.closest(".todo-item__status-circle")) {
        const selector = e.target.closest(".todo-item__status-circle");
        this.toggleComplete(selector.getAttribute("data-id"));
      }
    });
  }

  // add/delete/edit todo and project functions

  addTodo(e) {
    e.preventDefault();
    const form = e.target.form;
    if (form.checkValidity()) {
      const date = this.todoDueDate.value.split("-").map(Number);
      const projectId =
        this.todoProject.options[this.todoProject.selectedIndex].dataset.id;
      const newTodo = new Todo(
        this.todoName.value,
        this.todoDescription.value,
        this.todoProject.value,
        projectId,
        format(new Date(date[0], date[1] - 1, date[2]), "yyyy-MM-dd"),
        this.todoPriority.value,
        this.todoIsComplete(this.todoStatus)
      );
      this.todoList.addATodo(projectId, newTodo);
      this.clearFormFields();
      this.toggleAddTodoForm();
    } else {
      e.stopPropagation();
      form.classList.add("was-validated");
    }
  }

  addProject(e, projectName) {
    e.preventDefault();
    const form = e.target.form;
    if (form.checkValidity()) {
      const newProject = new Project(projectName);
      this.todoList.addAProject(newProject);
      this.formProjectName.value = "";
      this.removeAddProjectForm();
    } else {
      e.stopPropagation();
      form.classList.add("was-validated");
    }
  }

  deleteTodo(e, todoId) {
    e.preventDefault();
    this.todoList.deleteTodo(todoId);
  }

  deleteProject(projectId) {
    const projectToDelete = this.todoList.findProject(projectId);
    const currentProjectId = this.getCurrentId();
    if (projectToDelete.id === currentProjectId) {
      let currentSortOption = this.getCurrentSortOption();
      this.searchBar.value = "";
      let filteredTodos = this.filterBy("inbox");
      filteredTodos = this.sortTodos(currentSortOption);
      this.renderTodoList(filteredTodos);
    }
    this.todoList.deleteProject(projectId);
  }

  editTodo(todoId, e) {
    e.preventDefault();
    const form = e.target.form;
    if (form.checkValidity()) {
      const todo = this.todoList.findTodoById(todoId);
      const date = this.editDueDate.value.split("-").map(Number);
      const originalProjectId = this.editId.dataset.projectId;
      const newProjectId =
        this.editProject.options[this.editProject.selectedIndex].dataset.id;
      todo.updatePriority(this.editPriority.value);
      todo.updateDueDate(
        format(new Date(date[0], date[1] - 1, date[2]), "yyyy-MM-dd")
      );
      todo.updateProject(this.editProject.value);
      todo.updateProjectId(newProjectId);
      todo.updateStatus(this.editStatus.value);
      todo.updateTitle(this.editName.value);
      todo.updateDescription(this.editDescription.value);
      if (!(originalProjectId === newProjectId)) {
        this.todoList.deleteTodo(`${todo.id}`);
        this.todoList.addATodo(newProjectId, todo);
      }
      this.formEditTodo.classList.remove("show");
      this.background.classList.remove("show");
      this.updateView();
    } else {
      e.stopPropagation();
      form.classList.add("was-validated");
    }
  }

  // show hide functions

  showAddProjectForm() {
    this.formAddProjectLink.classList.add("show");
    this.background.classList.add("show");
  }

  removeAddProjectForm() {
    if (this.background.classList.contains("show")) {
      this.background.classList.remove("show");
    }
    if (this.formAddProjectLink.classList.contains("show")) {
      this.formAddProjectLink.classList.remove("show");
    }
  }

  removeEditTodoForm() {
    if (this.background.classList.contains("show")) {
      this.background.classList.remove("show");
    }
    if (this.formEditTodo.classList.contains("show")) {
      this.formEditTodo.classList.remove("show");
    }
  }

  removeViewTodoForm() {
    if (this.background.classList.contains("show")) {
      this.background.classList.remove("show");
    }
    if (this.formViewTodo.classList.contains("show")) {
      this.formViewTodo.classList.remove("show");
    }
  }

  showEditForm(todoId) {
    let todo = this.todoList.findTodoById(todoId);
    let editForm = this.formEditTodo;
    let isComplete = `${todo.isComplete}`;
    let convertIsComplete = this.convertComplete(isComplete);
    const userTimeZoneOffset = new Date().getTimezoneOffset();
    editForm.classList.add("show");
    this.background.classList.add("show");
    this.editName.value = `${todo.title}`;
    this.editDescription.value = `${todo.description}`;
    this.editProject.value = `${todo.project}`;
    this.editPriority.value = `${todo.priority}`;
    this.editStatus.value = convertIsComplete;
    this.editDueDate.value = format(
      new Date(`${todo.dueDate}`).setUTCHours(0, `${userTimeZoneOffset}`, 0, 0),
      "yyyy-MM-dd"
    );
    this.editId.id = `${todo.id}`;
    this.editId.dataset.projectId = `${todo.projectId}`;
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

  setCurrentSortOption(currentSortOption) {
    this.currentSortOption = currentSortOption;
  }

  getCurrentSortOption() {
    return this.currentSortOption;
  }

  // filter functions

  filterBy(category, projectId = null) {
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
    this.todosToDisplay = todos;
    return todos;
  }

  filterTodos() {
    let todos;
    const searchText = this.searchBar.value.toLowerCase().trim();
    this.todosToDisplay = this.returnFilteredArray(
      this.getCurrentCategory(),
      this.getCurrentId(),
      searchText
    );
    todos = this.todosToDisplay;
    return todos;
  }

  filterMatches(todo, searchText) {
    if (searchText === "") {
      return true;
    }
    const title = todo.title.toLowerCase();
    return title.includes(searchText);
  }

  // sort functions

  sortTodos(value = null, e = null) {
    if (e) {
      e.preventDefault();
    }
    this.setCurrentSortOption(value);
    let sortOption = this.getCurrentSortOption();
    let todos = this.todosToDisplay;
    switch (sortOption) {
      case "dateAddedOldest":
        todos.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
        this.sortByText.textContent = "Sort By: Date Added - Oldest to Newest";
        break;
      case "dateAddedNewest":
        todos.sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded));
        this.sortByText.textContent = "Sort By: Date Added - Newest to Oldest";
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
    this.todosToDisplay = todos;
    return todos;
  }

  // render functions

  renderMainSection(todos) {
    // render main section
    this.renderTodoList(todos);
  }

  renderMobileSidebar() {
    this.projectNamesLinkMobile.innerHTML = "";
    this.projectDeleteLinkMobile.innerHTML = "";
    this.projectTodoCountLinkMobile.innerHTML = "";
    this.inboxCountLinkMobile.innerHTML = "";
    this.todayCountLinkMobile.innerHTML = "";
    this.nextWeekCountLinkMobile.innerHTML = "";
    this.isCompletedCountLinkMobile.innerHTML = "";
    this.isNotCompletedCountLinkMobile.innerHTML = "";
    this.highPriorityCountLinkMobile.innerHTML = "";
    this.mediumPriorityCountLinkMobile.innerHTML = "";
    this.lowPriorityCountLinkMobile.innerHTML = "";

    const highPriorityCount = this.todoList.getTodoCountByPriority("3");
    const mediumPriorityCount = this.todoList.getTodoCountByPriority("2");
    const lowPriorityCount = this.todoList.getTodoCountByPriority("1");

    this.highPriorityCountLinkMobile.innerHTML = `${highPriorityCount}`;
    this.mediumPriorityCountLinkMobile.innerHTML = `${mediumPriorityCount}`;
    this.lowPriorityCountLinkMobile.innerHTML = `${lowPriorityCount}`;

    const projects = this.todoList.getAllProjects();
    const projectTodoCount = this.todoList.getTodoCountByProject();

    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

    const inboxTodoCount = this.todoList.getAllTodos().length;
    const todayTodoCount = this.todoList.getTodoCountByDate(today);
    const nextWeekTodoCount = this.todoList.getTodoCountByDate(nextWeek);
    const isCompletedCount = this.todoList.getTodoCountByStatus(true);
    const isNotCompletedCount = this.todoList.getTodoCountByStatus(false);

    this.isCompletedCountLinkMobile.innerHTML = `${isCompletedCount}`;
    this.isNotCompletedCountLinkMobile.innerHTML = `${isNotCompletedCount}`;

    projects.forEach((project) => {
      const li = this.createElem(
        "li",
        "sidebar__group-two-expandable-project-name",
        `${project.title}`
      );
      li.dataset.id = `${project.id}`;
      li.classList.add("cursor");
      const liImg = this.createElem("li", "sidebar-delete-project");

      const deleteProjectIcon = this.createElem(
        "img",
        "sidebar__group-two-icon-delete-img",
        "",
        `./img/delete.png`
      );
      deleteProjectIcon.id = `${project.id}`;
      deleteProjectIcon.classList.add("cursor");
      liImg.appendChild(deleteProjectIcon);
      this.projectNamesLinkMobile.appendChild(li);
      this.projectDeleteLinkMobile.appendChild(liImg);
    });

    projectTodoCount.forEach((todoCount) => {
      const li = this.createElem(
        "li",
        "sidebar__group-two-expandable-project-count",
        `${todoCount}`
      );
      li.classList.add("italic");
      this.projectTodoCountLinkMobile.appendChild(li);
    });

    this.inboxCountLinkMobile.innerHTML = `${inboxTodoCount}`;
    this.todayCountLinkMobile.innerHTML = `${todayTodoCount}`;
    this.nextWeekCountLinkMobile.innerHTML = `${nextWeekTodoCount}`;
  }

  renderSidebar() {
    this.projectNamesLink.innerHTML = "";
    this.projectDeleteLink.innerHTML = "";
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
      li.classList.add("cursor");
      const liImg = this.createElem("li", "sidebar-delete-project");

      const deleteProjectIcon = this.createElem(
        "img",
        "sidebar__group-two-icon-delete-img",
        "",
        `./img/delete.png`
      );
      deleteProjectIcon.id = `${project.id}`;
      deleteProjectIcon.classList.add("cursor");
      liImg.appendChild(deleteProjectIcon);
      this.projectNamesLink.appendChild(li);
      this.projectDeleteLink.appendChild(liImg);
    });

    projectTodoCount.forEach((todoCount) => {
      const li = this.createElem(
        "li",
        "sidebar__group-two-expandable-project-count",
        `${todoCount}`
      );
      li.classList.add("italic");
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
      todoItem.classList.add("cursor__light");
      todoItem.dataset.id = todo.id;
      const itemGroupOne = this.createElem("div", "todo-item__group-one");
      const itemGroupTwo = this.createElem("div", "todo-item__group-two");
      const statusCircle = this.createElem("div", "todo-item__status-circle");
      statusCircle.classList.add(`priority__${todo.priority}`);
      statusCircle.classList.add("cursor");
      statusCircle.dataset.id = todo.id;
      const checkmarkIcon = this.createElem("div", "task__checkmark");
      checkmarkIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24"><path d="M 20.292969 5.2929688 L 9 16.585938 L 4.7070312 12.292969 L 3.2929688 13.707031 L 9 19.414062 L 21.707031 6.7070312 L 20.292969 5.2929688 z"/></svg>`;
      if (todo.isComplete) {
        const svg = checkmarkIcon.querySelector("svg");
        svg.classList.add("completed");
        checkmarkIcon.classList.add("completed");
      }
      checkmarkIcon.classList.add(`checkmark`);
      checkmarkIcon.classList.add(`checkmark__${todo.priority}`);
      checkmarkIcon.dataset.id = todo.id;
      statusCircle.appendChild(checkmarkIcon);
      statusCircle.addEventListener("mouseenter", () => {
        this.toggleCheckmark(statusCircle.querySelector(".task__checkmark"));
      });
      statusCircle.addEventListener("mouseleave", () => {
        this.toggleCheckmark(statusCircle.querySelector(".task__checkmark"));
      });
      const task = this.createElem("p", "todo-item__task");
      task.dataset.id = todo.id;
      const todoTitle = this.createElem(
        "p",
        "todo-item__todo",
        `${todo.title} - `
      );
      todoTitle.dataset.id = todo.id;
      const projectName = this.createElem(
        "span",
        "todo-item__project-name",
        `${todo.project}`
      );
      projectName.dataset.id = todo.id;
      const todoNotes = this.createElem(
        "p",
        "todo-item__notes",
        `${todo.description}`
      );
      todoNotes.dataset.id = todo.id;

      const dueDateDiv = this.createElem("div", "todo-item__due-date");

      const dueDateText = this.createElem(
        "div",
        "todo-item__due-date-text",
        `${todo.dueDate}`
      );

      const dueDateImg = this.createElem("img", "todo-item__due-date-img", "");

      if (this.isToday(`${todo.dueDate}`)) {
        dueDateImg.src = "./img/3644080-200.png";
        dueDateText.classList.add("today");
      } else if (this.isWithinNextWeek(`${todo.dueDate}`)) {
        dueDateImg.src = "./img/5473658-200.png";
        dueDateText.classList.add("nextweek");
      } else {
        dueDateImg.src = "./img/1052664-200.png";
        dueDateText.classList.add("inbox");
      }
      dueDateDiv.appendChild(dueDateImg);
      dueDateDiv.appendChild(dueDateText);
      let editImg = this.createElem(
        "img",
        "todo-item__icon",
        "",
        "./img/edit.png"
      );
      editImg.classList.add("edit__icon");
      editImg.classList.add("cursor");
      editImg.id = "editIcon";
      editImg.dataset.id = `${todo.id}`;
      let deleteImg = this.createElem(
        "img",
        "todo-item__icon",
        "",
        "./img/delete.png"
      );
      if (todo.isComplete) {
        todoTitle.style.textDecoration = "line-through";
        projectName.style.textDecoration = "line-through";
      }
      deleteImg.classList.add("delete__icon");
      deleteImg.classList.add("cursor");
      deleteImg.id = "deleteIcon";
      deleteImg.dataset.id = `${todo.id}`;

      todoItem.addEventListener("mouseenter", (e) => {
        const del = e.target.querySelector("#deleteIcon");
        const edit = e.target.querySelector("#editIcon");
        del.classList.toggle("show");
        edit.classList.toggle("show");
      });
      todoItem.addEventListener("mouseleave", (e) => {
        const del = e.target.querySelector("#deleteIcon");
        const edit = e.target.querySelector("#editIcon");
        del.classList.toggle("show");
        edit.classList.toggle("show");
      });

      todoTitle.appendChild(projectName);
      task.appendChild(todoTitle);
      task.appendChild(todoNotes);
      task.appendChild(dueDateDiv);
      itemGroupOne.appendChild(statusCircle);
      itemGroupOne.appendChild(task);
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
    const projectSelectEdit = this.editProject;
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
    projectSelectEdit.innerHTML = "";
    for (let i = 0; i < projectList.length; i++) {
      const option = this.createElem(
        "option",
        "option",
        `${projectList[i].title}`
      );
      option.dataset.id = `${projectList[i].id}`;
      projectSelectEdit.appendChild(option);
    }
  }

  // update view function

  updateView() {
    const currentSortOption = this.getCurrentSortOption();
    let currentFilter;
    let filteredTodos;
    if (this.getCurrentId()) {
      currentFilter = this.getCurrentId();
      filteredTodos = this.filterBy("project", currentFilter);
    } else {
      currentFilter = this.getCurrentCategory();
      filteredTodos = this.filterBy(currentFilter);
    }
    filteredTodos = this.sortTodos(currentSortOption);

    this.renderTodoList(filteredTodos);
    this.renderMobileSidebar();
    this.renderSidebar();
    this.renderProjectSelect();
  }

  // toggle functions

  toggleSidebarProjectGroupMobile() {
    this.sidebarProjectGroupMobile.classList.toggle("show");

    this.arrowShowProjectsMobile.classList.toggle("collapsed");
  }

  toggleSidebarStatusGroupMobile() {
    this.sidebarStatusGroupMobile.classList.toggle("show");

    this.arrowShowStatusMobile.classList.toggle("collapsed");
  }

  toggleSidebarPriorityGroupMobile() {
    this.sidebarPriorityGroupMobile.classList.toggle("show");

    this.arrowShowPriorityMobile.classList.toggle("collapsed");
  }

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

  toggleIcons() {
    this.deleteIcon.classList.toggle("show");
    this.editIcon.classList.toggle("show");
  }

  toggleSortByMenu() {
    this.sortByFieldsContainer.classList.toggle("show");
  }

  toggleSortByMobileMenu() {
    this.sortByFieldsContainerMobile.classList.toggle("show");
  }

  toggleAddTodoForm() {
    this.formAddTodo.classList.toggle("hide");
  }

  toggleComplete(todoId) {
    const todo = this.todoList.findTodoById(todoId);
    todo.toggleComplete();
    this.updateView();
  }

  toggleCheckmark(selector) {
    selector.classList.toggle("show");
  }

  addCheckmark(selector) {
    if (!selector.classList.contains("show")) {
      selector.classList.add("show");
    }
  }

  removeCheckmark(selector) {
    if (selector.classList.contains("show")) {
      selector.classList.remove("show");
    }
  }

  showViewForm(todoId) {
    const todo = this.todoList.findTodoById(todoId);
    let isComplete = `${todo.isComplete}`;
    let priority = `${todo.priority}`;
    let convertIsComplete = this.convertCompleteToString(isComplete);
    let convertPriority = this.convertPriority(priority);
    this.background.classList.add("show");
    this.formViewTodo.classList.add("show");
    this.viewTitle.textContent = `${todo.title}`;
    this.viewNotes.textContent = `${todo.description}`;
    this.viewProject.textContent = `${todo.project}`;
    this.viewPriority.textContent = convertPriority;
    this.viewDueDate.textContent = `${todo.dueDate}`;
    this.viewStatus.textContent = convertIsComplete;
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
    this.todoDueDate.valueAsDate = new Date();
    this.todoStatus.value = "";
  }

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

  todoIsComplete(value) {
    let isComplete;
    value.options[value.selectedIndex].textContent === "Completed"
      ? (isComplete = true)
      : (isComplete = false);
    return isComplete;
  }

  convertComplete(value) {
    if (value === "true") {
      return 2;
    } else {
      return 1;
    }
  }

  convertCompleteToString(value) {
    if (value === "true") {
      return "Completed";
    } else {
      return "Not Completed";
    }
  }

  convertPriority(value) {
    if (value === "1") {
      return "Low";
    } else if (value === "2") {
      return "Medium";
    } else {
      return "High";
    }
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
  // init functions

  initAddTodo() {
    /* FORM ADD TODO */
    this.formAddTodo = document.querySelector(".form__add-todo-container");
    this.todoName = document.querySelector("#name");
    this.todoDescription = document.querySelector("#description");
    this.todoProject = document.querySelector("#project");
    this.todoPriority = document.querySelector("#priority");
    this.todoDueDate = document.querySelector("#dueDate");
    this.todoStatus = document.querySelector("#status");
  }

  initAddProjectForm() {
    /* FORM ADD PROJECT */
    this.formProjectName = document.querySelector("#projectName");
    this.formAddProjectLink = document.querySelector(".form__add-project");
  }

  initViewProjectForm() {
    this.forms = document.querySelectorAll(".needs-validation");
    this.formViewTodo = document.querySelector(".form__view-todo");
    this.viewTitle = document.querySelector("#titleView");
    this.viewNotes = document.querySelector("#notesView");
    this.viewProject = document.querySelector("#projectView");
    this.viewPriority = document.querySelector("#priorityView");
    this.viewDueDate = document.querySelector("#dueDateView");
    this.viewStatus = document.querySelector("#statusView");
  }

  initEditTodoForm() {
    /* FORM - EDIT TODO */
    this.formEditTodo = document.querySelector(".form__edit-todo");
    this.editName = document.querySelector("#editName");
    this.editDescription = document.querySelector("#editDescription");
    this.editProject = document.querySelector(".select__edit-project");
    this.editPriority = document.querySelector("#editPriority");
    this.editDueDate = document.querySelector("#editDueDate");
    this.editStatus = document.querySelector("#editStatus");
    this.editId = document.querySelector(".id");
    this.editButton = document.querySelector("#editItemButton");
  }

  initMobileSidebar() {
    /* SIDEBAR MOBILE - INBOX & DATES */
    this.sidebarMobile = document.querySelector(".sidebar-mobile");

    this.inboxLinkMobile = document.querySelector("#inbox-mobile");
    this.todayLinkMobile = document.querySelector("#today-mobile");
    this.nextWeekLinkMobile = document.querySelector("#nextWeek-mobile");

    this.inboxCountLinkMobile = document.querySelector("#inboxCount-mobile");
    this.todayCountLinkMobile = document.querySelector("#todayCount-mobile");
    this.nextWeekCountLinkMobile = document.querySelector(
      "#nextWeekCount-mobile"
    );

    /* SIDEBAR MOBILE - PROJECTS */
    this.sidebarProjectGroupMobile = document.querySelector(
      ".sidebar__group-two-expandable-projects-mobile"
    );
    this.projectNamesLinkMobile = document.querySelector(
      "#sidebar__group-two-expandable-project-names-mobile"
    );

    this.projectDeleteLinkMobile = document.querySelector(
      "#sidebar__group-two-expandable-project-delete-icons-mobile"
    );

    this.projectTodoCountLinkMobile = document.querySelector(
      "#sidebar__group-two-expandable-project-count-mobile"
    );

    this.addProjectMobile = document.querySelector("#addProject-mobile");

    this.arrowShowProjectsMobile = document.querySelector(
      ".sidebar__group-two-icon-arrow-img-1-mobile"
    );

    /* SIDEBAR MOBILE - STATUS */
    this.sidebarStatusGroupMobile = document.querySelector(
      ".sidebar__group-two-expandable-status-mobile"
    );

    this.isCompletedLinkMobile = document.querySelector("#completed-mobile");
    this.isNotCompletedLinkMobile = document.querySelector(
      "#notCompleted-mobile"
    );
    this.isCompletedCountLinkMobile = document.querySelector(
      "#completedCount-mobile"
    );
    this.isNotCompletedCountLinkMobile = document.querySelector(
      "#notCompletedCount-mobile"
    );

    this.isCompletedCountUlMobile = document.querySelector(
      "#sidebar__group-two-expandable-project-status-count-mobile"
    );

    this.arrowShowStatusMobile = document.querySelector(
      ".sidebar__group-two-icon-arrow-img-2-mobile"
    );

    /* SIDEBAR MOBILE - FILTER */
    this.sidebarPriorityGroupMobile = document.querySelector(
      ".sidebar__group-two-expandable-priority-mobile"
    );
    this.arrowShowPriorityMobile = document.querySelector(
      ".sidebar__group-two-icon-arrow-img-3-mobile"
    );

    this.highPriorityLinkMobile = document.querySelector("#high-mobile");
    this.mediumPriorityLinkMobile = document.querySelector("#medium-mobile");
    this.lowPriorityLinkMobile = document.querySelector("#low-mobile");

    this.highPriorityCountLinkMobile =
      document.querySelector("#highCount-mobile");
    this.mediumPriorityCountLinkMobile = document.querySelector(
      "#mediumCount-mobile"
    );
    this.lowPriorityCountLinkMobile =
      document.querySelector("#lowCount-mobile");
  }

  initSidebar() {
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

    this.projectDeleteLink = document.querySelector(
      "#sidebar__group-two-expandable-project-delete-icons"
    );

    this.projectTodoCountLink = document.querySelector(
      "#sidebar__group-two-expandable-project-count"
    );
    this.addProjectDesktop = document.querySelector("#addProject");

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
  }

  initMainSection() {
    /* MAIN SECTION */
    this.todoGrid = document.querySelector(".main-section__todo-grid");
    this.title = document.querySelector(".main-section__title");
    this.sortBy = document.querySelector(".sort-outside-container");
    this.sortByMobile = document.querySelector(
      ".main-section__sort-container-mobile"
    );
    this.sortByFieldsContainer = document.querySelector(
      ".main-section__sort-fields-container"
    );
    this.sortByFieldsContainerMobile = document.querySelector(
      ".main-section__sort-fields-container-mobile"
    );
    this.sortByText = document.querySelector(".main-section__sort-text");

    /* TODO-ITEM */

    this.editIcon = document.querySelector("#editIcon");
    this.deleteIcon = document.querySelector("#deleteIcon");

    /* SEARCH BAR */
    this.searchBar = document.querySelector(".navbar__search-bar-container");

    /* BACKGROUND */
    this.background = document.querySelector(".background");
  }

  initButtons() {
    /* BUTTONS */
    this.buttonAddItem = document.querySelector("#itemButton"); // OK
    this.buttonAddProject = document.querySelector("#projectButton"); // OK
    this.addProjectButton = document.querySelector("#addProjectButton");
    this.showTodoForm = document.querySelector(".main-section__add-todo"); //
    this.buttonCancel = document.querySelector(".button__cancel");
    this.resetButton = document.getElementById("resetBtn");
  }

  initQuerySelectors() {
    this.initButtons();
    this.initAddTodo();
    this.initAddProjectForm();
    this.initViewProjectForm();
    this.initEditTodoForm();
    this.initMobileSidebar();
    this.initSidebar();
    this.initMainSection();
  }
}
