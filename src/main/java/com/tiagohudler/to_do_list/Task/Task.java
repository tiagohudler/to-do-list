package com.tiagohudler.to_do_list.Task;

import java.time.LocalDateTime;

public record Task(
    int id,
    LocalDateTime dueDate,
    int status,
    String name,
    String description
) {}
