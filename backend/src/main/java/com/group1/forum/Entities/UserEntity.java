package com.group1.forum.Entities;

import lombok.Data;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;

@Entity
@Data
@Table(name = "users")
public class UserEntity {

//Add Authority to UserEntity and cast entity to userDetails


    public UserEntity() { }

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


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "username")
    private String username;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "role")
    private String role;



}