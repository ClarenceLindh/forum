package com.group1.forum.Entities;

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
    private TopicEntity topicId;

    private String title;
    private String text;
    private Date creationDate;
    private Date lastEdited;

    @ManyToMany(mappedBy = "blockedThreads")
    Set<UserEntity> bannedUsers;

    private boolean blockedThreadStatus;

    @ManyToMany
    @JoinTable(
            name = "thread_moderators",
            joinColumns = @JoinColumn(name = "thread_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    private Set<UserEntity> threadModerators;

    public ThreadEntity() {
    }

    public ThreadEntity(long id, UserEntity creatorUserId, TopicEntity topicId, String title, String text, Date creationDate, Date lastEdited, Set<UserEntity> bannedUsers, boolean blockedThreadStatus, Set<UserEntity> threadModerators) {
        this.id = id;
        this.creatorUserId = creatorUserId;
        this.topicId = topicId;
        this.title = title;
        this.text = text;
        this.creationDate = creationDate;
        this.lastEdited = lastEdited;
        this.bannedUsers = bannedUsers;
        this.blockedThreadStatus = blockedThreadStatus;
        this.threadModerators = threadModerators;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public UserEntity getCreatorUserId() {
        return creatorUserId;
    }

    public void setCreatorUserId(UserEntity creatorUserId) {
        this.creatorUserId = creatorUserId;
    }

    public TopicEntity getTopicId() {
        return topicId;
    }

    public void setTopicId(TopicEntity topicId) {
        this.topicId = topicId;
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

    public Set<UserEntity> getBannedUsers() {
        return bannedUsers;
    }

    public void setBannedUsers(Set<UserEntity> bannedUsers) {
        this.bannedUsers = bannedUsers;
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

    @Override
    public String toString() {
        return "ThreadEntity{" +
                "id=" + id +
                ", creatorUserId=" + creatorUserId +
                ", topicId=" + topicId +
                ", title='" + title + '\'' +
                ", text='" + text + '\'' +
                ", creationDate=" + creationDate +
                ", lastEdited=" + lastEdited +
                ", bannedUsers=" + bannedUsers +
                ", blockedThreadStatus=" + blockedThreadStatus +
                ", threadModerators=" + threadModerators +
                '}';
    }

    public void addModerator(UserEntity user) {
        threadModerators.add(user);
    }
}
