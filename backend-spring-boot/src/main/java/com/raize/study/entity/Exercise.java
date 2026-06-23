package com.raize.study.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "exercises")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Exercise {

    @Id
    private Integer id; // ID thủ công từ 1-190...

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lesson_id", nullable = false)
    private Lesson lesson;

    @Column(nullable = false)
    private String title;

    @Lob
    @Column(columnDefinition = "MEDIUMTEXT", nullable = false)
    private String instructions;

    @Column(name = "file_name", nullable = false, length = 100)
    private String fileName;

    @Column(name = "starter_code", columnDefinition = "TEXT", nullable = false)
    private String starterCode;

    @Column(name = "validate_str", columnDefinition = "TEXT", nullable = false)
    private String validateStr; // Chuỗi JS chứa hàm validate(code, output, db)
}
