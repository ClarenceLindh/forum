package com.group1.forum.entities;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToMany(mappedBy = "creatorUserId")
    private Set<Thread> threads;

    @ManyToMany
    @JoinTable(
            name = "threadbans_user",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "thread_id"))
    Set<Thread> blockedThreads;
}
