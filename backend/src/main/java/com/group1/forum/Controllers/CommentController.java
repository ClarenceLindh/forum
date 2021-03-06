package com.group1.forum.Controllers;

import com.group1.forum.Entities.CommentEntity;
import com.group1.forum.Services.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class CommentController {
    @Autowired
    private CommentService commentService;

    @PostMapping("/rest/thread/comment")
    public CommentEntity createComment(@RequestBody CommentEntity comment) {
        return commentService.createComment(comment);
    }

    @GetMapping("/rest/threads/all-comments")
    public List<CommentEntity> getAllComments() {
        return commentService.getAllComments();
    }

    @GetMapping("/rest/thread/comments/{threadId}")
    public List<CommentEntity> getCommentsOnThreadId(@PathVariable long threadId) {
        return commentService.getCommentsOnThreadId(threadId);
    }


    @DeleteMapping("rest/comment/{commentId}")
    public void deleteCommentById(@PathVariable long commentId) {
        commentService.deleteCommentById(commentId);
    }

}
