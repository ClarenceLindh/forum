package com.group1.forum.entities;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "threads")
public class Thread {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "creator_id", nullable = false)
    private User creatorUserId;

    @ManyToOne
    @JoinColumn(name = "topicId", nullable = false)
    private User topicId;

    private String title;
    private String text;
    private Date creationDate;

    @ManyToMany(mappedBy = "blockedThreads")
    Set<User> bannedUsers;

    public Thread() {
    }
}
