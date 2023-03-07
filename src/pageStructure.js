function createElem(type, cls, txtContent, imgSrc) {
  let newElem = document.createElement(type);
  if (!(cls === undefined) && !(cls === "")) {
    newElem.classList.add(cls);
  }
  newElem.textContent = txtContent;
  newElem.src = imgSrc;
  return newElem;
}

function createForm(act) {
  let newForm = document.createElement("form");
  newForm.action = act;
  return newForm;
}

let bg = createElem("div", "background");
let projectForm = createElem("form", "add__project__form");
let mainDiv = createElem("div", "main__div");
let projectNameLabel = createElem("label", "", "Project name:");
projectNameLabel.for = "projectName";
let projectNameInput = createElem("input");
projectNameInput.type = "text";
projectNameInput.id = "projectName";
projectNameInput.name = "projectName";
let subDiv = createElem("div", "sub__div");
let submitButton = createElem("button", "submit__button", "Add Project");
submitButton.classList.add("button__project");
submitButton.id = "projectButton";

let mainContainer = createElem("div", "main__container");
let topBar = createElem("div", "top__bar");
let groupOne = createElem("div", "group__one");
let logoNavBar = createElem("img", "logo", "", "../src/img/list-rich-64.png");
let groupTwo = createElem("div", "group__two");
let searchBar = createElem("div", "search__bar");
let logoSearch = createElem("img", "search", "", "../src/img/search-3-xxl.png");
let inputSearch = createElem("input", "inside__container");
inputSearch.type = "text";
inputSearch.placeholder = "Search";
inputSearch.id = "searchBar";
let groupThree = createElem("div", "group__three");
let logoOne = createElem(
  "img",
  "logo",
  "",
  "../src/img/appointment-reminders-xl.png"
);
let logoTwo = createElem("img", "logo", "", "../src/img/ok-xl.png");
let logoThree = createElem("img", "logo", "", "../src/img/settings-5-xl.png");

subDiv.appendChild(submitButton);
mainDiv.appendChild(projectNameLabel);
mainDiv.appendChild(projectNameInput);
mainDiv.appendChild(subDiv);
projectForm.appendChild(mainDiv);

groupOne.appendChild(logoNavBar);
searchBar.appendChild(logoSearch);
searchBar.appendChild(inputSearch);
groupTwo.appendChild(searchBar);
groupThree.appendChild(logoOne);
groupThree.appendChild(logoTwo);
groupThree.appendChild(logoThree);
topBar.appendChild(groupOne);
topBar.appendChild(groupTwo);
topBar.appendChild(groupThree);
mainContainer.appendChild(topBar);

let gridContainer = createElem("div", "grid__container");
let sidebar = createElem("div", "side__bar");
let gridGroup1 = createElem("div", "grid_group1");
let gridGroup2 = createElem("div", "grid_group2");
let col1 = createElem("div", "col__1");
let col2 = createElem("div", "col__2");
let col3 = createElem("div", "col__3");
let img1 = createElem("img", "logo__margin", "", "../src/img/1052664-200.png");
img1.classList.add("logo__sidebar");
let img2 = createElem("img", "logo__margin", "", "../src/img/3644080-200.png");
img2.classList.add("logo__sidebar");
let img3 = createElem("img", "logo__margin", "", "../src/img/5473658-200.png");
img3.classList.add("logo__sidebar");
let gridRow1 = createElem("p", "grid__row", "Inbox");
gridRow1.id = "inbox";
let gridRow2 = createElem("p", "grid__row", "Today");
gridRow2.id = "today";
let gridRow3 = createElem("p", "grid__row", "Next 7 days");
gridRow3.id = "nextWeek";
let gridRow4 = createElem("p", "grid__row");
gridRow4.id = "inboxCount";
gridRow4.classList.add("italic");
let gridRow5 = createElem("p", "grid__row");
gridRow5.id = "todayCount";
gridRow5.classList.add("italic");
let gridRow6 = createElem("p", "grid__row");
gridRow6.id = "nextWeekCount";
gridRow6.classList.add("italic");
let mainRow1 = createElem("div", "main__row");
mainRow1.classList.add("border__top");
let sidebarTitle1 = createElem("div", "text", "Projects");
let icons = createElem("div", "icons");
let addProjectGroup = createElem("div", "add_project");
let iconPlusImg = createElem(
  "img",
  "logo__plus",
  "",
  "../src/img/plus-8-xl.png"
);
iconPlusImg.id = "projectAdd";
let iconArrowImg1 = createElem(
  "img",
  "arrow__sidebar",
  "",
  "../src/img/arrow-left-svgrepo-com.png"
);
iconArrowImg1.classList.add("as1");
/* iconArrowImg1.dataset[bs - toggle] = "collapse"; */
let sidebarProjectsSection = createElem("div", "sidebar__projects");
sidebarProjectsSection.classList.add("collapse");
let gridProjects = createElem("div", "grid__projects");
let sidebarProjectsTitle = createElem("ul");
sidebarProjectsTitle.id = "sidebarProjects";
let sidebarProjectsCount = createElem("ul");
sidebarProjectsCount.id = "sidebarProjectsCount";
let mainRow2 = createElem("div", "main__row");
mainRow2.classList.add("border__top");
let sidebarTitle2 = createElem("div", "text", "Labels");
let iconArrowImg2 = createElem(
  "img",
  "arrow__sidebar",
  "",
  "../src/img/arrow-left-svgrepo-com.png"
);
iconArrowImg2.classList.add("as2");
/* iconArrowImg2.dataset[bs - toggle] = "collapse"; */
let insertUL = createElem("ul");
let sidebarLabelSection = createElem("div", "sidebar__labels");
sidebarLabelSection.classList.add("collapse");
let sidebarLabel1 = createElem("li", "sidebar__label", "Dummy");
let sidebarLabel2 = createElem("li", "sidebar__label", "Dummy");
let sidebarLabel3 = createElem("li", "sidebar__label", "Dummy");
let mainRow3 = createElem("div", "main__row");
mainRow3.classList.add("border__top");
let sidebarTitle3 = createElem("div", "text", "Filters");
let iconArrowImg3 = createElem(
  "img",
  "arrow__sidebar",
  "",
  "../src/img/arrow-left-svgrepo-com.png"
);
iconArrowImg3.classList.add("as3");
/* iconArrowImg3.dataset[bs - toggle] = "collapse"; */
let insertUL2 = createElem("ul");
let sidebarFilterSection = createElem("div", "sidebar__filters");
sidebarFilterSection.classList.add("collapse");
let sidebarFilter1 = createElem("li", "sidebar__filter", "Dummy");
let sidebarFilter2 = createElem("li", "sidebar__filter", "Dummy");
let sidebarFilter3 = createElem("li", "sidebar__filter", "Dummy");
let borderTop = createElem("div", "main__row");
borderTop.classList.add("border__top");

col1.appendChild(img1);
col1.appendChild(img2);
col1.appendChild(img3);
col2.appendChild(gridRow1);
col2.appendChild(gridRow2);
col2.appendChild(gridRow3);
col3.appendChild(gridRow4);
col3.appendChild(gridRow5);
col3.appendChild(gridRow6);
gridGroup1.appendChild(col1);
gridGroup1.appendChild(col2);
gridGroup1.appendChild(col3);

addProjectGroup.appendChild(iconPlusImg);
icons.appendChild(addProjectGroup);
icons.appendChild(iconArrowImg1);
mainRow1.appendChild(sidebarTitle1);
mainRow1.appendChild(icons);
gridProjects.appendChild(sidebarProjectsTitle);
gridProjects.appendChild(sidebarProjectsCount);
sidebarProjectsSection.appendChild(gridProjects);
mainRow2.appendChild(sidebarTitle2);
mainRow2.appendChild(iconArrowImg2);
sidebarLabelSection.appendChild(sidebarLabel1);
sidebarLabelSection.appendChild(sidebarLabel2);
sidebarLabelSection.appendChild(sidebarLabel3);
mainRow3.appendChild(sidebarTitle3);
mainRow3.appendChild(iconArrowImg3);
sidebarFilterSection.appendChild(sidebarFilter1);
sidebarFilterSection.appendChild(sidebarFilter2);
sidebarFilterSection.appendChild(sidebarFilter3);
gridGroup2.appendChild(mainRow1);
gridGroup2.appendChild(sidebarProjectsSection);
gridGroup2.appendChild(mainRow2);
gridGroup2.appendChild(sidebarLabelSection);
gridGroup2.appendChild(mainRow3);
gridGroup2.appendChild(sidebarFilterSection);
gridGroup2.appendChild(borderTop);
sidebar.appendChild(gridGroup1);
sidebar.appendChild(gridGroup2);
gridContainer.appendChild(sidebar);

let mainSection = createElem("div", "main__section");
let mainTitle = createElem("h1", "main__title", "Inbox");
let TDLGrid = createElem("div", "TDL__grid");

let divAddProject = createElem("div", "add__project__div");
let imgContainer = createElem("div", "img__container");
let iconPlusImg2 = createElem(
  "img",
  "logo__plus__red",
  "",
  "../src/img/plus-8-xl.png"
);
let addProjectPara = createElem("p", "para", "Add a task");

let formContainer = createElem("div", "form__container");
formContainer.classList.add("hide");
let form = createForm("");
let formGrid = createElem("div", "form__grid");
let nameInput = createElem("input", "block__input");
nameInput.required = true;
nameInput.type = "text";
nameInput.name = "name";
nameInput.id = "name";
nameInput.placeholder = "Name";
let descriptionInput = createElem("input", "block__input");
descriptionInput.required = true;
descriptionInput.type = "text";
descriptionInput.name = "description";
descriptionInput.id = "description";
descriptionInput.placeholder = "Description";
let projectSelect = createElem("select");
projectSelect.id = "project";
projectSelect.setAttribute("required", "");
let projectOption = createElem("option");
projectOption.selected = true;
let dueDateInput = createElem("input", "block__input");
dueDateInput.required = true;
dueDateInput.type = "text";
dueDateInput.name = "dueDate";
dueDateInput.id = "dueDate";
dueDateInput.placeholder = "Due date";
let prioritySelect = createElem("select");
prioritySelect.id = "priority";
let priorityOptionSelected = createElem("option", "", "Select Priority");
let priorityOption1 = createElem("option", "", "Low");
priorityOption1.value = "1";
let priorityOption2 = createElem("option", "", "Mid");
priorityOption2.value = "2";
let priorityOption3 = createElem("option", "", "High");
priorityOption3.value = "3";
let statusSelect = createElem("select");
statusSelect.id = "status";
let statusOptionSelected = createElem("option", "", "Select Status");
let statusOption1 = createElem("option", "", "Not Started");
statusOption1.value = "1";
let statusOption2 = createElem("option", "", "Started");
statusOption2.value = "2";
let statusOption3 = createElem("option", "", "Completed");
statusOption3.value = "3";
let buttonsDiv = createElem("div", "buttons");
let cancelBtn = createElem("a", "cancel__button", "Cancel");
cancelBtn.id = "cancel";
let submitBtn = createElem("button", "submit__button", "Add Item");
submitBtn.id = "itemButton";
submitBtn.type = "submit";

projectSelect.innerHTML = projectOption;
prioritySelect.appendChild(priorityOptionSelected);
prioritySelect.appendChild(priorityOption1);
prioritySelect.appendChild(priorityOption2);
prioritySelect.appendChild(priorityOption3);
statusSelect.appendChild(statusOptionSelected);
statusSelect.appendChild(statusOption1);
statusSelect.appendChild(statusOption2);
statusSelect.appendChild(statusOption3);
buttonsDiv.appendChild(cancelBtn);
buttonsDiv.appendChild(submitBtn);
formGrid.appendChild(nameInput);
formGrid.appendChild(descriptionInput);
formGrid.appendChild(projectSelect);
formGrid.appendChild(dueDateInput);
formGrid.appendChild(prioritySelect);
formGrid.appendChild(statusSelect);
formGrid.appendChild(buttonsDiv);
form.appendChild(formGrid);
formContainer.appendChild(form);
imgContainer.appendChild(iconPlusImg2);
divAddProject.appendChild(imgContainer);
divAddProject.appendChild(addProjectPara);
mainSection.appendChild(mainTitle);
mainSection.appendChild(TDLGrid);
mainSection.appendChild(divAddProject);
mainSection.appendChild(formContainer);
gridContainer.appendChild(mainSection);
document.body.appendChild(bg);
document.body.appendChild(projectForm);
document.body.appendChild(mainContainer);
document.body.appendChild(gridContainer);
