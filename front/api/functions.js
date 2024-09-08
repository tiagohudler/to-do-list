export function postTask (name, description, dueDate, status) {
    const url = "http://localhost:8080/api/tasks/add-task";
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
                alert("Task created successfully");
            } else {
                alert("An error occurred, please try again");
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

export async function getAllTasks (name, description, dueDate, status) {
    const url = "http://localhost:8080/api/tasks/all-tasks";
    const getAllRequest = new Request(url, {
        method: "GET"
    });
    const response = await fetch(getAllRequest);
    const tasks = await response.json();
    return tasks;
}