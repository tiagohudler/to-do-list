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

    tasks.sort((a, b) => {
        return new Date(a.dueDate) - new Date(b.dueDate);
    });
    // Get the div with the id "taskList"
    const taskListDiv = document.getElementById("task-list");

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
        editButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
            </svg>
        `;

        // Create Exclude Button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-button");
        deleteButton.addEventListener("click", () => deleteTask(task.id, tasks));
        deleteButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
            </svg>
        `;

        // Create a button container div
        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("button-container");
        buttonContainer.appendChild(editButton);
        buttonContainer.appendChild(deleteButton);

        // Append buttons to task div
        taskDiv.appendChild(buttonContainer);

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

// cancel button closes form

function closeFormById(id) {
    console.log(id);
    document.getElementById(id).parentElement.style.display = "none";
}

document.getElementById("cancelUpdateButton").addEventListener("click", () => closeFormById("cancelUpdateButton"));

document.getElementById("cancelCreateButton").addEventListener("click", () => closeFormById("cancelCreateButton"));

// search by phrase

document.getElementById("searchByWord").addEventListener("click", async () => {
    let searchPhrase = document.getElementById("searchButton").value;
    let tasks = await getAllTasks();
    let filteredTasks = tasks.filter((task) => task.name.includes(searchPhrase) || task.description.includes(searchPhrase));
    createTaskList(filteredTasks);
});