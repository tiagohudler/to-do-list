package com.tiagohudler.to_do_list.Task;

import com.tiagohudler.to_do_list.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @GetMapping("/all-tasks")
    public ResponseEntity<List<Task>> findAll () {
        List<Task> tasks = taskService.findAll();
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> findById (@PathVariable Long id) {
        Optional<Task> task = taskService.findById(id);
        if (task.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(task.get());
    }

    @PostMapping("/add-task")
    public ResponseEntity<Task> addTask (@RequestBody Task task) {
        Task savedTask = taskService.save(task);
        return new ResponseEntity<>(savedTask, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask (@RequestBody Task task, @PathVariable Long id) {
        Optional<Task> existingTask = taskService.findById(id);

        if (existingTask.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        taskService.save(task);
        return new ResponseEntity<>(existingTask.get(), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask (@PathVariable Long id) {
        Optional<Task> task = taskService.findById(id);
        if (task.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        taskService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
