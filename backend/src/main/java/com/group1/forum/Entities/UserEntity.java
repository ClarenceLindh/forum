package com.group1.forum.Entities;

import lombok.Data;
import org.springframework.security.core.userdetails.User;

import javax.persistence.*;

@Entity
@Data
@Table(name = "users")
public class UserEntity {

//Add Authority to UserEntity and cast entity to userDetails



    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    public UserEntity(){}

    public UserEntity(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
