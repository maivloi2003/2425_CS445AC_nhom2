package com.lephuocviet.forum.mapper;

import com.lephuocviet.forum.dto.responses.LikeResponse;
import com.lephuocviet.forum.enity.Likes;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "Spring")
public interface LikeMapper {

    @Mapping(target = "user_id",source = "users.id")
    @Mapping(target = "post_id",source = "posts.id")
    @Mapping(target = "liked",constant = "true")
    LikeResponse toLikeResponse(Likes likes);



}
