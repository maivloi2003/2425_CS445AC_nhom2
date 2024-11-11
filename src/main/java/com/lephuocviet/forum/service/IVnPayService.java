package com.lephuocviet.forum.service;

import com.lephuocviet.forum.dto.responses.VnPayResponse;
import jakarta.servlet.http.HttpServletRequest;

public interface IVnPayService {


    VnPayResponse createOrder(HttpServletRequest request, String location, String type, String idHandler, String sales_package);


    VnPayResponse orderReturn(HttpServletRequest request);
}
