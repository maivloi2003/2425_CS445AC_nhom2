package com.lephuocviet.forum.exception;

import lombok.*;
import lombok.experimental.FieldDefaults;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ApiResponses<T> {
    Integer code;
    String message;
    T result;
}
