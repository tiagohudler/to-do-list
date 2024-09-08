package com.tiagohudler.to_do_list.Task;

import java.util.ArrayList;
import java.util.List;

import org.springframework.boot.context.config.ConfigData.Option;
import org.springframework.stereotype.Repository;
import org.springframework.jdbc.core.simple.JdbcClient;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Optional;

import jakarta.annotation.PostConstruct;

@Repository
public class TaskRepository {
 
    private final JdbcClient jdbcClient;

    public TaskRepository (JdbcClient jdbcClient) {
        this.jdbcClient = jdbcClient;
    }

    List<Task> getAll () {
        return jdbcClient.sql("SELECT * FROM tasks")
            .query(Task.class)
            .list()     
        ;
    }

    

    /* 

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
    */ 

    
}