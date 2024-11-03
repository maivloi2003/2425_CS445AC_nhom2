package com.lephuocviet.forum.mapper;

import com.lephuocviet.forum.dto.requests.PostRequest;
import com.lephuocviet.forum.dto.responses.PostResponse;
import com.lephuocviet.forum.enity.Posts;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface PostMapper {

    @Mapping(target = "language" , ignore = true)
    Posts toPosts(PostRequest postRequest);



    @Mapping(target = "language",source = "language.name")
    @Mapping(target = "likes",constant = "0L" )
    @Mapping(target = "comments",constant = "0L")
    @Mapping(target = "id_user",source = "users.id")
    @Mapping(target = "name",source = "users.name")
    @Mapping(target = "img_user",source = "users.img")
    @Mapping(target = "user_like",constant = "false")
    @Mapping(target = "user_post",constant = "true")
    PostResponse toPostPageResponse(Posts Posts);


}
