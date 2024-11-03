package com.lephuocviet.forum.service;

import com.lephuocviet.forum.dto.responses.VnPayResponse;
import jakarta.servlet.http.HttpServletRequest;

public interface IVnPayService {
//    String createOrder(HttpServletRequest request,String location, int amount);

    VnPayResponse createOrder(HttpServletRequest request, int amount, String location,String type,String idHandler);
}
