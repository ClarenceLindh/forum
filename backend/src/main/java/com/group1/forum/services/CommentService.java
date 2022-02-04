package com.group1.forum.Services;

import com.group1.forum.Entities.CommentEntity;
import com.group1.forum.Entities.ThreadEntity;
import com.group1.forum.Entities.UserEntity;
import com.group1.forum.Repositories.CommentRepo;
import com.group1.forum.Repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {
    @Autowired
    private CommentRepo commentRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private com.group1.forum.Services.UserService userService; // Had to import???

    public CommentEntity createComment(CommentEntity comment) {
        UserEntity loggedUser = userService.whoAmI();
        if (loggedUser != null) {
            comment.setCreatorUserId(loggedUser);
            return commentRepo.save(comment);
        }
        return null;
    }

    public List<CommentEntity> getAllComments() {
        return commentRepo.findAll();
    }
}
