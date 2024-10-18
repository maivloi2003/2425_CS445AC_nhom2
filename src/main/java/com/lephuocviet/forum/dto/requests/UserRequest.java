package com.lephuocviet.forum.dto.requests;

import jakarta.persistence.Lob;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.web.multipart.MultipartFile;

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
