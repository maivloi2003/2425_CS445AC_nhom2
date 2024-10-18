package com.lephuocviet.forum.controller;

import com.lephuocviet.forum.dto.requests.PostRequest;
import com.lephuocviet.forum.dto.responses.PostPageResponse;
import com.lephuocviet.forum.dto.responses.PostResponse;
import com.lephuocviet.forum.exception.ApiResponses;
import com.lephuocviet.forum.service.IPostService;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/posts")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class PostController {

    IPostService postService;

    @PostMapping
    ResponseEntity<ApiResponses<PostResponse>> createPost(@RequestBody PostRequest postRequest) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponses.<PostResponse>builder()
                .result(postService.createPost(postRequest))
                .build());

    }

    @GetMapping
    ResponseEntity<ApiResponses<Page<PostPageResponse>>> getAllPosts(@RequestParam(defaultValue = "0") Integer page,
                                                                     @RequestParam(defaultValue = "4") Integer size,
                                                                     @RequestParam(defaultValue = "") String content,
                                                                     @RequestParam(defaultValue = "") String language) {
        return ResponseEntity.ok(ApiResponses.<Page<PostPageResponse>>builder()
                .result(postService.getPosts(page, size, language, content))
                .build());
    }
}
