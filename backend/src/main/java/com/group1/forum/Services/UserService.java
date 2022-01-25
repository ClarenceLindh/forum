package com.group1.forum.Services;

import com.group1.forum.Configs.MyUserDetailsService;
import com.group1.forum.Entities.UserEntity;
import com.group1.forum.Repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

import static org.springframework.security.web.context.HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY;

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

    public UserEntity login(UserEntity user, HttpServletRequest req) {
        System.out.println("CustomLogin started");
        try {
            // Let Spring Security handle authentication of credentials
            UsernamePasswordAuthenticationToken authReq
                    = new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword());
            Authentication auth = authManager.authenticate(authReq);
            // Add logged in user to sessions
            SecurityContext sc = SecurityContextHolder.getContext();
            sc.setAuthentication(auth);
            // Set cookie to remember logged in user
            HttpSession session = req.getSession(true);
            session.setAttribute(SPRING_SECURITY_CONTEXT_KEY, sc);
        } catch(BadCredentialsException err) {
            // throw error on bad credentials
            throw new BadCredentialsException("Bad Credentials");
        }
        return findCurrentUser();
    }

    public UserEntity register(UserEntity user) {
        System.out.println("Register User" + user);
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

}
