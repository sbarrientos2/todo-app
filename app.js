// Get the input element and todo list element
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const toggleButton = document.getElementById("toggle-theme");
const lightThemeLink = document.getElementById("light-theme");
const darkThemeLink = document.getElementById("dark-theme");
const progressBar = document.getElementById("progress-bar");

// Change the theme of the website
toggleButton.addEventListener("click", function () {
  toggleTheme();
});

// Add a submit event listener to the form
document.querySelector("form").addEventListener("submit", function(event) {
  event.preventDefault();
  addTodo();
});

function toggleTheme() {
  if (lightThemeLink.disabled) {
    lightThemeLink.disabled = false;
    darkThemeLink.disabled = true;
  } else {
    lightThemeLink.disabled = true;
    darkThemeLink.disabled = false;
  }
}

function updateProgressBar() {
  const totalTodos = todoList.children.length;
  const completedTodos = todoList.querySelectorAll("input[type=checkbox]:checked").length; 
  progressBar.value = (completedTodos / totalTodos) * 100;
}

function addTodo() {
  const todo = todoInput.value.trim();
  if (todo === "") {
    return;
  }
  const todoItem = createTodoItem(todo);
  todoList.appendChild(todoItem);
  updateProgressBar();
  todoInput.value = "";
}

function createTodoItem(todo) {
  const todoItem = document.createElement("li");
  todoItem.textContent = todo;
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  todoItem.prepend(checkbox);
  const deleteButton = createDeleteButton();
  const editButton = createEditButton(todo, todoItem, checkbox, deleteButton);
  checkbox.addEventListener("change", function() {
    updateProgressBar();
  });
  deleteButton.addEventListener("click", function() {
    todoList.removeChild(todoItem);
    updateProgressBar();
  });
  todoItem.appendChild(deleteButton);
  todoItem.appendChild(editButton);
  return todoItem;
}

function createDeleteButton() {
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.title = 'Delete Todo';
  return deleteButton;
}

function createEditButton(todo, todoItem, checkbox, deleteButton) {
  const todoEditInput = document.createElement("input");
  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.title = 'Edit Todo';
  editButton.addEventListener("click", function() {
    replaceTodoItemWithInput(todoItem, todoEditInput, todo, checkbox, deleteButton, editButton);
  });
  todoEditInput.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
      replaceInputWithTodoItem(todoItem, todoEditInput, todo, checkbox, deleteButton, editButton);
      updateProgressBar();
    }
  });
  return editButton;
}

function replaceTodoItemWithInput(todoItem, todoEditInput, todo, checkbox, deleteButton, editButton) {
  todoEditInput.value = todo;
  todoItem.textContent = "";
  todoItem.appendChild(todoEditInput);
  todoEditInput.focus();
}

function replaceInputWithTodoItem(todoItem, todoEditInput, todo, checkbox, deleteButton, editButton) {
  todoItem.textContent = todoEditInput.value;
  todoItem.prepend(checkbox);
  todoItem.appendChild(deleteButton);
  todoItem.appendChild(editButton);
}
