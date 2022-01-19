package com.group1.forum.services;

import com.group1.forum.entities.ThreadEntity;
import com.group1.forum.repositories.ThreadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ThreadService {

    @Autowired
    private ThreadRepository threadRepository;

    public List<ThreadEntity> getAllThreads() {
        List<ThreadEntity> threads = threadRepository.findAll();

        return threads;

        // should be something like: return threadRepository.getALlThreads();
    }

    public Optional<ThreadEntity> getThreadById(long id) {
        return threadRepository.findById(id); // should be something like: return threadRepository.getThreadById(Id);
    }

}
