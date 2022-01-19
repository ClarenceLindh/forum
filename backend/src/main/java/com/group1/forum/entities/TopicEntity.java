package com.group1.forum.entities;

import javax.persistence.*;
import java.util.Set;


@Entity
@Table(name = "topics")
public class TopicEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "name", nullable=false)
    private String name;

    @OneToMany(mappedBy = "topicId")
    private Set<ThreadEntity> threads;
}