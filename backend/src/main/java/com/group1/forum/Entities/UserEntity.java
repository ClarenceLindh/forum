package com.group1.forum.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "users")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;


    //Add Authority to UserEntity and cast entity to userDetails

    @Column(name = "username")
    private String username;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "role")
    private String role;

    @OneToMany(mappedBy = "creatorUserId")
    private Set<ThreadEntity> threads;

    @ManyToMany
    @JoinTable(
            name = "threadbans_user",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "thread_id"))
    Set<ThreadEntity> blockedThreads;

    @ManyToMany
    @JoinTable(
            name = "thread_moderators",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "thread_id"))
    Set<ThreadEntity> threadModerators;

    public UserEntity() {
    }

    public UserEntity(String email) { this.email = email; }

    public UserEntity(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public String getEmail() { return email;}

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public UserEntity(long id, Set<ThreadEntity> threads, Set<ThreadEntity> blockedThreads, Set<ThreadEntity> threadModerators) {
        this.id = id;
        this.threads = threads;
        this.blockedThreads = blockedThreads;
        this.threadModerators = threadModerators;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    @JsonIgnore
    public Set<ThreadEntity> getThreads() {
        return threads;
    }

    public void setThreads(Set<ThreadEntity> threads) {
        this.threads = threads;
    }

    public Set<ThreadEntity> getBlockedThreads() {
        return blockedThreads;
    }

    public void setBlockedThreads(Set<ThreadEntity> blockedThreads) {
        this.blockedThreads = blockedThreads;
    }

    @JsonIgnore
    public Set<ThreadEntity> getThreadModerators() {
        return threadModerators;
    }

    public void setThreadModerators(Set<ThreadEntity> threadModerators) {
        this.threadModerators = threadModerators;
    }

    @Override
    public String toString() {
        return "UserEntity{" +
                "id=" + id +
                ", threads=" + threads +
                ", blockedThreads=" + blockedThreads +
                ", threadModerators=" + threadModerators +
                '}';
    }


}


