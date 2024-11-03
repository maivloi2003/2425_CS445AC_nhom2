package com.lephuocviet.forum.mapper;

import com.lephuocviet.forum.dto.requests.UserRequest;
import com.lephuocviet.forum.dto.responses.UserResponse;
import com.lephuocviet.forum.enity.Accounts;
import com.lephuocviet.forum.enity.Users;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {


    Users toUser(UserRequest userRequest);


    UserResponse toUserResponses(Users users);

    @Mapping(target = "email", ignore = true)
    Users toUpdate(@MappingTarget Users users, UserRequest userRequest);

//    List<UserResponse> toListUserResponses(List<Users> users);

}
