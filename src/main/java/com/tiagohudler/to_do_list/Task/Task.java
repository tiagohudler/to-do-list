package com.tiagohudler.to_do_list.Task;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private Status status;
    @NotEmpty
    @Enumerated(EnumType.ORDINAL)
    private String name;
    private String description;
    @Future
    private LocalDateTime dueDate;

}
