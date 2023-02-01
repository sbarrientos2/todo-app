// Get the input element, to-do list element, and form element
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const todoForm = document.getElementById("todo-form");
const progressBar = document.getElementById("progress-bar");

// Load the to-dos from local storage, if any
const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];

// Add the saved to-dos to the page
for (const todo of savedTodos) {
  addTodoToPage(todo);
}

// Function to update progress bar
function updateProgressBar() {
  // Get progress bar element
  const progressBar = document.getElementById("progress-bar")

  // Get the number of total tasks and completed tasks
  const totalTodos = todoList.children.length;
  const completedTodos = todoList.querySelectorAll("input[type=checkbox]:checked").length; 

  // Update the progress bar value
  progressBar.value = (completedTodos / totalTodos) * 100;
};

// Listen for form submissions
todoForm.addEventListener("submit", function(event) {
  // Prevent form from submitting
  event.preventDefault();

  // Get the to-do input value
  const todo = todoInput.value;

  // Check if the to-do input is not empty
  if (todo.trim() === "") {
    return;
  }

  // Add the to-do to the page
  addTodoToPage(todo);

  // Clear the input field
  todoInput.value = "";

  // Update the saved to-dos
  savedTodos.push(todo);
  localStorage.setItem("todos", JSON.stringify(savedTodos));

  // Update the progress bar
  updateProgressBar();
});

function addTodoToPage(todo) {
  // Create a new list item for the to-do
  const todoItem = document.createElement("li");
  todoItem.textContent = todo;

  // Create a checkbox for the to-do item
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  // Add the checkbox to the to-do item
  todoItem.prepend(checkbox);

  // Add a change event listener to the checkbox
  checkbox.addEventListener("change", function() {
    updateProgressBar();
  });

  // Create a delete button for the to-do
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";

  // Add a click event listener to the delete button
  deleteButton.addEventListener("click", function() {
    todoList.removeChild(todoItem);
    updateSavedTodos();
    updateProgressBar();
  });

  // Create an edit button for the to-do
  const editButton = document.createElement("button");
  editButton.textContent = "Edit";

  // Add a click event listener to the edit button
  editButton.addEventListener("click", function() {
    const todoEditInput = document.createElement("input");
    todoEditInput.value = todo;
    todoItem.textContent = "";
    todoItem.appendChild(todoEditInput);
    todoEditInput.focus();

    todoEditInput.addEventListener("keyup", function(event) {
      if (event.key === "Enter") {
        todoItem.textContent = todoEditInput.value;
        todoItem.prepend(checkbox);
        todoItem.appendChild(deleteButton);
        todoItem.appendChild(editButton);
        updateSavedTodos();
      }
    });
  });

  // Append the delete button to the task item
  todoItem.appendChild(deleteButton);

  // Append the edit button to the task item
  todoItem.appendChild(editButton);

  // Append the todo item to the list
  todoList.appendChild(todoItem);
}

// Add a submit event listener to the form
todoForm.addEventListener("submit", function(event) {
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

  // Add the checkbox to the todo item
  todoItem.prepend(checkbox);

  // Add a change event listener to the checkbox
  checkbox.addEventListener("change", function() {
    updateProgressBar();
  });

  // Create a delete button for the todos
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";

  // Add a click event listener to the delete button
  deleteButton.addEventListener("click", function() {
    todoList.removeChild(todoItem);
    updateSavedTodos();
  });

  // Create an edit button for the todos
  const editButton = document.createElement("button");
  editButton.textContent = "Edit";

  // Add a click event listener to the edit button
  editButton.addEventListener("click", function() {
    const todoEditInput = document.createElement("input");
    todoEditInput.value = todo;
    todoItem.textContent = "";
    todoItem.appendChild(todoEditInput);
    todoEditInput.focus();
    todoEditInput.addEventListener("keyup", function(event) {
      if (event.key === "Enter") {
        todoItem.textContent = todoEditInput.value;
        todoItem.prepend(checkbox);
        todoItem.appendChild(deleteButton);
        todoItem.appendChild(editButton);
        updateSavedTodos();
      }
    });
  });

  // Append the delete button to the task item
  todoItem.appendChild(deleteButton);

  // Append the edit button to the task item
  todoItem.appendChild(editButton);

  // Append the todo item to the list
  todoList.appendChild(todoItem);
});

// Event listener for the form submit event
todoForm.addEventListener("submit", function(event) {
  event.preventDefault();
  
  // Get the value of the input field
  const todoText = todoInput.value;
  
  // Check if the input field is not empty
  if (todoText) {
    // Create a new todo item
    const todo = document.createElement("li");
    todo.textContent = todoText;
    // Create a delete button for the todo item
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    // Add a click event listener to the delete button
    deleteButton.addEventListener("click", function() {
      todo.remove();
    });

    // Append the delete button to the todo item
    todo.appendChild(deleteButton);

    // Create an edit button for the todo item
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";

    // Add a click event listener to the edit button
    editButton.addEventListener("click", function() {
      const todoEditInput = document.createElement("input");
      todoEditInput.value = todo.textContent;
      todo.textContent = "";
      todo.appendChild(todoEditInput);
      todoEditInput.focus();

      // Add a blur event listener to the input field
      todoEditInput.addEventListener("blur", function() {
        todo.textContent = todoEditInput.value;
        todo.appendChild(editButton);
      });
    });

    // Append the edit button to the todo item
    todo.appendChild(editButton);

    // Append the todo item to the list
    todoList.appendChild(todo);

    // Clear the input field
    todoInput.value = "";
  }
});
