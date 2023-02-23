package com.fslk.todoapi.repositories;

import com.fslk.todoapi.entities.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {
    public List<Todo> findByTitle(String title);
}
