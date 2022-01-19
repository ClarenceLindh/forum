package com.group1.forum.Services;

import com.group1.forum.Configs.MyUserDetailsService;
import com.group1.forum.Entities.UserEntity;
import com.group1.forum.Repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private MyUserDetailsService detailsService;

    public UserEntity register(UserEntity user) {
        return detailsService.register(user);
    }

    public List<UserEntity> getAll() {return userRepo.findAll();}

}
