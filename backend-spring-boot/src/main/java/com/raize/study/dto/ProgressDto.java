package com.raize.study.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProgressDto {
    private List<Integer> completedLessons;
    private List<Integer> completedExercises;
    private Map<Integer, String> userCodes;
    private Integer currentLessonId;
    private Integer currentExerciseId;
}
