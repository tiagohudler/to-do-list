package com.tiagohudler.to_do_list.Task;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
