import { postTask } from "./api/functions.js";
import { getAllTasks } from "./api/functions.js";
import { deleteTaskDB } from "./api/functions.js";
// Pop-up funtions for create form

function openForm() {
    document.getElementById("createForm").style.display = "flex";
}
  
function closeForm() {
    document.getElementById("createForm").style.display = "none";
}

// delete task function

function deleteTask(id, tasks) {
    let task = document.getElementById(id);
    deleteTaskDB(id);
    tasks = tasks.filter((task) => task.id !== id);
    task.remove();
}

// given a list of tasks, append tasks onto the display
function createTaskList (tasks) {
    // Get the div with the id "taskList"
    const taskListDiv = document.getElementById("taskList");

    // Clear the div to ensure no duplicate entries
    taskListDiv.innerHTML = '';

    // Loop through the tasks array
    tasks.forEach((task) => {
        // Create a new div for each task
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task-item");  // Optionally add a class for styling

        // Create a string for the task details
        const taskDetails = `
            <p><strong>Name:</strong> ${task.name}</p>
            <p><strong>Due Date:</strong> ${task.dueDate}</p>
            <p><strong>Status:</strong> ${task.status}</p>
        `;

        // Set the innerHTML of the new div
        taskDiv.innerHTML = taskDetails;

        // Create Edit Button
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.classList.add("edit-button");
        //editButton.addEventListener("click", () => editTask(index));

        // Create Exclude Button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-button");
        deleteButton.addEventListener("click", () => deleteTask(task.id, tasks));

        // Append buttons to task div
        taskDiv.appendChild(editButton);
        taskDiv.appendChild(deleteButton);

        taskDiv.id = task.id;

        // Append the new div to the taskList div
        taskListDiv.appendChild(taskDiv);
    });
}

createTaskList(await getAllTasks());

// create task button opens up form
let openCreateFormButton = document.getElementById("createTask");
openCreateFormButton.addEventListener("click", openForm);

// create task form submission
let createTaskButton = document.getElementById("createForm");
createTaskButton.addEventListener("submit", (e) => {
    
    e.preventDefault();
  
    let taskName = document.getElementById("taskName").value;
    let taskDescription = document.getElementById("taskDescription").value;
    let dueDate = document.getElementById("dueDate").value;
    let taskStatus = document.getElementById("taskStatus").value;

    postTask(taskName, taskDescription, dueDate, taskStatus);
    closeForm();


});

