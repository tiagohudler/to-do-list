package com.tiagohudler.to_do_list;

import java.time.LocalDateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.tiagohudler.to_do_list.Task.Task;

@SpringBootApplication
public class ToDoListApplication {

	private static final Logger log = LoggerFactory.getLogger(ToDoListApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(ToDoListApplication.class, args);
	}

	@Bean
	CommandLineRunner runner (){
		return args -> {
			Task task = new Task(0, LocalDateTime.now(), 0, "test", "lorem ipsum");
			log.info("Task = " + task); 
		};
	}
}
