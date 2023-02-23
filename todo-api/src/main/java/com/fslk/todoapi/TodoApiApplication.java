package com.fslk.todoapi;

import com.fslk.todoapi.entities.Todo;
import com.fslk.todoapi.repositories.TodoRepository;
import net.bytebuddy.utility.RandomString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Random;

@SpringBootApplication
public class TodoApiApplication implements CommandLineRunner {
    @Autowired
    private TodoRepository todoRepository;

    public static void main(String[] args) {
        SpringApplication.run(TodoApiApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {

        /*todoRepository.save(new Todo(null, "list Todos", "INPROGRESS", "Developpement de la lite des todos"));
        todoRepository.save(new Todo(null, "todo", "FINISH", "Developpement de la page d'un seul todo"));
        todoRepository.save(new Todo(null, "new Todos", "TODO", "Developpement de la page de création d'un nouveau todo"));
        todoRepository.save(new Todo(null, "tests", "TODO", "faire des tests sur l'application"));
        */
    }



}
