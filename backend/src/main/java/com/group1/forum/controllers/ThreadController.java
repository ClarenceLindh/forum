package com.group1.forum.controllers;

import com.group1.forum.entities.ThreadEntity;
import com.group1.forum.services.ThreadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
public class ThreadController {

    @Autowired
    private ThreadService threadService;


    // GET ALL THREADS
    @GetMapping("/rest/threads/all-threads")
    public List<ThreadEntity> getAllThreads() { return threadService.getAllThreads(); }

    // GET BY THREAD BY ID
    @GetMapping("/rest/threads/{Id}")
    public Optional<ThreadEntity> getThreadById(@PathVariable Long id) { return threadService.getThreadById(id); }
}


