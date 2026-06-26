package com.raize.study.config;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.raize.study.entity.Lesson;
import com.raize.study.entity.Quiz;
import com.raize.study.entity.Exercise;
import com.raize.study.repository.LessonRepository;
import com.raize.study.repository.QuizRepository;
import com.raize.study.repository.ExerciseRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import java.io.InputStream;
import java.util.List;
import java.util.Optional;

@Component
public class DatabaseSeeder implements CommandLineRunner {
    private static final Logger logger = LoggerFactory.getLogger(DatabaseSeeder.class);

    @Autowired
    private LessonRepository lessonRepository;

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private ExerciseRepository exerciseRepository;

    @Autowired
    private ResourceLoader resourceLoader;

    @Autowired
    private ObjectMapper objectMapper;

    public static class LessonSeedData {
        public Integer id;
        public String title;
        public String phase;
        public String time;
        public String difficulty;
        public String theory;
        public List<QuizSeedData> quizzes;
    }

    public static class QuizSeedData {
        public String question;
        public String options;
        public Integer answer;
        public String explanation;
    }

    public static class ExerciseSeedData {
        public Integer id;
        public Integer lessonId;
        public String title;
        public String fileName;
        public String instructions;
        public String starterCode;
        public String validateStr;
    }

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        logger.info("🔌 Seeding/Syncing database from JSON resources...");

        boolean hasLessons = lessonRepository.count() > 0;
        if (!hasLessons) {
            // 1. Load lessons & quizzes
            try {
                Resource resource = resourceLoader.getResource("classpath:data/lessons.json");
                InputStream is = resource.getInputStream();
                List<LessonSeedData> seedLessons = objectMapper.readValue(is, new TypeReference<List<LessonSeedData>>() {});

                for (LessonSeedData seed : seedLessons) {
                    Lesson lesson = Lesson.builder()
                            .id(seed.id)
                            .title(seed.title)
                            .phase(seed.phase)
                            .time(seed.time)
                            .difficulty(seed.difficulty)
                            .theory(seed.theory)
                            .build();
                    lessonRepository.save(lesson);

                    if (seed.quizzes != null) {
                        for (QuizSeedData quizSeed : seed.quizzes) {
                            Quiz quiz = Quiz.builder()
                                    .lesson(lesson)
                                    .question(quizSeed.question)
                                    .options(quizSeed.options)
                                    .answer(quizSeed.answer)
                                    .explanation(quizSeed.explanation)
                                    .build();
                            quizRepository.save(quiz);
                        }
                    }
                }
                logger.info("✅ Seeded {} lessons and their quizzes successfully.", seedLessons.size());
            } catch (Exception e) {
                logger.error("❌ Error seeding lessons/quizzes: {}", e.getMessage(), e);
                throw e;
            }
        } else {
            logger.info("Database already seeded with lessons. Skipping lesson/quiz seeding.");
        }

        // 2. Load and Sync exercises
        try {
            Resource resource = resourceLoader.getResource("classpath:data/exercises.json");
            InputStream is = resource.getInputStream();
            List<ExerciseSeedData> seedExercises = objectMapper.readValue(is, new TypeReference<List<ExerciseSeedData>>() {});

            for (ExerciseSeedData seed : seedExercises) {
                Optional<Lesson> lessonOpt = lessonRepository.findById(seed.lessonId);
                if (lessonOpt.isPresent()) {
                    Optional<Exercise> exerciseOpt = exerciseRepository.findById(seed.id);
                    Exercise exercise;
                    if (exerciseOpt.isPresent()) {
                        exercise = exerciseOpt.get();
                        exercise.setTitle(seed.title);
                        exercise.setFileName(seed.fileName);
                        exercise.setInstructions(seed.instructions);
                        exercise.setStarterCode(seed.starterCode);
                        exercise.setValidateStr(seed.validateStr);
                    } else {
                        exercise = Exercise.builder()
                                .id(seed.id)
                                .lesson(lessonOpt.get())
                                .title(seed.title)
                                .fileName(seed.fileName)
                                .instructions(seed.instructions)
                                .starterCode(seed.starterCode)
                                .validateStr(seed.validateStr)
                                .build();
                    }
                    exerciseRepository.save(exercise);
                } else {
                    logger.warn("⚠️ Lesson ID {} not found for Exercise ID {}. Skipping exercise.", seed.lessonId, seed.id);
                }
            }
            logger.info("✅ Seeded/Synced {} exercises successfully.", seedExercises.size());
        } catch (Exception e) {
            logger.error("❌ Error seeding/syncing exercises: {}", e.getMessage(), e);
            throw e;
        }
        
        logger.info("🎉 Database seeding/syncing complete!");
    }
}
