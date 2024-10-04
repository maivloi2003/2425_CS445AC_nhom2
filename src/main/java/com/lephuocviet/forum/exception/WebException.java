package com.lephuocviet.forum.exception;

import com.lephuocviet.forum.enums.ErrorCode;

public class WebException extends RuntimeException{
    private ErrorCode errorCode;

    public WebException(ErrorCode errorCode) {
        this.errorCode = errorCode;
    }

    public ErrorCode getErrorCode() {
        return errorCode;
    }

    public void setErrorCode(ErrorCode errorCode) {
        this.errorCode = errorCode;
    }
}
