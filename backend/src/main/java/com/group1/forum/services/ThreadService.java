package com.group1.forum.Services;

import com.group1.forum.Entities.ThreadEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ThreadService {

    @Autowired
    private com.group1.forum.Repositories.ThreadRepo threadRepo;

    public List<ThreadEntity> getAllThreads() {
        List<ThreadEntity> threads = threadRepo.findAll();

        return threads;

        // should be something like: return threadRepository.getALlThreads();
    }

    public Optional<ThreadEntity> getThreadById(long id) {
        return threadRepo.findById(id); // should be something like: return threadRepository.getThreadById(Id);
    }

}
