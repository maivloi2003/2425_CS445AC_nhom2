package com.lephuocviet.forum.controller;

import com.lephuocviet.forum.dto.requests.AuthenticationRequest;
import com.lephuocviet.forum.dto.requests.IntrospectionRequest;
import com.lephuocviet.forum.dto.responses.AuthenticationResponse;
import com.lephuocviet.forum.dto.responses.IntrospectionResponse;
import com.lephuocviet.forum.exception.ApiResponses;
import com.lephuocviet.forum.service.IAuthServer;
import com.nimbusds.jose.JOSEException;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;

@RestController
@AllArgsConstructor
@RequestMapping("/auth")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class AuthenticationController {

    IAuthServer iAuthServer;

    @PostMapping("/login")
    public ResponseEntity<ApiResponses<AuthenticationResponse>> login(@RequestBody AuthenticationRequest authenticationRequest) {
        return ResponseEntity.ok(ApiResponses.<AuthenticationResponse>builder()
                .result(iAuthServer.authentication(authenticationRequest))
                .build());
    }

    @PostMapping("/introspect")
    public ResponseEntity<ApiResponses<IntrospectionResponse>> introspect(@RequestBody IntrospectionRequest introspectionRequest) throws ParseException, JOSEException {
        return ResponseEntity.ok(ApiResponses.<IntrospectionResponse>builder()
                .result(iAuthServer.introspection(introspectionRequest))
                .build());
    }


    @PostMapping("/refresh")
    public ResponseEntity<ApiResponses<AuthenticationResponse>> refresh(@RequestBody IntrospectionRequest introspectionRequest) throws ParseException, JOSEException {
        return ResponseEntity.ok(ApiResponses.<AuthenticationResponse>builder()
                .result(iAuthServer.refreshToken(introspectionRequest))
                .build());
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponses<AuthenticationResponse>> logout(@RequestBody IntrospectionRequest introspectionRequest) throws ParseException, JOSEException {
        return ResponseEntity.ok(ApiResponses.<AuthenticationResponse>builder()
                .result(iAuthServer.logout(introspectionRequest))
                .build());
    }
}
