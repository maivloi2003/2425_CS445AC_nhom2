package com.lephuocviet.forum.controller;

import com.lephuocviet.forum.dto.responses.NoticeResponse;
import com.lephuocviet.forum.exception.ApiResponses;
import com.lephuocviet.forum.service.INoticeService;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/notices")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@CrossOrigin(origins = "*")
public class NotificationController {

    INoticeService noticeService;

    @GetMapping("/{id}")
    ResponseEntity<ApiResponses<List<NoticeResponse>>> getNoticesByUserId(@PathVariable("id") String id) {
        return ResponseEntity.ok(ApiResponses.<List<NoticeResponse>>builder()
                .result(noticeService.getAllNoticeByIdUser(id))
                .build());
    }

    @PutMapping("/{id}")
    ResponseEntity<ApiResponses<List<NoticeResponse>>> updateNoticeByUserId(@PathVariable("id") String id) {
        return ResponseEntity.ok(ApiResponses.<List<NoticeResponse>>builder()
                .result(noticeService.updateNoticeByIdUser(id))
                .build());
    }

}
