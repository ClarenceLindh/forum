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

    public ThreadEntity(long id, UserEntity creatorUserId, UserEntity topicId, String title, String text, Date creationDate, Set<UserEntity> bannedUsers, boolean blockedThreadStatus, Set<UserEntity> moderators) {
        this.id = id;
        this.creatorUserId = creatorUserId;
        this.topicId = topicId;
        this.title = title;
        this.text = text;
        this.creationDate = creationDate;
        this.bannedUsers = bannedUsers;
        this.blockedThreadStatus = blockedThreadStatus;
        this.moderators = moderators;
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

    public UserEntity getTopicId() {
        return topicId;
    }

    public void setTopicId(UserEntity topicId) {
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

    public Set<UserEntity> getModerators() {
        return moderators;
    }

    public void setModerators(Set<UserEntity> moderators) {
        this.moderators = moderators;
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
                ", bannedUsers=" + bannedUsers +
                ", blockedThreadStatus=" + blockedThreadStatus +
                ", moderators=" + moderators +
                '}';
    }
}
