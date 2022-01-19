package com.group1.forum.services;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ThreadService {
    public List<Thread> getAllThreads() {
        return null; // should be something like: return threadRepository.getALlThreads(byId);
    }

}
