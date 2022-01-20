package com.group1.forum.Services;

import com.group1.forum.Entities.ThreadEntity;
import com.group1.forum.Entities.TopicEntity;
import com.group1.forum.Repositories.ThreadRepo;
import com.group1.forum.Repositories.TopicRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TopicService {

    @Autowired
    private TopicRepo topicRepo;

    public List<TopicEntity> getAllTopics() {
        List<TopicEntity> topics = topicRepo.findAll();

        return topics;


    }
}
