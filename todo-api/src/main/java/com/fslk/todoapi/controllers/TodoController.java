package com.fslk.todoapi.controllers;

import com.fslk.todoapi.entities.Todo;
import com.fslk.todoapi.exceptions.ResourceNotFoundException;
import com.fslk.todoapi.repositories.TodoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping()
@RestController
public class TodoController {
    public static final Logger logger = LoggerFactory.getLogger(TodoController.class);
    @Autowired
    TodoRepository repository;

    @GetMapping("/todos")
    public List<Todo> getAllTodos() {
        System.out.println("Get all Todos...");

        List<Todo> Todos = new ArrayList<>();
        repository.findAll().forEach(Todos::add);

        return Todos;
    }
    @GetMapping("/todos/{id}")
    public ResponseEntity<Todo> getTodoById(@PathVariable(value = "id") Long todoId)
            throws ResourceNotFoundException {
        Todo todo = repository.findById(todoId)
                .orElseThrow(() -> new ResourceNotFoundException("Todo not found for this id :: " + todoId));
        return ResponseEntity.ok().body(todo);
    }
    @PostMapping("/todos")
    public ResponseEntity<Todo> createTodo(@RequestBody Todo todo) {
        try {
            Todo _todo = repository
                    .save(new Todo(null, todo.getTitle(), todo.getState(),  todo.getDescription()));
            return new ResponseEntity<>(_todo, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    /*@PutMapping(value = "/todos/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Todo> updateTodo(@PathVariable("id") long id, @RequestBody Todo tod) {
        System.out.println("Update Todo with ID = " + id + "...");
        Optional<Todo> TodoInfo = repository.findById(id);
        if (TodoInfo.isPresent()) {
            Todo todo = TodoInfo.get();
            todo.setTitle(tod.getTitle());
            todo.setState(tod.getState());
            todo.setDescription(tod.getDescription());
            return new ResponseEntity<>(repository.save(tod), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }*/
    @RequestMapping(value = "/todos/{id}", method = RequestMethod.PUT)
    public ResponseEntity<?> updateTodo(@PathVariable("id") long id, @RequestBody Todo todo) {
        logger.info("Updating Todo with id {}", id);

        Todo currentTodo = repository.findById(id).get();

        if (currentTodo == null) {
            logger.error("Unable to update. Todo with id {} not found.", id);
            return new ResponseEntity(new ResourceNotFoundException("Unable to upate. Todo with id " + id + " not found."),
                    HttpStatus.NOT_FOUND);
        }

        currentTodo.setTitle(todo.getTitle());
        currentTodo.setState(todo.getState());
        currentTodo.setDescription(todo.getDescription());

        repository.save(currentTodo);
        return new ResponseEntity<Todo>(currentTodo, HttpStatus.OK);

    }
}

