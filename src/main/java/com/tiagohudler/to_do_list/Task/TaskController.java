package com.tiagohudler.to_do_list.Task;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskRepository taskRepository;

    public TaskController (TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }
    
    @GetMapping()
    List <Task> getAll () {
        return taskRepository.getAll();
    }

    @GetMapping("/{id}")
    Task getById (@PathVariable int id) {
        Optional<Task> task = taskRepository.getById(id);
        if (task.isEmpty()) {
            throw new RuntimeException("Task not found");
        }
        return task.get();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("")
    void createTask (@RequestBody Task task) {
        taskRepository.addTask(task);
    }

    @PutMapping("")
    void updateTask (@RequestBody Task task) {
        taskRepository.update(task, task.id());
    }

    @DeleteMapping("/{id}")
    void deleteTask (@PathVariable int id) {
        taskRepository.delete(id);
    }
}
