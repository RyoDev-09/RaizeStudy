package com.raize.study.repository;

import com.raize.study.entity.UserQuizProgress;
import com.raize.study.entity.UserQuizProgressId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface UserQuizProgressRepository extends JpaRepository<UserQuizProgress, UserQuizProgressId> {
    List<UserQuizProgress> findByUserId(Integer userId);
}
