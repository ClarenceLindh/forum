package com.group1.forum.Controllers;


import com.group1.forum.Configs.MyUserDetailsService;
import com.group1.forum.Entities.UserEntity;
import com.group1.forum.Services.UserService;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
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

    @GetMapping("/rest/user/{username}")
    public UserEntity getIdByUsername(@PathVariable String username) {
        return (UserEntity) userService.getIdByUsername(username);
    }

    @GetMapping("/auth/whoami")
    public UserEntity whoAmI() {
        return userService.whoAmI();
    }

    @GetMapping("/auth/blockedAcc")
    public List<UserEntity> blockedAcc() {
        return userService.blockedAcc();
    }

    @GetMapping("/auth/deletedAcc")
    public List<UserEntity> deletedAcc(){
        return userService.deletedAcc();
    }



    @PutMapping("/rest/users/{id}")
    public UserEntity updateUser(@PathVariable long id, @RequestBody UserEntity user) {
        return userService.updateById(id, user);
    }

    @PutMapping("/rest/editBan/{id}")
    public UserEntity updateBan(@PathVariable long id, @RequestBody UserEntity user) {
        return userService.updateBanById(id,user);
    }

    @GetMapping("/rest/users/allBlockedUsers")
    public List<UserEntity> getAllBlockedUsers(){
        return userService.getAllBlockedUsers();
    }

    @PutMapping("/rest/editDelete/{id}")
    public UserEntity updateDelete(@PathVariable long id, @RequestBody UserEntity user){
        return userService.updateDeleteById(id,user);
    }



}









