package com.lephuocviet.forum.controller;

import com.lephuocviet.forum.dto.requests.LikeRequest;
import com.lephuocviet.forum.dto.responses.LikeResponse;
import com.lephuocviet.forum.exception.ApiResponses;
import com.lephuocviet.forum.service.ILikeService;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/likes")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@CrossOrigin(origins = "*")
public class LikeController {

    ILikeService likeService;

    @PostMapping
    ResponseEntity<ApiResponses<LikeResponse>> actionLike(@RequestBody LikeRequest likeRequest) {
        return ResponseEntity.ok(ApiResponses.<LikeResponse>builder()
                .result(likeService.actionLike(likeRequest))
                .build());

    }

}
