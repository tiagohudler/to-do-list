import { postTask } from "./api/functions.js";
import { getAllTasks } from "./api/functions.js";
import { deleteTaskDB } from "./api/functions.js";
import { putTask } from "./api/functions.js";
import { deleteAllTasks } from "./api/functions.js";


// Pop-up funtions for create and update forms

function openBackGroundProtection() {
    document.getElementById("background-protection").style.display = "block";
}

function closeBackGroundProtection() {
    document.getElementById("background-protection").style.display = "none";
}

function openCreateForm() {
    document.getElementById("createForm").style.display = "flex";
    openBackGroundProtection();
}
  
function closeCreateForm() {

    closeBackGroundProtection();
    document.getElementById("createForm").style.display = "none";
    
}
  
function closeUpdateForm() {
    document.getElementById("form-container").textContent = '';
    closeBackGroundProtection();
}



// Conevert date from "YYYY-MM-DD" to "DD/MM/YYYY"
function transformDate(dateString) {
    if (dateString !== null) {
        
        const [year, month, day] = dateString.split('-');
        
        return `${day}/${month}/${year}`;

    }

    else {
        return "-";
    }
}

// Format status

function formatStatus(input) {
    
    let words = input.toLowerCase().split('_');
  
    
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
  
    
    return words.join(' ');
  }

// Show task details function
function showTaskDetails(name, description, dueDate, status) {
    
    let taskDetailsDiv = document.createElement('div');
    taskDetailsDiv.id = 'task-details';
    document.body.appendChild(taskDetailsDiv);

    openBackGroundProtection();
    // Fill the div with the task details
    taskDetailsDiv.innerHTML = `
            <h2>${name}</h2>
        <div>
            <div>
                <h3>Description:</h3>
                <p>${description}</p>
            </div>
            <div>
                <h3>Due Date:</h3>
                <p>${transformDate(dueDate)}</p>
            </div>
            <div>
                <h3>Status:</h3>
                <p>${formatStatus(status)}</p>
            </div>
        </div>
        <button id="closeTaskDetails" class="cancelButton">Close</button>
    `;

    // Add event listener to close the div

    document.getElementById('closeTaskDetails').addEventListener('click', () => {
        taskDetailsDiv.textContent = '';
        taskDetailsDiv.parentNode.removeChild(taskDetailsDiv);
        closeBackGroundProtection();
    });
    
    taskDetailsDiv.style.display = 'block';
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
    })();}, 300);


}

// event handler for update form submission

function updateEventHandler(e, id) {
    e.preventDefault();
    let taskName = document.getElementById("updateName").value;
    let taskDescription = document.getElementById("updateDescription").value;
    let dueDate = document.getElementById("updateDueDate").value;
    let taskStatus = document.getElementById("updateStatus").value;
    document.getElementById("updateForm").removeEventListener("submit", updateEventHandler);

    putTask(taskName, taskDescription, dueDate, taskStatus, id);
    closeUpdateForm();
    setTimeout(() => {
    (async () => {
        createTaskList(await getAllTasks());
    })();}, 100);

}

// edit task function, opens the form and returns it to original state

function editTask(e, task) {
    e.stopPropagation();
    document.getElementById("form-container").innerHTML = `
    <form id="updateForm" class="inputform">
        <div class="form-item">
            <label for="updateName">Task Name:</label>
            <input type="text" id="updateName" name="updateName" placeholder="Task Name" required>
        </div>
        <div class="form-item">
            <label for="updateDescription">Task Description:</label>
            <textarea type="text" id="updateDescription" name="updateDescription" placeholder="Task Description" rows="4"></textarea>
        </div>
        <div class="form-item">
            <label for="updateDueDate">Due Date:</label>
            <input type="date" id="updateDueDate" name="updateDueDate" placeholder="Task Due Date">
        </div>
        <div class="form-item">
            <label for="updateStatus">Task status:</label>
            <select id="updateStatus" name="updateStatus">
                <option value="NOT_STARTED">Not Started</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="ON_HOLD">On Hold</option>
                <option value="COMPLETED">Completed</option>
            </select>
        </div>
        <div>
            <input type="submit" class="submit-form-button" value="Submit">
            <input type="button" value="Cancel" class="cancelButton" id="cancelUpdateButton">
        </div>
    </form>`;
    openBackGroundProtection();
    document.getElementById("updateName").value = task.name;
    document.getElementById("updateDueDate").value = task.dueDate;
    document.getElementById("updateStatus").value = task.status;
    document.getElementById("updateDescription").value = task.description; 
    document.getElementById("updateForm").addEventListener("submit", (elem) => updateEventHandler(elem, task.id));
    document.getElementById("cancelUpdateButton").addEventListener("click", () => closeFormById("updateForm"));

}

// delete task function
function deleteTask(e, id, tasks) {
    
    e.stopPropagation();

    let task = document.getElementById(id);
    deleteTaskDB(id);
    tasks = tasks.filter((task) => task.id !== id);
    task.remove();
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
        taskDiv.classList.add("task-item"); 

        let taskDetails;
        // Check if the task has a due date, to maintain the same structure in the task
        if (task.dueDate === null) {
            taskDetails = `
            <p class="task-item-name"><strong>${task.name}</strong></p>
            <p><strong>Due by: </strong>-</p>
            <div class="status-container">
                <div class="${task.status} task-status-color"></div>
                <p><strong>${formatStatus(task.status)}</strong></p>
            </div>
            `;
        } else {
            taskDetails = `
            <p class="task-item-name"><strong>${task.name}</strong></p>
            <p><strong>Due by: </strong>${transformDate(task.dueDate)}</p>
            <div class="status-container">
                <div class="${task.status} task-status-color"></div>
                <p><strong>${formatStatus(task.status)}</strong></p>
            </div>
            `;
        }

        // Set the innerHTML of the new div
        taskDiv.innerHTML = taskDetails;

        // Create Edit Button
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.classList.add("edit-button");
        editButton.addEventListener("click", (e) => editTask(e, task));
        editButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
            </svg>
        `;

        // Create Exclude Button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-button");
        deleteButton.addEventListener("click", (e) => deleteTask(e, task.id, tasks));
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

        taskDiv.addEventListener("click", () => showTaskDetails(task.name, task.description, task.dueDate, task.status));

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
    closeBackGroundProtection();
    document.getElementById(id).style.display = "none";
}


document.getElementById("cancelCreateButton").addEventListener("click", () => closeFormById("createForm"));

// search by phrase

document.getElementById("search-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    let searchPhrase = document.getElementById("search-button").value;
    let tasks = await getAllTasks();
    let filteredTasks = tasks.filter((task) => task.name.includes(searchPhrase) || task.description.includes(searchPhrase));
    createTaskList(filteredTasks);
});

// clear button

document.getElementById("delete-all-tasks").addEventListener("click", () => {
    deleteAllTasks();
    document.getElementById("task-list").innerHTML = '';
});