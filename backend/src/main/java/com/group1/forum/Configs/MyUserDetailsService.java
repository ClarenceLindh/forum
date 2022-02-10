package com.group1.forum.Configs;

import com.group1.forum.Entities.UserEntity;
import com.group1.forum.Repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

@Configuration
public class MyUserDetailsService implements org.springframework.security.core.userdetails.UserDetailsService {

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    public BCryptPasswordEncoder getEncoder() { return encoder; }

    @Autowired
    private UserRepo userRepo;

    @PostConstruct
    private void createDefaultUsers(){
        if(userRepo.findByUsername("Lasse74") == null){
            addUser(new UserEntity("Lasse74@mail.se", "Lasse74", "abc123", true));
            addUser(new UserEntity("abc", "abc", "123", false));

        }
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("loadUserByUsername: " + username);
        UserEntity user = userRepo.findByUsername(username);
        if (user == null) {
            System.out.println("User == null");
            throw new UsernameNotFoundException(username);
        }
        System.out.println("Returned: " + username);
        return toUserDetails(user); // Fix the user (cast UserEntity to userDetails
    }


    public UserEntity addUser(UserEntity user) {
        user.setPassword(encoder.encode(user.getPassword()));
        try {
            return userRepo.save(user);
        } catch (Exception ex){
            ex.printStackTrace();
        }
        return null;
    }

    private UserDetails toUserDetails(UserEntity user) {
        System.out.println("toUserDetails");
        // If you have a User entity you have to
        // use the userdetails User for this to work
        return org.springframework.security.core.userdetails.User
                .withUsername(user.getUsername())
                .password(user.getPassword())
                .roles("USER").build();
    }
}
