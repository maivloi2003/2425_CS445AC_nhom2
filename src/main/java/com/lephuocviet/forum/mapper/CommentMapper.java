package com.lephuocviet.forum.mapper;

import com.lephuocviet.forum.dto.responses.CommentResponse;
import com.lephuocviet.forum.enity.Comments;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "Spring")
public interface CommentMapper {

    @Mapping(source = "users.name",target = "name")
    @Mapping(source = "users.img",target = "img_user")
    @Mapping(source = "users.id",target = "id_user")
    @Mapping(target = "users_comment",constant = "true")
    CommentResponse toCommentResponse(Comments comments);

}
