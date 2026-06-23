package com.raize.study.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_settings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserSetting {

    @Id
    @Column(name = "user_id")
    private Integer userId; // Liên kết trực tiếp tới id của User

    @Column(name = "last_lesson_id", nullable = false)
    private Integer lastLessonId;

    @Column(name = "last_exercise_id")
    private Integer lastExerciseId;

    @Column(name = "updated_at", insertable = false, updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
    private LocalDateTime updatedAt;
}
