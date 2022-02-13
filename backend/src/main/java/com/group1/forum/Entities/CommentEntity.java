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
    @JoinColumn(name = "commenter_id", nullable = false)
    private UserEntity commenter;

    @ManyToOne
    @JoinColumn(name = "thread_id", nullable = false)
    private ThreadEntity thread;

    private String text;
    private Date creationDate;
    private Date lastEdited;

    public CommentEntity() {
    }

    public CommentEntity(long id, UserEntity commenter, ThreadEntity thread, String text, Date creationDate, Date lastEdited) {
        this.id = id;
        this.commenter = commenter;
        this.thread = thread;
        this.text = text;
        this.creationDate = creationDate;
        this.lastEdited = lastEdited;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public UserEntity getCommenter() {
        return commenter;
    }

    public void setCommenter(UserEntity commenter) {
        this.commenter = commenter;
    }

    public ThreadEntity getThread() {
        return thread;
    }

    public void setThread(ThreadEntity thread) {
        this.thread = thread;
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
                ", commenter=" + commenter +
                ", thread=" + thread +
                ", text='" + text + '\'' +
                ", creationDate=" + creationDate +
                ", lastEdited=" + lastEdited +
                '}';
    }
}
