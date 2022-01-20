package com.group1.forum.Controllers;

import com.group1.forum.Entities.ThreadEntity;
import com.group1.forum.Services.ThreadService;
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

    // mapping to the saving records service GH
    @PostMapping("/rest/threads")
    public ThreadEntity save(@RequestBody ThredEntity threads){
        return threadService.save(threads);
    }



    // mapping to delete a record service GH
    @DeleteMapping ("/rest/threads{id}")
    public void  deleteById(@PathVariable Long id){
       threadService.deleteById(id);
    }


    // mapping to delete a record service GH
    @PutMapping ("/rest/threads/{Id}")
    public void  updateById(@PathVariable Long id, @RequestBody ThredEntity threads){
        threadService.updateById(id, threads);
    }



}


