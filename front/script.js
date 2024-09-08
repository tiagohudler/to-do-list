import { postTask } from "./api/functions.js";
// Pop-up funtions for create form

function openForm() {
    document.getElementById("createForm").style.display = "flex";
}
  
function closeForm() {
    document.getElementById("createForm").style.display = "none";
}

let openCreateFormButton = document.getElementById("createTask");
openCreateFormButton.addEventListener("click", openForm);

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