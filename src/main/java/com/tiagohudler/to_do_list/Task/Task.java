package com.tiagohudler.to_do_list.Task;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotEmpty;

@Entity
public class Task {

    private int id;
    @Enumerated(EnumType.ORDINAL)
    private Status status;

}
