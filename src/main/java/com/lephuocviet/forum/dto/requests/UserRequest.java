package com.lephuocviet.forum.dto.requests;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserRequest {

    String name;
    String language;
    String sex;
    String img;
    String email;
    String username;
    String password;
    String repassword;
}
