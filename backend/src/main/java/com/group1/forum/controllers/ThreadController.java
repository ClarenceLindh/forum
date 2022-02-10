package com.group1.forum.Controllers;

import com.group1.forum.Entities.ThreadEntity;
import com.group1.forum.Services.ThreadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
public class ThreadController {

    @Autowired
    private ThreadService threadService;


    // GET ALL THREADS
    @GetMapping("/rest/threads/all-threads")
    public List<ThreadEntity> getAllThreads() {
        return threadService.getAllThreads();
    }

    @GetMapping("/rest/threads/all-unblocked-threads")
    public List<ThreadEntity> getAllUnblockedThreads() { return threadService.getAllUnblockedThreads();}
    // GET BY THREAD BY ID
    @GetMapping("/rest/thread/{threadId}")
    public Optional<ThreadEntity> getThreadById(@PathVariable long threadId) {
        return threadService.getThreadById(threadId);
    }

    @PostMapping("/rest/thread")
    public ThreadEntity createThread(@RequestBody ThreadEntity thread) {
        System.out.println("test 1");
        return threadService.createThread(thread);
    }

    @PostMapping("rest/thread/{threadId}/user/{userId}")
    public ThreadEntity addModeratorToThread(@PathVariable long threadId, @PathVariable long userId) {
        System.out.println("ThreadId: " + threadId + "userId" + userId );
        return threadService.addModeratorToThread(threadId, userId);
    }

    /*@DeleteMapping("rest/thread/{threadId}/user/{userId}")
    public void deleteModeratorToThread(@PathVariable long threadId, @PathVariable long userId) {
        System.out.println("Delete Moderator: " + threadId + "userId" + userId );
        threadService.deleteModeratorOfThread(threadId, userId);
    }*/

    @PutMapping("rest/thread/{threadId}")
    public Optional<ThreadEntity> editThread(@PathVariable long threadId, @RequestBody ThreadEntity editedThread) {
        return threadService.editThread(threadId, editedThread);
    }

    @DeleteMapping("rest/thread/{threadId}")
    public void deleteThreadById(@PathVariable long threadId) {
        threadService.deleteThreadById(threadId);
    }

    // tobe checked begin

    @GetMapping("/rest/threads/user/{creatorId}")
    public List<ThreadEntity> getThreadsByCreatorUserId(@PathVariable long creatorId) {
        return threadService.getThreadsByCreatorUserId(creatorId);
    }
// to be checked end
}
