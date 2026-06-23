package com.raize.study.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "lessons")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Lesson {

    @Id
    private Integer id; // ID thủ công từ 1-32,...

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String phase;

    @Column(nullable = false, length = 50)
    private String time;

    @Column(nullable = false, length = 50)
    private String difficulty;

    @Lob
    @Column(columnDefinition = "MEDIUMTEXT", nullable = false)
    private String theory;

    @Column(name = "created_at", insertable = false, updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createdAt;

    @Column(name = "updated_at", insertable = false, updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
    private LocalDateTime updatedAt;
}
