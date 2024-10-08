package com.tiagohudler.to_do_list.repository;

import com.tiagohudler.to_do_list.Task.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
}
