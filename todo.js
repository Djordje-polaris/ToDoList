const dateButton = document.getElementById("date_button");
const datePicker = document.getElementById("date_picker");
const addButton = document.getElementById("add");

const lista_taskova = [
  {
    taskName: "task1",
    taskDate: new Date("1, 1, 2001"),
    taskId: Math.floor(Math.random() * 100000) + 1,
  },
  {
    taskName: "task2",
    taskDate: new Date("2, 2, 2001"),
    taskId: Math.floor(Math.random() * 100000) + 1,
  },
  {
    taskName: "task3",
    taskDate: new Date("3, 3, 2001"),
    taskId: Math.floor(Math.random() * 100000) + 1,
  },
];
const text_default = document.getElementById("text").value;

const calendar = () => {
  datePicker.style.display = "block";
  dateButton.style.display = "none";
};

const pravi = () => {
  const task_container = document.getElementById("task_container");

  task_container.innerHTML = "";

  let month_list = [
    "January",
    "February",
    "March",
    "April",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  lista_taskova.forEach((task) => {
    const date = new Date(task.taskDate);
    const month = date.getMonth();
    const day = date.getDate();
    console.log(task.taskDate, task.taskName, task.taskId);

    const task_element = document.createElement("div");
    const h = document.createElement("h2");
    h.innerHTML = task.taskName;

    const date_div = document.createElement("div");
    // date_div.setAttribute("id", task.taskId);
    date_div.setAttribute("id", "rem");
    const p_month = document.createElement("p");
    p_month.innerHTML = month_list[month];
    const p_day = document.createElement("p");
    p_day.innerHTML = day;

    date_div.appendChild(p_month);
    date_div.appendChild(p_day);
    task_element.appendChild(h);
    task_element.appendChild(date_div);
    task_container.appendChild(task_element);
  });
};

const add = () => {
  const task = {
    taskName: document.getElementById("text").value,
    taskDate: document.getElementById("date_picker").value,
    taskId: Math.floor(Math.random() * 100000) + 1,
  };
  lista_taskova.push(task);
  document.getElementById("text").value = "";
  datePicker.style.display = "none";
  dateButton.style.display = "block";
  pravi();
};

// const remButton = document.getElementById("rem")

// remButton.addEventListener("click", rem);

// const rem = () => {
//   lista_taskova.splice();
// };

pravi();

addButton.addEventListener("click", add);
dateButton.addEventListener("click", calendar);
