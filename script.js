const task_array = [];
let countDone = 0;
let countTodo = 0;

function newTask() {
  const taskInput = document.querySelector("#taskInput");
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    return;
  }

  const task = {};
  task.id = self.crypto.randomUUID();
  task.todo = taskText;
  task.checked = false;

  task_array.push(task);
  console.log("task_array", task_array);

  showList();

  taskInput.value = "";
  changeCount();
}

const addButton = document.querySelector("#addBtn");
addButton.addEventListener("pointerdown", newTask);

function showList() {
  const openListContainer = document.querySelector("#taskList");
  const completedListContainer = document.querySelector("#taskComplete");

  openListContainer.innerHTML = "";
  completedListContainer.innerHTML = "";

  task_array.forEach((task) => {
    const clone = document.querySelector("#taskTemplate").content.cloneNode(true);
    const deleteBtn = clone.querySelector(".deleteBtn");
    const checkbox = clone.querySelector(".task-completed");

    deleteBtn.addEventListener("pointerdown", () => {
      deleteTask(task.id);
    });

    checkbox.addEventListener("change", () => {
      updateTaskStatus(task, checkbox.checked);
    });

    clone.querySelector("span").textContent = task.todo;

    if (task.checked) {
      completedListContainer.appendChild(clone);
      checkbox.checked = true;
    } else {
      openListContainer.appendChild(clone);
    }
  });
}

function updateTaskStatus(task) {
  if (task.checked) {
    task.checked = false;
  } else {
    task.checked = true;
  }
  console.log(task_array);
  showList();
  changeCount();
}

function changeCount() {
  const countDoneFilter = task_array.filter((task) => task.checked === true);
  countDone = countDoneFilter.length;
  document.querySelector("#compCounter").textContent = countDone;

  const countTodoFilter = task_array.filter((task) => task.checked === false);
  countTodo = countTodoFilter.length;
  document.querySelector("#openCounter").textContent = countTodo;
}

function deleteTask(taskId) {
  const index = task_array.findIndex((task) => task.id === taskId);
  if (index !== -1) {
    task_array.splice(index, 1);
    showList();
    changeCount();
  }
}
