package com.lephuocviet.forum.enums;

import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;


public enum ErrorCode {
    // 400 BAD REQUEST
    USERNAME_IS_EXISTS(40001, "Username is exists", HttpStatus.BAD_REQUEST),
    EMAIL_IS_EXISTS(40002, "Email is exists", HttpStatus.BAD_REQUEST),

    //401 AUTHENTICATION
    PASSWORD_NOT_MATCH(40101,"Password not match", HttpStatus.UNAUTHORIZED),
    TOKEN_INVALID(40102,"Token invalid", HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED(40103, "Unauthorized", HttpStatus.UNAUTHORIZED),
    //403 FORBIDDEN
    FORBIDDEN(40301, "Forbidden",HttpStatus.FORBIDDEN),
    // 404 NOT FOUND
    USERNAME_NOT_FOUND(40401,"Username not found", HttpStatus.NOT_FOUND),
    EMAIL_NOT_FOUND(40402,"Email not found", HttpStatus.NOT_FOUND),
    ROLE_NOT_FOUND(40403, "Role not found", HttpStatus.NOT_FOUND),
    ACCOUNT_NOT_FOUND(40404, "Account not found", HttpStatus.NOT_FOUND),
    POST_NOT_FOUND(40405, "Post not found", HttpStatus.NOT_FOUND),
    LANGUAGE_NOT_FOUND(40406, "Language not found", HttpStatus.NOT_FOUND),
    ADS_NOT_FOUND(40407, "Ads not found", HttpStatus.NOT_FOUND),
    TRANSACTION_NOT_FOUND(40408, "Transaction not found", HttpStatus.NOT_FOUND),
    VIPS_NOT_FOUND(40409, "VIPs not found", HttpStatus.NOT_FOUND),
    COMMENT_NOT_FOUND(40410, "Comment not found", HttpStatus.NOT_FOUND),
    LIKE_NOT_FOUND(40411, "Like not found", HttpStatus.NOT_FOUND),
    COMMENT_REPLY_NOT_FOUND(40412, "Comment reply not found", HttpStatus.NOT_FOUND),
    USER_NOT_FOUND(40413, "User not found", HttpStatus.NOT_FOUND);
    ;
    private int code;
    private String message;
    HttpStatus httpStatus;

    ErrorCode(int code, String message, HttpStatus httpStatus) {
        this.code = code;
        this.message = message;
        this.httpStatus = httpStatus;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }

    public void setHttpStatus(HttpStatus httpStatus) {
        this.httpStatus = httpStatus;
    }
}
