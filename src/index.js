/* IMPORT MODULES */
import "./css/reset.css";
import "./css/validation.css";
import "./css/navbar.css";
import "./css/forms.css";
import "./css/sidebar.css";
import "./css/mainSection.css";
import "./css/todolist.css";
import "./css/general.css";
import "./css/animationsAndEffects.css";
import "./css/style.css";
import "./models.js";
import "./UI.js";
import "./hamburger.js";
import { Todo, Project, TodoList } from "./models.js";
import { TodoListView } from "./UI.js";
import { compareAsc, format } from "date-fns";
import { loadTodoList } from "./storage";

/* INITIALIZE PAGE */
loadTodoList();
