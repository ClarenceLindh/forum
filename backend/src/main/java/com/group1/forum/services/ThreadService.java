package com.group1.forum.Services;

import com.group1.forum.Entities.ThreadEntity;
import com.group1.forum.Entities.UserEntity;
import com.group1.forum.Repositories.ThreadRepo;
import com.group1.forum.Repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ThreadService {

    @Autowired
    private ThreadRepo threadRepo;

    @Autowired
    private UserRepo userRepo;

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
        System.out.println("create thread started");
        if (loggedUser != null) {
            System.out.println("logged in backend");
            thread.setCreatorUserId(loggedUser);
            thread.setBlockedThreadStatus(false);
            return threadRepo.save(thread);
        }
        return null;
    }

    public ThreadEntity addModeratorToThread(long threadId, long userId) {
        ThreadEntity thread = threadRepo.findById(threadId).get();
        UserEntity user = userRepo.findById(userId).get();

            thread.addModerator(user);

            return threadRepo.save(thread);

    }

    public Optional<ThreadEntity> editThread(long threadId, ThreadEntity editedThread) {
        /*
        JSON-example
                {
                    "topicId": {
                        "id": 2
                    },
                "title": "Mattråd",
                "text": "Detta är nu en Mattråd"
                "lastEdited": "2022-01-20T13:56:38.000+00:00"
                }
         */
        return threadRepo.findById(threadId)
                .map(thread -> {
                    thread.setTitle(editedThread.getTitle());
                    thread.setText(editedThread.getText());
                    thread.setTopicId(editedThread.getTopicId());
                    thread.setLastEdited(editedThread.getLastEdited());
                    return threadRepo.save(thread);
                });
    }

    public void deleteThreadById(long threadId) {
        threadRepo.deleteById(threadId);
    }
}
