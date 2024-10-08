export function postTask (name, description, dueDate, status) {
    const url = "http://localhost:7070/api/tasks/add-task";
    const createrequest = new Request(url, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify({
            name: name,
            description: description,
            dueDate: dueDate,
            status: status,
        }),
    });

    fetch(createrequest)
        .then((response) => {
            if (response.status === 201) {
                console.log("Task created successfully");
            } else {
                alert("Invalid parameters, please try again");
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

export async function getAllTasks (name, description, dueDate, status) {
    const url = "http://localhost:7070/api/tasks/all-tasks";
    const getAllRequest = new Request(url, {
        method: "GET"
    });
    const response = await fetch(getAllRequest);
    const tasks = await response.json();
    return tasks;
}

export async function deleteTaskDB (id) {
    const url = `http://localhost:7070/api/tasks/${id}`;
    const deleteRequest = new Request(url, {
        method: "DELETE"
    });

    fetch(deleteRequest)
        .then((response) => {
            if (response.status === 204) {
                console.log("Task deleted successfully");
            } else {
                alert("An error occurred, please try again");
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

export function putTask (name, description, dueDate, status, id) {
    const url = `http://localhost:7070/api/tasks/${id}`;
    const putrequest = new Request(url, {
        method: "PUT",
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify({
            id : Number(id),
            name: name,
            description: description,
            dueDate: dueDate,
            status: status,
        }),
    });

    fetch(putrequest)
        .then((response) => {
            if (response.status === 201) {
                console.log("Task updated successfully");
            } else {
                alert("Invalid parameters, please try again");
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

export async function deleteAllTasks () {
    const url = "http://localhost:7070/api/tasks/delete-all";
    const deleteAllRequest = new Request(url, {
        method: "DELETE"
    });
    const response = await fetch(deleteAllRequest);
    return await response.json();
}