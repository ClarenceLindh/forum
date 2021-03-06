package com.group1.forum.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.util.Date;
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

    //@JsonIgnore
    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "role")
    private String role;

    private Date date;


    public UserEntity(long id, String username, String email, String password, String role, Boolean deleted, Set<ThreadEntity> threads, Boolean blocked, Set<ThreadEntity> threadBans, Set<ThreadEntity> threadModerators) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
        this.deleted = deleted;
        this.threads = threads;
        this.blocked = blocked;
        this.threadBans = threadBans;
        this.threadModerators = threadModerators;
    }

    @Column(name = "deleted")
    private Boolean deleted;

    @OneToMany(mappedBy = "creator")
    private Set<ThreadEntity> threads;

    @OneToMany(mappedBy = "commenter", cascade = CascadeType.ALL) // cascade gör så att om jag tar bort en användare så försvinner också den användarens kommentarer
    private Set<CommentEntity> comments;

    @Column(name="blocked")
    private Boolean blocked;

    @JsonIgnore
    @ManyToMany(mappedBy = "threadBans")
    public Set<ThreadEntity> threadBans;

    @JsonIgnore
    @ManyToMany(mappedBy = "threadModerators")
    private Set<ThreadEntity> threadModerators;

    public UserEntity() {
    }

    public UserEntity(long id) {
        this.id = id;
    }



    public UserEntity(String email) { this.email = email; }



    public UserEntity(String email, String username, String password) {
        this.email = email;
        this.username = username;
        this.password = password;
    }

    public UserEntity(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public UserEntity(long id, String username, String email, String password, String role) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    public UserEntity( String username, String email, String password, Boolean blocked) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.blocked = blocked;
    }

    public UserEntity(String username, String email, String password, String role, Boolean blocked) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
        this.blocked = blocked;
    }

    public UserEntity(long id, String username, String email, String password, String role, Set<ThreadEntity> threads, Boolean blocked, Set<ThreadEntity> threadBans, Set<ThreadEntity> threadModerators) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
        this.threads = threads;
        this.blocked = blocked;
        this.threadBans = threadBans;
        this.threadModerators = threadModerators;
    }

    public UserEntity(long id, String username, String email, String password, String role, Set<ThreadEntity> threads, Boolean blocked, Set<ThreadEntity> threadBans) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
        this.threads = threads;
        this.blocked = blocked;
        this.threadBans = threadBans;
    }

    public UserEntity(long id, String username, String email, String password, String role, Set<ThreadEntity> threads, Set<ThreadEntity> threadBans) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
        this.threads = threads;
        this.threadBans = threadBans;
    }

    public UserEntity(String email, String username, String password, boolean blocked, String role) {
        this.email = email;
        this.username = username;
        this.password = password;
        this.blocked = blocked;
        this.role = role;
    }

    public UserEntity(long id, String username, String email, String password, String role, Boolean bannedUser) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    public UserEntity(long id, String username, String email, String password, String role, Date date, Boolean deleted, Set<ThreadEntity> threads, Set<CommentEntity> comments, Boolean blocked, Set<ThreadEntity> threadBans, Set<ThreadEntity> threadModerators) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
        this.date = date;
        this.deleted = deleted;
        this.threads = threads;
        this.comments = comments;
        this.blocked = blocked;
        this.threadBans = threadBans;
        this.threadModerators = threadModerators;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Boolean getDeleted() {
        return deleted;
    }

    public void setDeleted(Boolean deleted) {
        this.deleted = deleted;
    }

    @JsonIgnore
    public String getEmail() { return email;}

    @JsonIgnore
    public String getPassword() {
        return password;
    }

    @JsonProperty
    public void setPassword(String password) {
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @JsonProperty
    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
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

    @JsonIgnore
    public Set<CommentEntity> getComments() {
        return comments;
    }

    public void setComments(Set<CommentEntity> comments) {
        this.comments = comments;
    }

    public Set<ThreadEntity> getThreadBans() {
        return threadBans;
    }

    public void setThreadBans(Set<ThreadEntity> threadBans) {
        this.threadBans = threadBans;
    }

    public Set<ThreadEntity> getThreadModerators() {
        return threadModerators;
    }

    public void setThreadModerators(Set<ThreadEntity> threadModerators) {
        this.threadModerators = threadModerators;
    }

    public Boolean getBlocked() {
        return blocked;
    }

    public void setBlocked(Boolean blocked) {
        this.blocked = blocked;
    }

    @Override
    public String toString() {
        return "UserEntity{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", role='" + role + '\'' +
                ", date=" + date +
                ", deleted=" + deleted +
                ", threads=" + threads +
                ", comments=" + comments +
                ", blocked=" + blocked +
                ", threadBans=" + threadBans +
                ", threadModerators=" + threadModerators +
                '}';
    }
}
