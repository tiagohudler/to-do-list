package com.tiagohudler.to_do_list.Task;

import java.time.LocalDateTime;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotEmpty;

public record Task(
    int id,
    @Future
    LocalDateTime dueDate,
    int status,
    @NotEmpty
    String name,
    String description
) {}
