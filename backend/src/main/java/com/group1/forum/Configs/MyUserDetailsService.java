package com.group1.forum.Configs;

import com.group1.forum.Entities.UserEntity;
import com.group1.forum.Repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

@Service
public class MyUserDetailsService implements org.springframework.security.core.userdetails.UserDetailsService {

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    public BCryptPasswordEncoder getEncoder() { return encoder; }

    @Autowired
    private UserRepo userRepo;

    @PostConstruct
    private void createDefaultUsers(){
        if(userRepo.findByEmail("Lasse74") == null){
            register(new UserEntity("Lasse74", "abc123"));
        }
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity user = userRepo.findByEmail(username);
        if (user == null) {
            throw new UsernameNotFoundException(username);
        }
        return user; // Fix the user (cast UserEntity to userDetails
    }


    public UserEntity register(UserEntity user) {
        user.setPassword(encoder.encode(user.getPassword()));
        try {
            return userRepo.save(user);
        } catch (Exception ex){
            ex.printStackTrace();
        }
        return null;
    }



}
