package com.group1.forum.Repositories;

import com.group1.forum.Entities.ThreadEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ThreadRepo extends JpaRepository<ThreadEntity, Long> {
    List<ThreadEntity> findByCreatorUserId(long creatorUserId);
}
