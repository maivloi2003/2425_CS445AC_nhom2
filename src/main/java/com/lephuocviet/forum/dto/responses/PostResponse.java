package com.lephuocviet.forum.dto.responses;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PostResponse {
    String id;
    String title;
    String content;
    LocalDate date_created;
    String img;
}
