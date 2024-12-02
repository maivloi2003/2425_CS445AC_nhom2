package com.lephuocviet.forum.configuration;

import com.lephuocviet.forum.dto.requests.IntrospectionRequest;

import com.lephuocviet.forum.service.IAuthService;
import com.nimbusds.jose.JOSEException;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;

import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.stereotype.Component;

import javax.crypto.spec.SecretKeySpec;
import java.text.ParseException;


@Component
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class JwtDecoderCustom implements JwtDecoder {

    @Value("${security.jwt.signer_Key}")
    String SIGNER_KEY;
    final IAuthService iauthService;
    NimbusJwtDecoder nimbusJwtDecoder;


    @Override
    public Jwt decode(String token) throws JwtException {
        try {
            var introspect = iauthService.introspection(new IntrospectionRequest(token));
            if (!introspect.isAuthenticated()) {
                throw new JwtException("Token invalid");
            }
        }  catch (JOSEException | ParseException e) {
            throw new JwtException(e.getMessage());
        }

//        try{
//            boolean checkActive = iauthService.checkActive(new IntrospectionRequest(token));
//            if (!checkActive) {
//                throw new JwtException("Token invalid");
//            }
//        } catch (JOSEException | ParseException e) {
//            throw new JwtException(e.getMessage());
//        }
        if (nimbusJwtDecoder == null) {
            SecretKeySpec secretKey = new SecretKeySpec(SIGNER_KEY.getBytes(),"HS256");
            nimbusJwtDecoder = NimbusJwtDecoder.withSecretKey(secretKey)
                    .macAlgorithm(MacAlgorithm.HS256)
                    .build();
        }
        return nimbusJwtDecoder.decode(token);
    }
}
