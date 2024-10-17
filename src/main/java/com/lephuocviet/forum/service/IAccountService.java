package com.lephuocviet.forum.service;

import com.lephuocviet.forum.dto.requests.IntrospectionRequest;
import com.lephuocviet.forum.dto.responses.ActiveResponse;

public interface IAccountService {

    ActiveResponse checkActive();

}
