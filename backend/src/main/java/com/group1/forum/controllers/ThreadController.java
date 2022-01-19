package com.group1.forum.controllers;

import com.group1.forum.services.ThreadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ThreadController {

    @Autowired
    private ThreadService threadService;

    @GetMapping("/rest/threads/all-threads")
    public List<Thread> getAllThreads() { return threadService.getAllThreads(); }
}
