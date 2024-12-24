package com.lephuocviet.forum.dto.responses;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserResponse {
    String id;
    String name;
    String language;
    String sex;
    String img;
    String email;
    boolean isUser;
}
