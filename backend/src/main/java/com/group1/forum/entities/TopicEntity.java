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

    public TopicEntity() {
    }

    public TopicEntity(long id, String name, Set<ThreadEntity> threads) {
        this.id = id;
        this.name = name;
        this.threads = threads;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<ThreadEntity> getThreads() {
        return threads;
    }

    public void setThreads(Set<ThreadEntity> threads) {
        this.threads = threads;
    }

    @Override
    public String toString() {
        return "TopicEntity{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", threads=" + threads +
                '}';
    }
}
