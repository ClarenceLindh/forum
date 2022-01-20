package com.group1.forum.Services;

import com.group1.forum.Entities.ThreadEntity;
import com.group1.forum.Entities.UserEntity;
import com.group1.forum.Repositories.ThreadRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class ThreadService {

    @Autowired
    private ThreadRepo threadRepo;

    @Autowired
    private UserService userService;

    public List<ThreadEntity> getAllThreads() {
        List<ThreadEntity> threads = threadRepo.findAll();

        return threads;

        // should be something like: return threadRepository.getALlThreads();
    }

    public Optional<ThreadEntity> getThreadById(long threadId) {
        return threadRepo.findById(threadId);
    }

    public ThreadEntity createThread(ThreadEntity thread) {
        UserEntity loggedUser = userService.whoAmI();
        if (loggedUser != null) {
            thread.setCreatorUserId(loggedUser);
            thread.setBlockedThreadStatus(false);
            thread.setModerators((Set<UserEntity>) loggedUser);
            return threadRepo.save(thread);
        }
        return null;
    }

}
