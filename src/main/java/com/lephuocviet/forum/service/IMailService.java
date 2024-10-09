package com.lephuocviet.forum.service;

import com.lephuocviet.forum.dto.requests.MailRequest;
import com.lephuocviet.forum.dto.requests.PasswordRequest;
import com.lephuocviet.forum.dto.responses.MailResponse;
import com.nimbusds.jose.JOSEException;

import java.text.ParseException;

public interface IMailService {

    MailResponse sendMailActive();

    MailResponse sendMailResetPassword(MailRequest mailRequest);

    MailResponse checkMailActive(String token) throws ParseException, JOSEException;

    MailResponse resetPassword(String token, PasswordRequest passwordRequest);

}
