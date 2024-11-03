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
public class CommentResponse {
    String id;
    String id_user;
    LocalDate date_created;
    String name;
    String img_user;
    String content;
    boolean users_comment;

}
