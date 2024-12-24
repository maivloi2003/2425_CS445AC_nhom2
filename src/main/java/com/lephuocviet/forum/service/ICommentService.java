package com.lephuocviet.forum.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.lephuocviet.forum.dto.requests.CommentRequest;
import com.lephuocviet.forum.dto.responses.CommentResponse;
import org.springframework.data.domain.Page;

public interface ICommentService {

    CommentResponse createComment(CommentRequest commentRequest) throws JsonProcessingException;

    Page<CommentResponse> getCommentByPostId(String postId,Integer page,Integer size);


}
