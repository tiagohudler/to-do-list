package com.tiagohudler.to_do_list.Task;

import java.util.ArrayList;
import java.util.List;

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

    @PostConstruct
    private void init (){
        tasks.add(new Task(1, LocalDateTime.now(), 1, "Estudar", "Estudar Spring Boot"));
        tasks.add(new Task(2, LocalDateTime.now().plus(40, ChronoUnit.DAYS), 1, "Estudar", "Estudar Spring Boot"));
    }
}
