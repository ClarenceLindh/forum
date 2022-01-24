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

    @JsonIgnore
    @ManyToMany(mappedBy = "threadModerators")
    private Set<ThreadEntity> threadModerators;

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

    public UserEntity(long id, String username, String email, String password, String role, Set<ThreadEntity> threads, Set<ThreadEntity> blockedThreads, Set<ThreadEntity> threadModerators) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
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

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

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
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", role='" + role + '\'' +
                ", threads=" + threads +
                ", blockedThreads=" + blockedThreads +
                ", threadModerators=" + threadModerators +
                '}';
    }
}


