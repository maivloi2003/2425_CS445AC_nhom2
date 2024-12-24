package com.lephuocviet.forum.service;

import com.lephuocviet.forum.dto.requests.UserRequest;
import com.lephuocviet.forum.dto.responses.UserResponse;

import java.io.IOException;
import java.util.List;

public interface IUserService {

    UserResponse createUser(UserRequest userRequest);

    UserResponse updateUser(UserRequest userRequest) throws IOException;

    void deleteUser(String userId);

    UserResponse getUserById(String userId);

    List<UserResponse> findUser(String name);

    UserResponse getMyInformation();
}
