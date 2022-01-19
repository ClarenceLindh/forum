package com.group1.forum.Controllers;


import com.group1.forum.Configs.MyUserDetailsService;
import com.group1.forum.Entities.UserEntity;
import com.group1.forum.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private MyUserDetailsService userDetailsService;

    @PostMapping("/auth/register")
    public UserEntity register(@RequestBody UserEntity user) {
        return userService.register(user);
    }

    @GetMapping("/auth/users")
    public List<UserEntity> getAllUsers(){return userService.getAll();}
}





