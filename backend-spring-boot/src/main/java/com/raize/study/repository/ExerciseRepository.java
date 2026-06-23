package com.raize.study.repository;

import com.raize.study.entity.Exercise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ExerciseRepository extends JpaRepository<Exercise, Integer> {
    List<Exercise> findByLessonIdOrderByIdAsc(Integer lessonId);
    List<Exercise> findAllByOrderByIdAsc();
}
