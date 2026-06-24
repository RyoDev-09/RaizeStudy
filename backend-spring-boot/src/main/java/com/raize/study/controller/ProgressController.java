package com.raize.study.controller;

import com.raize.study.dto.ProgressDto;
import com.raize.study.security.CustomUserDetails;
import com.raize.study.service.ProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/progress")
public class ProgressController {

    @Autowired
    private ProgressService progressService;

    // Request bodies
    public record CompleteLessonRequest(Integer lessonId, Boolean completed) {}
    public record CompleteExerciseRequest(Integer exerciseId, Boolean completed) {}
    public record SaveCodeRequest(Integer exerciseId, String code) {}
    public record SaveLastLessonRequest(Integer lessonId, Integer exerciseId) {}
    public record SaveQuizProgressRequest(Integer lessonId, Boolean completed, String stateJson) {}

    @GetMapping
    public ResponseEntity<?> getProgress(@AuthenticationPrincipal CustomUserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Chưa xác thực!"));
        }
        try {
            ProgressDto progress = progressService.getProgress(userDetails.getId());
            return ResponseEntity.ok(progress);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Không thể tải tiến độ học tập!"));
        }
    }

    @PostMapping("/complete")
    public ResponseEntity<?> completeLesson(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @RequestBody CompleteLessonRequest request) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Chưa xác thực!"));
        }
        if (request.lessonId() == null || request.completed() == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Thiếu tham số!"));
        }
        try {
            progressService.completeLesson(userDetails.getId(), request.lessonId(), request.completed());
            return ResponseEntity.ok(Map.of("success", true, "message", "Đã cập nhật trạng thái lý thuyết!"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Lỗi đồng bộ tiến độ lý thuyết!"));
        }
    }

    @PostMapping("/exercise/complete")
    public ResponseEntity<?> completeExercise(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @RequestBody CompleteExerciseRequest request) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Chưa xác thực!"));
        }
        if (request.exerciseId() == null || request.completed() == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Thiếu tham số!"));
        }
        try {
            progressService.completeExercise(userDetails.getId(), request.exerciseId(), request.completed());
            return ResponseEntity.ok(Map.of("success", true, "message", "Đã cập nhật hoàn thành bài tập!"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Lỗi đồng bộ tiến độ bài tập!"));
        }
    }

    @PostMapping("/exercise/code")
    public ResponseEntity<?> saveExerciseCode(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @RequestBody SaveCodeRequest request) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Chưa xác thực!"));
        }
        if (request.exerciseId() == null || request.code() == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Thiếu tham số!"));
        }
        try {
            progressService.saveExerciseCode(userDetails.getId(), request.exerciseId(), request.code());
            return ResponseEntity.ok(Map.of("success", true, "message", "Đã lưu code bài tập thành công!"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Lỗi lưu trữ mã nguồn!"));
        }
    }

    @PostMapping("/last-lesson")
    public ResponseEntity<?> saveLastLesson(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @RequestBody SaveLastLessonRequest request) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Chưa xác thực!"));
        }
        if (request.lessonId() == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Thiếu tham số!"));
        }
        try {
            progressService.saveLastLesson(userDetails.getId(), request.lessonId(), request.exerciseId());
            return ResponseEntity.ok(Map.of("success", true, "message", "Đã ghi nhận bài học/bài tập đang xem!"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Lỗi ghi nhận trạng thái!"));
        }
    }

    @PostMapping("/quiz")
    public ResponseEntity<?> saveQuizProgress(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @RequestBody SaveQuizProgressRequest request) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Chưa xác thực!"));
        }
        if (request.lessonId() == null || request.completed() == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Thiếu tham số!"));
        }
        try {
            progressService.saveQuizProgress(userDetails.getId(), request.lessonId(), request.completed(), request.stateJson());
            return ResponseEntity.ok(Map.of("success", true, "message", "Đã đồng bộ tiến độ trắc nghiệm thành công!"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Lỗi đồng bộ tiến độ trắc nghiệm!"));
        }
    }
}
