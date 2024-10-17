package com.lephuocviet.forum.service.implement;

import com.lephuocviet.forum.dto.requests.AuthenticationRequest;
import com.lephuocviet.forum.dto.requests.IntrospectionRequest;
import com.lephuocviet.forum.dto.responses.AuthenticationResponse;
import com.lephuocviet.forum.dto.responses.IntrospectionResponse;
import com.lephuocviet.forum.enity.Accounts;
import com.lephuocviet.forum.enity.Token_invalid;
import com.lephuocviet.forum.enums.ErrorCode;
import com.lephuocviet.forum.exception.WebException;
import com.lephuocviet.forum.repository.AccountsRepository;
import com.lephuocviet.forum.repository.Token_InvalidRepository;
import com.lephuocviet.forum.service.IAuthService;
import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.text.ParseException;
import java.time.Instant;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.StringJoiner;
import java.util.UUID;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AuthService implements IAuthService {

    final AccountsRepository accountsRepository;
    final Token_InvalidRepository tokenInvalidRepository;
    final PasswordEncoder passwordEncoder;
    @Value("${security.jwt.signer_Key}")
    String SIGNER_KEY;

    @Override
    public AuthenticationResponse authentication(AuthenticationRequest authenticationRequest) {
        if (accountsRepository.findAccountsByUsername(authenticationRequest.getUsername()) == null)
            throw new WebException(ErrorCode.USERNAME_NOT_FOUND);
        Accounts accounts = accountsRepository.findAccountsByUsername(authenticationRequest.getUsername());
        var valid = passwordEncoder.matches(authenticationRequest.getPassword(), accounts.getPassword());
        if (!valid) throw new WebException(ErrorCode.PASSWORD_NOT_MATCH);
        String token = generateToken(accounts);
        return AuthenticationResponse.builder()
                .token(token)
                .authenticated(true)
                .build();
    }

    @Override
    public IntrospectionResponse introspection(IntrospectionRequest introspectionRequest) throws ParseException, JOSEException {
        boolean valid = true;
        try {
            verify(introspectionRequest.getToken());
        }catch (Exception e){
            valid = false;
        }
        return IntrospectionResponse.builder()
                .authenticated(valid)
                .build();
    }

    public AuthenticationResponse logout(IntrospectionRequest introspectionRequest) throws ParseException, JOSEException {
        try {
            SignedJWT signedJWT = verify(introspectionRequest.getToken());
            String jid = signedJWT.getJWTClaimsSet().getJWTID();
            Token_invalid tokenInvalid = Token_invalid.builder()
                    .idToken(jid)
                    .token(introspectionRequest.getToken())
                    .date_created(LocalDate.now())
                    .build();
            ScheduledExecutorService scheduledExecutorService = Executors.newSingleThreadScheduledExecutor();
            Runnable deletedId = () -> tokenInvalidRepository.deleteById(jid);
            scheduledExecutorService.schedule(deletedId, 30, java.util.concurrent.TimeUnit.MINUTES);
            scheduledExecutorService.shutdown();
            tokenInvalidRepository.save(tokenInvalid);
            return AuthenticationResponse.builder()
                    .authenticated(true)
                    .build();
        }catch (Exception e){
            throw new WebException(ErrorCode.TOKEN_INVALID);
        }
    }

    public AuthenticationResponse refreshToken(IntrospectionRequest introspectionRequest) throws ParseException, JOSEException {
        try {
            SignedJWT signedJWT = verify(introspectionRequest.getToken());
            String jid = signedJWT.getJWTClaimsSet().getJWTID();
            String username = signedJWT.getJWTClaimsSet().getSubject();
            Accounts accounts = accountsRepository.findAccountsByUsername(username);
            String token = generateToken(accounts);
            Token_invalid tokenInvalid = Token_invalid.builder()
                    .idToken(jid)
                    .token(introspectionRequest.getToken())
                    .date_created(LocalDate.now())
                    .build();
            ScheduledExecutorService scheduledExecutorService = Executors.newSingleThreadScheduledExecutor();
            Runnable deletedId = () -> tokenInvalidRepository.deleteById(jid);
            scheduledExecutorService.schedule(deletedId, 30, java.util.concurrent.TimeUnit.MINUTES);
            scheduledExecutorService.shutdown();
            tokenInvalidRepository.save(tokenInvalid);
            return AuthenticationResponse.builder()
                    .authenticated(true)
                    .token(token)
                    .build();
        }catch (Exception e){
            throw new WebException(ErrorCode.TOKEN_INVALID);
        }

    }

    SignedJWT verify(String token) throws JOSEException, ParseException {
        JWSVerifier verifier = new MACVerifier(SIGNER_KEY.getBytes());
        SignedJWT signedJWT = SignedJWT.parse(token);
        Date expiration = signedJWT.getJWTClaimsSet().getExpirationTime();
        var verify = signedJWT.verify(verifier);
        if (!(verify || expiration.before(new Date())))
            throw new WebException(ErrorCode.TOKEN_INVALID);
        if (tokenInvalidRepository.existsByIdToken(signedJWT.getJWTClaimsSet().getJWTID()))
            throw new WebException(ErrorCode.TOKEN_INVALID);

        return signedJWT;
    }



    String generateToken(Accounts account) {
        JWSHeader jwsHeader = new JWSHeader(JWSAlgorithm.HS256);
        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(account.getUsername())
                .issuer("forum")
                .issueTime(new Date())
                .expirationTime(new Date(
                        Instant.now().plus(30, ChronoUnit.MINUTES).toEpochMilli()
                ))
                .jwtID(UUID.randomUUID().toString())
                .claim("scope", buildScope(account))
                .build();

        Payload payload = new Payload(jwtClaimsSet.toJSONObject());
        JWSObject jwsObject = new JWSObject(jwsHeader, payload);

        try {
            jwsObject.sign(new MACSigner(SIGNER_KEY.getBytes()));
            return jwsObject.serialize();
        } catch (JOSEException e) {
            throw new RuntimeException(e);
        }
    }

    String buildScope(Accounts accounts) {
        StringJoiner stringJoiner = new StringJoiner(" ");
        if (!CollectionUtils.isEmpty(accounts.getRoles())) {
            accounts.getRoles().forEach(role -> stringJoiner.add(role.getName()));
        }
        return stringJoiner.toString();
    }


}
