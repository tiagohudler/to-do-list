package com.tiagohudler.to_do_list.Task;

import java.util.ArrayList;
import java.util.List;

import org.springframework.boot.context.config.ConfigData.Option;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Optional;

import jakarta.annotation.PostConstruct;

@Repository
public class TaskRepository {

    private List<Task> tasks = new ArrayList <> ();

    void addTask (Task task) {
        tasks.add(task);
    }

    List<Task> getAll () {
        return tasks;
    }

    Optional<Task> getById (int id) {
        return tasks.stream().filter(task -> task.id() == id).findFirst();
    }

    void update (Task task, int id) {
        Optional<Task> existingTask = getById(id);
        if (existingTask.isPresent()) {
            tasks.set(tasks.indexOf(existingTask.get()), task);
        }
        else {
            throw new RuntimeException("Task not found");
        }
    }

    void delete (int id) {
        Optional<Task> existingTask = getById(id);
        if (existingTask.isPresent()) {
            tasks.remove(existingTask.get());
        }
        else {
            throw new RuntimeException("Task not found");
        }
    }

    @PostConstruct
    private void init (){
        tasks.add(new Task(1, LocalDateTime.now(), 1, "Estudar", "Estudar Spring Boot"));
        tasks.add(new Task(2, LocalDateTime.now().plus(40, ChronoUnit.DAYS), 1, "Estudar", "Estudar Spring Boot"));
    }
}
