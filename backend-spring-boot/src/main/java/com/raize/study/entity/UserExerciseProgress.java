package com.raize.study.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_exercise_progress")
@IdClass(UserExerciseProgressId.class)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserExerciseProgress {

    @Id
    @Column(name = "user_id")
    private Integer userId;

    @Id
    @Column(name = "exercise_id")
    private Integer exerciseId;

    @Column(nullable = false)
    private Boolean completed;

    @Column(name = "saved_code", columnDefinition = "TEXT")
    private String savedCode;

    @org.hibernate.annotations.UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}

