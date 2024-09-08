import { postTask } from "./api/functions.js";
import { getAllTasks } from "./api/functions.js";
import { deleteTaskDB } from "./api/functions.js";
import { putTask } from "./api/functions.js";
// Pop-up funtions for create form

function openCreateForm() {
    document.getElementById("createForm").style.display = "flex";
}
  
function closeCreateForm() {
    document.getElementById("createForm").style.display = "none";
}

function openUpdateForm() {
    document.getElementById("updateForm").style.display = "flex";
}
  
function closeUpdateForm() {
    document.getElementById("updateForm").style.display = "none";
}

// event handler for create form submission
function createEventHandler(e) {
    
    e.preventDefault();
  
    let taskName = document.getElementById("taskName").value;
    let taskDescription = document.getElementById("taskDescription").value;
    let dueDate = document.getElementById("dueDate").value;
    let taskStatus = document.getElementById("taskStatus").value;
    
    postTask(taskName, taskDescription, dueDate, taskStatus);
    closeCreateForm();
    setTimeout(() => {
    (async () => {
        createTaskList(await getAllTasks());
    })();}, 100);


}

// event handler for update form submission

function updateEventHandler(id) {
    let taskName = document.getElementById("updateName").value;
    let taskDescription = document.getElementById("updateDescription").value;
    let dueDate = document.getElementById("updateDueDate").value;
    let taskStatus = document.getElementById("updateStatus").value;
    putTask(taskName, taskDescription, dueDate, taskStatus, id);
    closeUpdateForm();
    setTimeout(() => {
    (async () => {
        createTaskList(await getAllTasks());
    })();}, 100);
}


// delete task function
function deleteTask(id, tasks) {
    let task = document.getElementById(id);
    deleteTaskDB(id);
    tasks = tasks.filter((task) => task.id !== id);
    task.remove();
}

// edit task function, opens the form and returns it to original state

function editTask(id, tasks) {

    openUpdateForm();
    const task = tasks.find((task) => task.id === id);
    document.getElementById("updateName").value = task.name;
    document.getElementById("updateDueDate").value = task.dueDate;
    document.getElementById("updateStatus").value = task.status;
    document.getElementById("updateDescription").value = task.description; 
    document.getElementById("updateForm").addEventListener("submit", () => updateEventHandler(id));
    
}

// given a list of tasks, append tasks onto the display
function createTaskList(tasks) {
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
        editButton.addEventListener("click", () => editTask(task.id, tasks));

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

// Get all tasks and display them in first startup

createTaskList(await getAllTasks());



// create task button opens up form
let openCreateFormButton = document.getElementById("createTask");
openCreateFormButton.addEventListener("click", openCreateForm);

// create task form submission
let createTaskForm = document.getElementById("createForm");
createTaskForm.addEventListener("submit", createEventHandler);


