package com.raize.study.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.raize.study.dto.LessonDto;
import com.raize.study.entity.Lesson;
import com.raize.study.entity.Quiz;
import com.raize.study.entity.Exercise;
import com.raize.study.repository.LessonRepository;
import com.raize.study.repository.QuizRepository;
import com.raize.study.repository.ExerciseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LessonService {

    @Autowired
    private LessonRepository lessonRepository;

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private ExerciseRepository exerciseRepository;

    @Autowired
    private ObjectMapper objectMapper;

    public List<LessonDto> getAllLessons() {
        List<Lesson> lessons = lessonRepository.findAllByOrderByIdAsc();
        List<LessonDto> lessonDtos = new ArrayList<>();

        for (Lesson lesson : lessons) {
            List<Quiz> quizzes = quizRepository.findByLessonIdOrderByIdAsc(lesson.getId());
            List<Exercise> exercises = exerciseRepository.findByLessonIdOrderByIdAsc(lesson.getId());

            List<LessonDto.QuizDto> quizDtos = quizzes.stream().map(q -> {
                List<String> opts;
                try {
                    opts = objectMapper.readValue(q.getOptions(), new TypeReference<List<String>>() {});
                } catch (Exception e) {
                    opts = Collections.emptyList();
                }

                return LessonDto.QuizDto.builder()
                        .q(q.getQuestion())
                        .options(opts)
                        .answer(q.getAnswer())
                        .explanation(q.getExplanation())
                        .build();
            }).collect(Collectors.toList());

            List<LessonDto.ExerciseDto> exerciseDtos = exercises.stream().map(e -> {
                return LessonDto.ExerciseDto.builder()
                        .id(e.getId())
                        .title(e.getTitle())
                        .instructions(e.getInstructions())
                        .fileName(e.getFileName())
                        .starterCode(e.getStarterCode())
                        .validateStr(e.getValidateStr())
                        .build();
            }).collect(Collectors.toList());

            lessonDtos.add(LessonDto.builder()
                    .id(lesson.getId())
                    .title(lesson.getTitle())
                    .phase(lesson.getPhase())
                    .time(lesson.getTime())
                    .difficulty(lesson.getDifficulty())
                    .theory(lesson.getTheory())
                    .quizzes(quizDtos)
                    .exercises(exerciseDtos)
                    .build());
        }

        return lessonDtos;
    }
}
