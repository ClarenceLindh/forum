package com.group1.forum.Controllers;

import com.group1.forum.Entities.CommentEntity;
import com.group1.forum.services.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public class CommentController {
    @Autowired
    private CommentService commentService;

    @PostMapping("/rest/thread/comment")
    public CommentEntity createComment(@RequestBody CommentEntity comment) {
        return commentService.createComment(comment);
    }

    @GetMapping("rest/thread/all-comments")
    public List<CommentEntity> getAllComments() {return commentService.getAllComments();}
}
