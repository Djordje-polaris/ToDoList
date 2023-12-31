const dateButton = document.getElementById("date_button");
const datePicker = document.getElementById("date_picker");
const addButton = document.getElementById("add");

const month_list = [
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

let lista_taskova = [
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

const rem = (taskId) => {
  lista_taskova.forEach((task, index) => {
    task.taskId == taskId ? lista_taskova.splice(index, 1) : false;
  });
  update();
};

const change = (taskName, taskId) => {
  const task_element = document.getElementById(taskId);
  const task_header = task_element.querySelector(".task_header");
  const h_edit = document.createElement("input");
  h_edit.setAttribute("class", "h_edit");
  h_edit.setAttribute("type", "text");
  h_edit.setAttribute("value", taskName);
  task_header.appendChild(h_edit);
  h_edit.style.display = "block";
  h_edit.addEventListener("blur", () => {
    lista_taskova.forEach((task) => {
      task.taskId == taskId ? (task.taskName = h_edit.value) : false;
    });
    update();
  });
};

const update = () => {
  localStorage.setItem("lista_taskova", JSON.stringify(lista_taskova));
  const task_container = document.getElementById("task_container");

  task_container.innerHTML = "";

  lista_taskova.forEach((task) => {
    const date = new Date(task.taskDate);
    const month = date.getMonth();
    const day = date.getDate();
    console.log(date.toLocaleDateString("en-US"), task.taskName, task.taskId);

    const task_element = document.createElement("div");
    task_element.setAttribute("id", task.taskId);
    task_element.setAttribute("class", "task");

    const task_header = document.createElement("div");
    task_header.setAttribute("class", "task_header");

    const h = document.createElement("h2");
    h.setAttribute("class", "task_name");
    h.innerHTML = task.taskName;
    h.addEventListener("dblclick", () => {
      h.style.display = "none";
      change(task.taskName, task.taskId);
    });

    const date_div = document.createElement("button");
    date_div.addEventListener("click", () => {
      rem(task.taskId);
    });
    date_div.setAttribute("class", "rem");

    const p_month = document.createElement("p");
    p_month.innerHTML = month_list[month];

    const p_day = document.createElement("p");
    p_day.innerHTML = day;

    date_div.appendChild(p_month);
    date_div.appendChild(p_day);
    task_header.appendChild(h);
    task_element.appendChild(task_header);
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

  if (
    task.taskDate instanceof Date ||
    !isNaN(task.taskDate) ||
    task.taskName === ""
  ) {
    alert("Niste dobro uneli informacije, molim Vas unesite ponovo");
  } else {
    lista_taskova.push(task);
    document.getElementById("text").value = "";
    document.getElementById("date_picker").style.display = "none";
    document.getElementById("date_picker").value = "";
    dateButton.style.display = "block";

    update();
  }
};

lista_taskova = JSON.parse(localStorage.getItem("lista_taskova"));
update();

addButton.addEventListener("click", add);
dateButton.addEventListener("click", calendar);
