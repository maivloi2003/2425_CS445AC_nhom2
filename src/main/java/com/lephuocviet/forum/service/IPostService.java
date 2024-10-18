package com.lephuocviet.forum.service;

import com.lephuocviet.forum.dto.requests.PostRequest;
import com.lephuocviet.forum.dto.responses.PostPageResponse;
import com.lephuocviet.forum.dto.responses.PostResponse;
import org.springframework.data.domain.Page;

import java.util.List;

public interface IPostService {

    PostResponse createPost(PostRequest postRequest);


    Page<PostPageResponse> getPosts(Integer page, Integer size, String language, String content);
}
