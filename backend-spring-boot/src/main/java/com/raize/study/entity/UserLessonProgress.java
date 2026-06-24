package com.raize.study.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_lesson_progress")
@IdClass(UserLessonProgressId.class)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserLessonProgress {

    @Id
    @Column(name = "user_id")
    private Integer userId;

    @Id
    @Column(name = "lesson_id")
    private Integer lessonId;

    @Column(nullable = false)
    private Boolean completed;

    @org.hibernate.annotations.UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}

