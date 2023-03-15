/* IMPORT MODULES */
import "./style.css";
import "./models.js";
import "./UI.js";
import "./hamburger.js";
import { Todo, Project, TodoList } from "./models.js";
import { TodoListView } from "./UI.js";
import { compareAsc, format } from "date-fns";
import { loadTodoList } from "./storage";

/* INITIALIZE PAGE */

loadTodoList();

/* let todoList, todoListView;
let initialized;

console.log(initialized);

const savedData = loadTodoList();
/* if (savedData) {
  console.log("ptdr");
}
console.log(savedData);
 /* if (initialized > 0) {
  console.log("ako");
  todoList = new TodoList(savedData.projects, savedData.todos);
  todoListView = new TodoListView(todoList);
} else {
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
  todoList = new TodoList();

  todoList.addAProject(project1, project2, project3);

  project1.addTodo(item1, item2, item3);
  project2.addTodo(item4, item5, item6);
  project3.addTodo(item7, item8, item9);

  console.log({ project1, project2, project3 });

  const todoListView = new TodoListView(todoList);
  initialized++;
}

export function resetInitialize() {
  initialized = 0;
  console.log(initialized);
}
 */
