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

//    @Mapping(source = "name", target = "name")
//    @Mapping(source = "language", target = "language")
//    @Mapping(source = "sex", target = "sex")
//    @Mapping(target = "img", ignore = true)
//    @Mapping(source = "email", target = "email")
//    Users toUpdate(@MappingTarget Users users, UserRequest userRequest);

//    List<UserResponse> toListUserResponses(List<Users> users);

}
