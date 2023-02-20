// Get the input element and todo list element
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

// Get the toggle button and the links to light and dark theme
const toggleButton = document.getElementById("toggle-theme");
const lightThemeLink = document.getElementById("light-theme");
const darkThemeLink = document.getElementById("dark-theme");

// Get the progress bar
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

// Function to change the theme of the website form light to dark 
function toggleTheme() {
  if (lightThemeLink.disabled) {
    lightThemeLink.disabled = false;
    darkThemeLink.disabled = true;
  } else {
    lightThemeLink.disabled = true;
    darkThemeLink.disabled = false;
  }
}

// Update progress bar's value
function updateProgressBar() {
  const totalTodos = todoList.children.length;
  const completedTodos = todoList.querySelectorAll("input[type=checkbox]:checked").length; 
  progressBar.value = (completedTodos / totalTodos) * 100;
}

// Add todo to the list
function addTodo() {
  // Check the todo's value is not empty " "
  const todo = todoInput.value.trim();
  if (todo === "") {
    return;
  }

  // Save the new todo to local storage
  const todos = JSON.parse(localStorage.getItem('todos')) || [];
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));

  // Create new todo item
  const todoItem = createTodoItem(todo);
  // Add new item to the list
  todoList.appendChild(todoItem);
  // Update progress bar's value
  updateProgressBar();
  todoInput.value = "";
}

// Create new todo item using const todo created in the addTodo function
function createTodoItem(todo) {
  // Create new todo item or li item for the ul
  const todoItem = document.createElement("li");

  // Give the new item a value
  todoItem.textContent = todo;

  // Create the new item with a clear checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  // Put the checkbox on the left of the todo item
  todoItem.prepend(checkbox);

  // Create delete and edit buttons for the new todo item
  const deleteButton = createDeleteButton();
  const editButton = createEditButton(todo, todoItem, checkbox, deleteButton);

  // Add an event listener to the checkbox that updates the progress bar when changed
  checkbox.addEventListener("change", function() {
    updateProgressBar();
  });

  // Add event listener to the delete button so it removes the current item and updates progress bar
  deleteButton.addEventListener("click", function() {
    todoList.removeChild(todoItem);
    updateProgressBar();

    // Remove the deleted todo from local storage
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    const index = todos.indexOf(todo);
    if (index > -1) {
      todos.splice(index, 1);
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  });

  // Add the delete and edit buttons on the right of the todo item
  todoItem.appendChild(deleteButton);
  todoItem.appendChild(editButton);
  return todoItem;
}

// Retrieve saved todos on page load
const todos = JSON.parse(localStorage.getItem("todos")) || [];
todos.forEach(function(todo) {
  const todoItem = createTodoItem(todo);
  todoList.appendChild(todoItem);
});

// Update progress bar's value on page load
updateProgressBar();

// Function that creates a new delete button
function createDeleteButton() {
  
  // Create new button
  const deleteButton = document.createElement("button");

  // Give the button text with textContent and title
  deleteButton.textContent = "Delete";
  deleteButton.title = 'Delete Todo';

  return deleteButton;
}

// Function that creates a new edit button
function createEditButton(todo, todoItem, checkbox, deleteButton) {
  // Create the input and button elements. To use them
  // Text input field that I'll use to edit the todo
  const todoEditInput = document.createElement("input");

  // Button I'll click to edit the todo
  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.title = 'Edit Todo';

  function handleEditClick() {
    replaceTodoItemWithInput(todoItem, todoEditInput, todo, checkbox, deleteButton, editButton);
  }

  function handleInputKeyUp(event) {
    if (event.key === "Enter") {
      const newTodo = todoEditInput.value;
      replaceInputWithTodoItem(todoItem, todoEditInput, checkbox, deleteButton, editButton);
      updateProgressBar();
      todo = newTodo; // Update the todo argument with the new value
    }
  }

  editButton.addEventListener("click", handleEditClick);
  todoEditInput.addEventListener("keyup", handleInputKeyUp);

  return editButton;
}

// Function that replaces the todo item with certain input
function replaceTodoItemWithInput(todoItem, todoEditInput, todo, checkbox, deleteButton, editButton) {
  todoEditInput.value = todo;
  todoItem.textContent = "";
  todoItem.appendChild(todoEditInput);
  todoEditInput.focus();
}

function replaceInputWithTodoItem(todoItem, todoEditInput, checkbox, deleteButton, editButton) {
  const newTodo = todoEditInput.value;
  todoItem.textContent = newTodo;
  todoItem.prepend(checkbox);
  todoItem.appendChild(deleteButton);
  todoItem.appendChild(editButton);
}
