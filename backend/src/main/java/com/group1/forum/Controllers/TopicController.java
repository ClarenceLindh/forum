package com.group1.forum.Controllers;

import com.group1.forum.Entities.ThreadEntity;
import com.group1.forum.Entities.TopicEntity;
import com.group1.forum.Services.ThreadService;
import com.group1.forum.Services.TopicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TopicController {

    @Autowired
    private TopicService topicService;


    // GET ALL TOPICS
    @GetMapping("/rest/topics/all-topics")
    public List<TopicEntity> getAllTopics() {
        return topicService.getAllTopics();
    }

}
