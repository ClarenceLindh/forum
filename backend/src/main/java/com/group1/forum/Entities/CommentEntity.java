package com.group1.forum.Entities;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "comments")
public class CommentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String text;

    @ManyToOne
    @JoinColumn(name = "creator_id", nullable = false)
    private UserEntity creatorUserId;
    private Date creationDate;
    private Date lastEdited;

    public CommentEntity() {
    }

    public CommentEntity(long id, String text, UserEntity creatorUserId, Date creationDate, Date lastEdited) {
        this.id = id;
        this.text = text;
        this.creatorUserId = creatorUserId;
        this.creationDate = creationDate;
        this.lastEdited = lastEdited;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public UserEntity getCreatorUserId() {
        return creatorUserId;
    }

    public void setCreatorUserId(UserEntity creatorUserId) {
        this.creatorUserId = creatorUserId;
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
                ", text='" + text + '\'' +
                ", creatorUserId=" + creatorUserId +
                ", creationDate=" + creationDate +
                ", lastEdited=" + lastEdited +
                '}';
    }
}
