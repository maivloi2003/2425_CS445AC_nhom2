package com.lephuocviet.forum.mapper;

import com.lephuocviet.forum.dto.requests.PostRequest;
import com.lephuocviet.forum.dto.requests.UserRequest;
import com.lephuocviet.forum.dto.responses.PostResponse;
import com.lephuocviet.forum.enity.Posts;
import com.lephuocviet.forum.enity.Users;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface PostMapper {

    @Mapping(target = "language" , ignore = true)
    Posts toPosts(PostRequest postRequest);

    PostResponse toPostResponse(Posts posts);


}
