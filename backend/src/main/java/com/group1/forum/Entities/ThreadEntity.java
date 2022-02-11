package com.group1.forum.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
    private UserEntity creator;

    @ManyToOne
    @JoinColumn(name = "topic_id", nullable = false)
    private TopicEntity topic;

    private String title;
    private String text;
    private Date creationDate;
    private Date lastEdited;
    private boolean blockedThreadStatus;

    @ManyToMany
    @JoinTable(
            name = "thread_bans",
            joinColumns = @JoinColumn(name = "thread_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<UserEntity> threadBans;

    @ManyToMany
    @JoinTable(
            name = "thread_moderators",
            joinColumns = @JoinColumn(name = "thread_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<UserEntity> threadModerators;

    @OneToMany(mappedBy = "thread")
    private Set<CommentEntity> comments;

    public ThreadEntity() {
    }

    public ThreadEntity(long id, UserEntity creator, TopicEntity topic, String title, String text, Date creationDate, Date lastEdited, boolean blockedThreadStatus, Set<UserEntity> threadBans, Set<UserEntity> threadModerators, Set<CommentEntity> comments) {
        this.id = id;
        this.creator = creator;
        this.topic = topic;
        this.title = title;
        this.text = text;
        this.creationDate = creationDate;
        this.lastEdited = lastEdited;
        this.blockedThreadStatus = blockedThreadStatus;
        this.threadBans = threadBans;
        this.threadModerators = threadModerators;
        this.comments = comments;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public UserEntity getCreator() {
        return creator;
    }

    public void setCreator(UserEntity creator) {
        this.creator = creator;
    }

    public TopicEntity getTopic() {
        return topic;
    }

    public void setTopic(TopicEntity topic) {
        this.topic = topic;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public Date getLastEdited() {
        return lastEdited;
    }

    public void setLastEdited(Date lastEdited) {
        this.lastEdited = lastEdited;
    }

    public Set<UserEntity> getThreadBans() {
        return threadBans;
    }

    public void setThreadBans(Set<UserEntity> threadBans) {
        this.threadBans = threadBans;
    }

    public boolean isBlockedThreadStatus() {
        return blockedThreadStatus;
    }

    public void setBlockedThreadStatus(boolean blockedThreadStatus) {
        this.blockedThreadStatus = blockedThreadStatus;
    }

    public Set<UserEntity> getThreadModerators() {
        return threadModerators;
    }

    public void setThreadModerators(Set<UserEntity> threadModerators) {
        this.threadModerators = threadModerators;
    }

    @JsonIgnore
    public Set<CommentEntity> getComments() {
        return comments;
    }

    public void setComments(Set<CommentEntity> comments) {
        this.comments = comments;
    }

    @Override
    public String toString() {
        return "ThreadEntity{" +
                "id=" + id +
                ", creator=" + creator +
                ", topic=" + topic +
                ", title='" + title + '\'' +
                ", text='" + text + '\'' +
                ", creationDate=" + creationDate +
                ", lastEdited=" + lastEdited +
                ", blockedThreadStatus=" + blockedThreadStatus +
                ", threadBans=" + threadBans +
                ", threadModerators=" + threadModerators +
                ", comments=" + comments +
                '}';
    }

    public void addModerator(UserEntity user) {
        threadModerators.add(user);
    }

    public void removeModerator(UserEntity user) {
        threadModerators.remove(user);
    }

    public void banUser(UserEntity user) {
        threadBans.add(user);
    }

    public void unbanUser(UserEntity user) {
        threadBans.remove(user);
    }
}

