package com.raize.study.repository;

import com.raize.study.entity.UserExerciseProgress;
import com.raize.study.entity.UserExerciseProgressId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface UserExerciseProgressRepository extends JpaRepository<UserExerciseProgress, UserExerciseProgressId> {
    List<UserExerciseProgress> findByUserId(Integer userId);
}
