package com.group1.forum.entities;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "threads")
public class ThreadEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "creator_id", nullable = false)
    private UserEntity creatorUserId;

    @ManyToOne
    @JoinColumn(name = "topicId", nullable = false)
    private UserEntity topicId;

    private String title;
    private String text;
    private Date creationDate;

    @ManyToMany(mappedBy = "blockedThreads")
    Set<UserEntity> bannedUsers;

    private boolean blockedThreadStatus;

    @ManyToMany(mappedBy = "threadModerators")
    Set<UserEntity> moderators;

    public ThreadEntity() {
    }
}
