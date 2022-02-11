package com.group1.forum.Repositories;

import com.group1.forum.Entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepo extends JpaRepository<UserEntity, Long> {
    UserEntity findByEmail(String email);
    UserEntity findByUsername(String username);
    List<UserEntity> findByBannedUserTrue();
    // UserEntity findByUsernameLike(String username);
    // UserEntity findIdByUsername(String username);



    @Query(value = "SELECT * FROM users WHERE username = ?1", nativeQuery = true)
    List<UserEntity> findIdByUsername(String username);


}
