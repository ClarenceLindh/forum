package com.group1.forum.Repositories;

import com.group1.forum.Entities.ThreadEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ThreadRepo extends JpaRepository<ThreadEntity, Long> { }
