package com.lephuocviet.forum.configuration;

import com.lephuocviet.forum.dto.requests.IntrospectionRequest;
import com.lephuocviet.forum.enums.ErrorCode;
import com.lephuocviet.forum.exception.WebException;
import com.lephuocviet.forum.service.IAuthServer;
import com.lephuocviet.forum.service.implement.AuthServer;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;


@Component
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class JwtDecoderCustom implements JwtDecoder {

    @Value("${security.jwt.signer_Key}")
    String SIGNER_KEY;
    final IAuthServer iauthServer;
    NimbusJwtDecoder nimbusJwtDecoder;


    @Override
    public Jwt decode(String token) throws JwtException {
        try {
            var introspect = iauthServer.introspection(new IntrospectionRequest(token));
            if (!introspect.isAuthenticated()) throw new WebException(ErrorCode.TOKEN_INVALID);
        } catch (Exception e) {
            throw new WebException(ErrorCode.TOKEN_INVALID);
        }


        if (nimbusJwtDecoder == null) {
            SecretKeySpec secretKey = new SecretKeySpec(SIGNER_KEY.getBytes(),"HS256");
            nimbusJwtDecoder = NimbusJwtDecoder.withSecretKey(secretKey)
                    .macAlgorithm(MacAlgorithm.HS256)
                    .build();
        }
        return nimbusJwtDecoder.decode(token);
    }
}
