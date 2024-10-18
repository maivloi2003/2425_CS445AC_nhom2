package com.lephuocviet.forum.dto.requests;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PostRequest {

    String title;
    String content;
    String img;
    String language;
}
