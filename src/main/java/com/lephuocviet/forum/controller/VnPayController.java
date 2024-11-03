package com.lephuocviet.forum.controller;

import com.lephuocviet.forum.dto.responses.VnPayResponse;
import com.lephuocviet.forum.exception.ApiResponses;
import com.lephuocviet.forum.service.IVnPayService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/vnpay")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@CrossOrigin(origins = "*")
public class VnPayController {

    IVnPayService vnPayService;

    @GetMapping("/submitOrder")
    public ResponseEntity<ApiResponses<VnPayResponse>> create(HttpServletRequest request,
                                                              @RequestParam String location,
                                                              @RequestParam int amount,
                                                              @RequestParam String type,
                                                              @RequestParam String idHandler) {
        return ResponseEntity.ok(ApiResponses.<VnPayResponse>builder()
                .result(vnPayService.createOrder(request,amount, location,type,idHandler))
                .build());
    }
//
//    @GetMapping("/orderReturn")
//    public

}
