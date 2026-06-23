package com.raize.study.entity;

import java.io.Serializable;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserExerciseProgressId implements Serializable {
    private Integer userId;
    private Integer exerciseId;
}
