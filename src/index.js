/* IMPORT MODULES */
import "./style.css";
import "./models.js";
import "./UI.js";
import { Todo, Project, TodoList } from "./models.js";
import { TodoListView } from "./UI.js";
import { compareAsc, format } from "date-fns";

/* INITIALIZE PAGE */

function addDays(date, days) {
  const copy = new Date(Number(date));
  copy.setDate(date.getDate() + days);
  return copy;
}

const today = new Date();
const newDate1 = addDays(today, 1);
const newDate2 = addDays(today, 2);
const newDate3 = addDays(today, 3);
const newDate4 = addDays(today, 4);
const newDate5 = addDays(today, 5);
const newDate6 = addDays(today, 6);
const newDate7 = addDays(today, 7);
const newDate8 = addDays(today, 8);
const newDate9 = addDays(today, 9);
const newDate10 = addDays(today, 10);

let fullYear = today.getFullYear();
let month = today.getMonth();
let day = today.getDate();

const todayFormat = format(new Date(fullYear, month, day), "MM-dd-yyyy");

const proj1 = new Project("Corporal Designer");

const proj2 = new Project("Despacho");

/* let item1 = new Todo(
  "Contactar red de amigas1",
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique quibusdam doloremque ex in. Sunt, aut voluptatum. Perferendis accusantium dolores architecto saepe consequatur debitis, velit vel placeat magnam dolore quia eligendi!",
  `${proj1.title}`,
  `${proj1.id}`,
  "02-20-2023",
  "3",
  true,
  today
);

let item2 = new Todo(
  "Preparar cita lunes2",
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique quibusdam doloremque ex in. Sunt, aut voluptatum. Perferendis accusantium dolores architecto saepe consequatur debitis, velit vel placeat magnam dolore quia eligendi!",
  `${proj2.title}`,
  `${proj2.id}`,
  "02-26-2023",
  "2",
  true,
  newDate1
);

let item3 = new Todo(
  "Revisar lluvia de ideas3",
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique quibusdam doloremque ex in. Sunt, aut voluptatum. Perferendis accusantium dolores architecto saepe consequatur debitis, velit vel placeat magnam dolore quia eligendi!",
  `${proj1.title}`,
  `${proj1.id}`,
  "02-15-2023",
  "1",
  false,
  newDate2
);

let item4 = new Todo(
  "Agendar cita con Primo y socios4",
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique quibusdam doloremque ex in. Sunt, aut voluptatum. Perferendis accusantium dolores architecto saepe consequatur debitis, velit vel placeat magnam dolore quia eligendi!",
  `${proj2.title}`,
  `${proj2.id}`,
  `${todayFormat}`,
  "2",
  false,
  newDate3
);

let item5 = new Todo(
  "Revisar catalogo de servicios5",
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique quibusdam doloremque ex in. Sunt, aut voluptatum. Perferendis accusantium dolores architecto saepe consequatur debitis, velit vel placeat magnam dolore quia eligendi!",
  `${proj2.title}`,
  `${proj2.id}`,
  `${todayFormat}`,
  "2",
  false,
  newDate4
);

let item6 = new Todo(
  "Aumentar numero de resenas6",
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique quibusdam doloremque ex in. Sunt, aut voluptatum. Perferendis accusantium dolores architecto saepe consequatur debitis, velit vel placeat magnam dolore quia eligendi!",
  `${proj1.title}`,
  `${proj1.id}`,
  "02-28-2023",
  "1",
  false,
  newDate5
);

let item7 = new Todo(
  "Pedir Calendario Matt7",
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique quibusdam doloremque ex in. Sunt, aut voluptatum. Perferendis accusantium dolores architecto saepe consequatur debitis, velit vel placeat magnam dolore quia eligendi!",
  `${proj1.title}`,
  `${proj1.id}`,
  "03-01-2023",
  "3",
  true,
  newDate6
);

let item8 = new Todo(
  "Hacer Inyeccion Botox8",
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique quibusdam doloremque ex in. Sunt, aut voluptatum. Perferendis accusantium dolores architecto saepe consequatur debitis, velit vel placeat magnam dolore quia eligendi!",
  `${proj1.title}`,
  `${proj1.id}`,
  "03-02-2023",
  "2",
  false,
  newDate7
);

let item9 = new Todo(
  "Ir Reunion Emprendedores9",
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique quibusdam doloremque ex in. Sunt, aut voluptatum. Perferendis accusantium dolores architecto saepe consequatur debitis, velit vel placeat magnam dolore quia eligendi!",
  `${proj2.title}`,
  `${proj2.id}`,
  "03-05-2023",
  "3",
  true,
  newDate8
);

let item10 = new Todo(
  "Estudiar Negocio Primo10",
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique quibusdam doloremque ex in. Sunt, aut voluptatum. Perferendis accusantium dolores architecto saepe consequatur debitis, velit vel placeat magnam dolore quia eligendi!",
  `${proj2.title}`,
  `${proj2.id}`,
  "03-06-2023",
  "1",
  false,
  newDate9
);

let item11 = new Todo(
  "Preparar Propuesta de Servicios11",
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique quibusdam doloremque ex in. Sunt, aut voluptatum. Perferendis accusantium dolores architecto saepe consequatur debitis, velit vel placeat magnam dolore quia eligendi!",
  `${proj2.title}`,
  `${proj2.id}`,
  "03-07-2023",
  "3",
  true,
  newDate10
); */

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

todoList.addAProject(project1, project2, project3);

const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

project1.addTodo(item1, item2, item3);
project2.addTodo(item4, item5, item6);
project3.addTodo(item7, item8, item9);

const todoListView = new TodoListView(todoList);

/* // Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();
 */
