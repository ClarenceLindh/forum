package com.group1.forum.Services;

import com.group1.forum.Configs.MyUserDetailsService;
import com.group1.forum.Entities.UserEntity;
import com.group1.forum.Repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private MyUserDetailsService myUserDetailsService;

    // bean from your SecurityConfig
    @Resource(name="authenticationManager")
    private AuthenticationManager authManager;

    public UserEntity findCurrentUser() {
        // the login session is stored between page reloads,
        // and we can access the current authenticated user with this
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepo.findByUsername(username);
    }

    public UserEntity register(UserEntity user) {
        System.out.println("Register user" + user);
        System.out.println(user);
        return myUserDetailsService.addUser(user);
    }

    public UserEntity whoAmI() {
        // SecurityContextHolder.getContext() taps into the current session
        // getAuthentication() returns the current logged in user
        // getName() returns the logged in username (email in this case)
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepo.findByUsername(username);
    }

    public List<UserEntity> getAll() {return userRepo.findAll();}



    public List<UserEntity> getIdByUsername(String username) {
        System.out.println(userRepo.findIdByUsername(username));
        return userRepo.findIdByUsername(username);
    }


}
