package com.lephuocviet.forum.dto.requests;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PasswordRequest {
    String password;
    String Repassword;
}
