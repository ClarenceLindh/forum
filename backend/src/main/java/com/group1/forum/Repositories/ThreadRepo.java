package com.group1.forum.Repositories;

import com.group1.forum.Entities.ThreadEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ThreadRepo extends JpaRepository<ThreadEntity, Long> {
    List<ThreadEntity> findByCreatorId(long creatorId);
    List<ThreadEntity> findByBlockedThreadStatusFalse();

    /*void findDistinctByThreadIdAndUserId(long threadId, long userId);*/

}
