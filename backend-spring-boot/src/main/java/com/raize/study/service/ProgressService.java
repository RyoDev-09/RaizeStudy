package com.raize.study.service;

import com.raize.study.dto.ProgressDto;
import com.raize.study.entity.*;
import com.raize.study.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProgressService {

    @Autowired
    private UserLessonProgressRepository lessonProgressRepository;

    @Autowired
    private UserExerciseProgressRepository exerciseProgressRepository;

    @Autowired
    private UserSettingRepository userSettingRepository;

    @Autowired
    private UserQuizProgressRepository quizProgressRepository;

    public ProgressDto getProgress(Integer userId) {
        // 1. Lấy bài học & bài tập xem cuối cùng từ user_settings
        Optional<UserSetting> settingsOpt = userSettingRepository.findById(userId);
        Integer currentLessonId = 1;
        Integer currentExerciseId = null;
        if (settingsOpt.isPresent()) {
            currentLessonId = settingsOpt.get().getLastLessonId();
            currentExerciseId = settingsOpt.get().getLastExerciseId();
        }

        // 2. Lấy danh sách bài học đã hoàn thành
        List<UserLessonProgress> lessonProgressList = lessonProgressRepository.findByUserId(userId);
        List<Integer> completedLessons = lessonProgressList.stream()
                .filter(UserLessonProgress::getCompleted)
                .map(UserLessonProgress::getLessonId)
                .collect(Collectors.toList());

        // 3. Lấy tiến độ làm bài tập thực hành
        List<UserExerciseProgress> exerciseProgressList = exerciseProgressRepository.findByUserId(userId);
        List<Integer> completedExercises = exerciseProgressList.stream()
                .filter(UserExerciseProgress::getCompleted)
                .map(UserExerciseProgress::getExerciseId)
                .collect(Collectors.toList());

        Map<Integer, String> userCodes = new HashMap<>();
        for (UserExerciseProgress progress : exerciseProgressList) {
            if (progress.getSavedCode() != null) {
                userCodes.put(progress.getExerciseId(), progress.getSavedCode());
            }
        }

        // 4. Lấy tiến độ làm bài trắc nghiệm
        List<UserQuizProgress> quizProgressList = quizProgressRepository.findByUserId(userId);
        List<Integer> completedQuizzes = quizProgressList.stream()
                .filter(UserQuizProgress::getCompleted)
                .map(UserQuizProgress::getLessonId)
                .collect(Collectors.toList());

        Map<Integer, String> quizStates = new HashMap<>();
        for (UserQuizProgress progress : quizProgressList) {
            if (progress.getStateJson() != null) {
                quizStates.put(progress.getLessonId(), progress.getStateJson());
            }
        }

        return ProgressDto.builder()
                .completedLessons(completedLessons)
                .completedExercises(completedExercises)
                .userCodes(userCodes)
                .currentLessonId(currentLessonId)
                .currentExerciseId(currentExerciseId)
                .completedQuizzes(completedQuizzes)
                .quizStates(quizStates)
                .build();
    }

    @Transactional
    public void completeLesson(Integer userId, Integer lessonId, Boolean completed) {
        UserLessonProgressId id = new UserLessonProgressId(userId, lessonId);
        UserLessonProgress progress = lessonProgressRepository.findById(id)
                .orElse(UserLessonProgress.builder()
                        .userId(userId)
                        .lessonId(lessonId)
                        .build());
        
        progress.setCompleted(completed);
        lessonProgressRepository.save(progress);
    }

    @Transactional
    public void completeExercise(Integer userId, Integer exerciseId, Boolean completed) {
        UserExerciseProgressId id = new UserExerciseProgressId(userId, exerciseId);
        UserExerciseProgress progress = exerciseProgressRepository.findById(id)
                .orElse(UserExerciseProgress.builder()
                        .userId(userId)
                        .exerciseId(exerciseId)
                        .build());

        progress.setCompleted(completed);
        exerciseProgressRepository.save(progress);
    }

    @Transactional
    public void saveExerciseCode(Integer userId, Integer exerciseId, String code) {
        UserExerciseProgressId id = new UserExerciseProgressId(userId, exerciseId);
        UserExerciseProgress progress = exerciseProgressRepository.findById(id)
                .orElse(UserExerciseProgress.builder()
                        .userId(userId)
                        .exerciseId(exerciseId)
                        .completed(false)
                        .build());

        progress.setSavedCode(code);
        exerciseProgressRepository.save(progress);
    }

    @Transactional
    public void saveLastLesson(Integer userId, Integer lessonId, Integer exerciseId) {
        UserSetting settings = userSettingRepository.findById(userId)
                .orElse(UserSetting.builder()
                        .userId(userId)
                        .build());

        settings.setLastLessonId(lessonId);
        settings.setLastExerciseId(exerciseId);
        userSettingRepository.save(settings);
    }

    @Transactional
    public void saveQuizProgress(Integer userId, Integer lessonId, Boolean completed, String stateJson) {
        UserQuizProgressId id = new UserQuizProgressId(userId, lessonId);
        UserQuizProgress progress = quizProgressRepository.findById(id)
                .orElse(UserQuizProgress.builder()
                        .userId(userId)
                        .lessonId(lessonId)
                        .build());

        progress.setCompleted(completed);
        if (stateJson != null) {
            progress.setStateJson(stateJson);
        }
        quizProgressRepository.save(progress);
    }
}
