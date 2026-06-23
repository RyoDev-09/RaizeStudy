package com.raize.study.repository;

import com.raize.study.entity.UserLessonProgress;
import com.raize.study.entity.UserLessonProgressId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface UserLessonProgressRepository extends JpaRepository<UserLessonProgress, UserLessonProgressId> {
    List<UserLessonProgress> findByUserId(Integer userId);
}
