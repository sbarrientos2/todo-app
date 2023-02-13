// Get the input element and todo list element
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

const toggleButton = document.getElementById("toggle-theme");
const lightThemeLink = document.getElementById("light-theme");
const darkThemeLink = document.getElementById("dark-theme");

// Change the theme of the website
toggleButton.addEventListener("click", function () {
  if (lightThemeLink.disabled) {
    lightThemeLink.disabled = false;
    darkThemeLink.disabled = true;
  } else {
    lightThemeLink.disabled = true;
    darkThemeLink.disabled = false;
  }
});

// Function to update the progress bar
function updateProgressBar() {
  // Get progress bar element
  const progressBar = document.getElementById("progress-bar")

  // Get the number of total tasks and completed tasks
  const totalTodos = todoList.children.length;
  const completedTodos = todoList.querySelectorAll("input[type=checkbox]:checked").length; 

  // Update the progress bar value
  progressBar.value = (completedTodos / totalTodos) * 100;
};

// Add a submit event listener to the form
document.querySelector("form").addEventListener("submit", function(event) {
  // Prevent the form from submitting 
  event.preventDefault();

  // Get the todo input value
  const todo = todoInput.value;

  // Check that the todo input is not empty
  if (todo.trim() === "") {
    return;
  }

  // Create a new list item from the todo
  const todoItem = document.createElement("li");
  todoItem.textContent = todo;

  // Create a checkbox for the todo element
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  todoItem.prepend(checkbox);

  // Add a change event listener to the checkbox
  checkbox.addEventListener("change", function() {
  // Update the progress bar value
  updateProgressBar();
});

// Create a delete button for the todos
const deleteButton = document.createElement("button");
deleteButton.textContent = "Delete";
deleteButton.title = 'Delete Todo'

// Add a click event listener to the delete button
deleteButton.addEventListener("click", function() {
  todoList.removeChild(todoItem);
  updateProgressBar();
});

// Create an input field for editing the todo
const todoEditInput = document.createElement("input");

// Create an edit button for the todo
const editButton = document.createElement("button");
editButton.textContent = "Edit";
editButton.title = 'Edit Todo'

// Add a click event listener to the edit button
editButton.addEventListener("click", function() {
  // Replace the text content of the task with an input field
  todoEditInput.value = todo;
  todoItem.textContent = "";
  todoItem.appendChild(todoEditInput);
  todoEditInput.focus();
});

todoEditInput.addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    todoItem.textContent = todoEditInput.value;
    todoItem.prepend(checkbox);
    todoItem.appendChild(deleteButton);
    todoItem.appendChild(editButton);
    updateProgressBar();
  }
});

// Append the delete button to the task item
todoItem.appendChild(deleteButton);

// Append the edit button to the task item
todoItem.appendChild(editButton);

// Append the task item to the task list
todoList.appendChild(todoItem);

// Call the updateProgressBar function
updateProgressBar();

// Clear the task input value
todoInput.value = "";
});

// Function to update the progress bar
function updateProgressBar() {
  // Get progress bar element
  const progressBar = document.getElementById("progress-bar");
  
  // Get the number of total tasks and completed tasks
  const totalTodos = todoList.children.length;
  const completedTodos = todoList.querySelectorAll("input[type=checkbox]:checked").length;
  
  // Update the progress bar value
  progressBar.value = (completedTodos / totalTodos) * 100;
};