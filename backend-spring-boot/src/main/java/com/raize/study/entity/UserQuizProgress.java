package com.raize.study.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_quiz_progress")
@IdClass(UserQuizProgressId.class)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserQuizProgress {

    @Id
    @Column(name = "user_id")
    private Integer userId;

    @Id
    @Column(name = "lesson_id")
    private Integer lessonId;

    @Column(nullable = false)
    private Boolean completed;

    @Column(name = "state_json", columnDefinition = "TEXT")
    private String stateJson;

    @Column(name = "updated_at", insertable = false, updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
    private LocalDateTime updatedAt;
}
