package com.raize.study.entity;

import java.io.Serializable;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserLessonProgressId implements Serializable {
    private Integer userId;
    private Integer lessonId;
}
