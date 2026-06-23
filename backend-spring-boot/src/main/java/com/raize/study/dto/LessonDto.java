package com.raize.study.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LessonDto {
    private Integer id;
    private String title;
    private String phase;
    private String time;
    private String difficulty;
    private String theory;
    private List<QuizDto> quizzes;
    private List<ExerciseDto> exercises;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class QuizDto {
        private String q;
        private List<String> options;
        private Integer answer;
        private String explanation;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ExerciseDto {
        private Integer id;
        private String title;
        private String instructions;
        private String fileName;
        private String starterCode;
        private String validateStr;
    }
}
