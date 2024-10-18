package com.lephuocviet.forum.service;

import com.lephuocviet.forum.dto.requests.AuthenticationRequest;
import com.lephuocviet.forum.dto.requests.IntrospectionRequest;
import com.lephuocviet.forum.dto.requests.UserRequest;
import com.lephuocviet.forum.dto.responses.AuthenticationResponse;
import com.lephuocviet.forum.dto.responses.IntrospectionResponse;
import com.lephuocviet.forum.dto.responses.UserResponse;
import com.nimbusds.jose.JOSEException;

import java.io.IOException;
import java.text.ParseException;
import java.util.List;

public interface IUserService {

    UserResponse createUser(UserRequest userRequest);

    UserResponse updateUser(UserRequest userRequest) throws IOException;

    boolean deleteUser(String userId);

    UserResponse getUserById(String userId);

    List<UserResponse> findUser(String name);

    UserResponse getMyInformation();
}
