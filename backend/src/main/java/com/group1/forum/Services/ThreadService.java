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
    private com.group1.forum.Services.UserService userService; // Had to import???
//     private UserService userService;

    public List<ThreadEntity> getAllThreads() {
        List<ThreadEntity> threads = threadRepo.findAll();
        return threads;

        // should be something like: return threadRepository.getALlThreads();
    }
    public List<ThreadEntity> getAllUnblockedThreads(){
        return threadRepo.findByBlockedThreadStatusFalse();
    }
    public List<ThreadEntity> getAllBlockedThreads(){
        return threadRepo.findByBlockedThreadStatusTrue();
    }

    public Optional<ThreadEntity> getThreadById(long threadId) {
        return threadRepo.findById(threadId);
    }

    public ThreadEntity createThread(ThreadEntity thread) {
        UserEntity loggedUser = userService.whoAmI();
        System.out.println("create thread started");
        if (loggedUser != null) {
            thread.setCreator(loggedUser);
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

    public ThreadEntity banUserFromThread(long threadId, long userId) {
        ThreadEntity thread = threadRepo.findById(threadId).get();
        UserEntity user = userRepo.findById(userId).get();

        thread.banUser(user);

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
                    thread.setTopic(editedThread.getTopic());
                    thread.setLastEdited(editedThread.getLastEdited());
                    thread.setBlockedThreadStatus(editedThread.isBlockedThreadStatus());
                    return threadRepo.save(thread);
                });
    }

    public void deleteThreadById(long threadId) {
        threadRepo.deleteById(threadId);
    }


    public List<ThreadEntity> getThreadsByCreatorUserId(long creatorId) {
        return threadRepo.findByCreatorId(creatorId);
    }
    public List<ThreadEntity> getAllBlockedThreadsByCreatorUsername(String creatorUsername){
        return threadRepo.findByBlockedThreadStatusTrueAndCreatorUsername(creatorUsername);
    }

    public void deleteModeratorOfThread(long threadId, long userId) {
        ThreadEntity thread = threadRepo.findById(threadId).get();
        UserEntity user = userRepo.findById(userId).get();

        thread.removeModerator(user);

        threadRepo.save(thread);
    }

    public void unbanUserFromThread(long threadId, long userId) {
        ThreadEntity thread = threadRepo.findById(threadId).get();
        UserEntity user = userRepo.findById(userId).get();

        thread.unbanUser(user);

        threadRepo.save(thread);
    }
}
