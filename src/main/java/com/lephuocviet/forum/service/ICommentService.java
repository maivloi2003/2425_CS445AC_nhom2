package com.lephuocviet.forum.service;

import com.lephuocviet.forum.dto.requests.CommentRequest;
import com.lephuocviet.forum.dto.responses.CommentResponse;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ICommentService {

    CommentResponse createComment(CommentRequest commentRequest);

    Page<CommentResponse> getCommentByPostId(String postId,Integer page,Integer size);


}
