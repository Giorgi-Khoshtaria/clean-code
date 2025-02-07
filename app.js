var taskInput = document.getElementById("new-task");
var addButton = document.getElementsByTagName("button")[0];
var incompleteTaskHolder = document.getElementById("incomplete-tsks");
var completedTasksHolder = document.getElementById("completed-tasks");

var createNewTaskElement = function (taskString) {
  var listItem = document.createElement("li");
  listItem.className = "task-item";

  var checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.className = "checkbox";

  var label = document.createElement("label");
  label.innerText = taskString;
  label.className = "task task-item-label";

  var editInput = document.createElement("input");
  editInput.type = "text";
  editInput.className = "task text-inputs";

  var editButton = document.createElement("button");
  editButton.innerText = "Edit";
  editButton.className = "edit button";

  var deleteButton = document.createElement("button");
  deleteButton.className = "delete";
  var deleteButtonImg = document.createElement("img");
  deleteButtonImg.src = "./remove.svg";
  deleteButtonImg.className = "delete-image";
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
};

var addTask = function () {
  if (!taskInput.value.trim()) return; // Prevent empty input

  var listItem = createNewTaskElement(taskInput.value);
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = ""; // Clear input after adding
};

var editTask = function () {
  var listItem = this.parentNode;
  var editInput = listItem.querySelector("input[type=text]");
  var label = listItem.querySelector("label");
  var editBtn = listItem.querySelector(".edit");
  var isEditMode = listItem.classList.contains("editMode");

  if (isEditMode) {
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  listItem.classList.toggle("editMode");
};

var deleteTask = function () {
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  ul.removeChild(listItem);
};

var taskCompleted = function () {
  var listItem = this.parentNode;
  listItem.querySelector(".task-item-label").classList.add("complated-label");
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

var taskIncomplete = function () {
  var listItem = this.parentNode;
  listItem
    .querySelector(".task-item-label")
    .classList.remove("complated-label");
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  var checkBox = taskListItem.querySelector("input[type=checkbox]");
  var editButton = taskListItem.querySelector(".edit");
  var deleteButton = taskListItem.querySelector(".delete");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
};

// Bind existing tasks
for (var i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (var i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}

// Add event listener to the Add button
addButton.addEventListener("click", addTask);

addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);
