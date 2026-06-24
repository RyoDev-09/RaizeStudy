package com.raize.study.entity;

import lombok.*;
import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserQuizProgressId implements Serializable {
    private Integer userId;
    private Integer lessonId;
}
