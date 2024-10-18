package com.lephuocviet.forum.service;

import com.lephuocviet.forum.dto.requests.AuthenticationRequest;
import com.lephuocviet.forum.dto.requests.IntrospectionRequest;
import com.lephuocviet.forum.dto.responses.AuthenticationResponse;
import com.lephuocviet.forum.dto.responses.IntrospectionResponse;
import com.nimbusds.jose.JOSEException;

import java.text.ParseException;

public interface IAuthService {

    AuthenticationResponse authentication(AuthenticationRequest authenticationRequest);

    IntrospectionResponse introspection(IntrospectionRequest introspectionRequest) throws ParseException, JOSEException;

    AuthenticationResponse refreshToken(IntrospectionRequest introspectionRequest) throws ParseException, JOSEException;

    AuthenticationResponse logout(IntrospectionRequest introspectionRequest) throws ParseException, JOSEException;


}
