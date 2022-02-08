package com.group1.forum.Entities;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "comments")
public class CommentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "creator_id", nullable = false)
    private UserEntity creatorUserId;

    @ManyToOne
    @JoinColumn(name = "threadId", nullable = false)
    private ThreadEntity threadId;

    private String text;
    private Date creationDate;
    private Date lastEdited;

    public CommentEntity() {
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

    public ThreadEntity getThreadId() {
        return threadId;
    }

    public void setThreadId(ThreadEntity threadId) {
        this.threadId = threadId;
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

    @Override
    public String toString() {
        return "CommentEntity{" +
                "id=" + id +
                ", creatorUserId=" + creatorUserId +
                ", threadId=" + threadId +
                ", text='" + text + '\'' +
                ", creationDate=" + creationDate +
                ", lastEdited=" + lastEdited +
                '}';
    }
}
