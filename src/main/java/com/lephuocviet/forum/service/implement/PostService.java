package com.lephuocviet.forum.service.implement;

import com.lephuocviet.forum.dto.requests.PostRequest;
import com.lephuocviet.forum.dto.responses.PostPageResponse;
import com.lephuocviet.forum.dto.responses.PostResponse;
import com.lephuocviet.forum.enity.Posts;
import com.lephuocviet.forum.enity.Users;
import com.lephuocviet.forum.enums.ErrorCode;
import com.lephuocviet.forum.exception.WebException;
import com.lephuocviet.forum.mapper.PostMapper;
import com.lephuocviet.forum.repository.AccountsRepository;
import com.lephuocviet.forum.repository.LanguageRepository;
import com.lephuocviet.forum.repository.PostsRepository;
import com.lephuocviet.forum.repository.UsersRepository;
import com.lephuocviet.forum.service.IPostService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;


import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PostService implements IPostService {
    PostsRepository postsRepository;
    UsersRepository usersRepository;
    AccountsRepository accountsRepository;
    LanguageRepository languageRepository;
    PostMapper postMapper;

    @Override
    public PostResponse createPost(PostRequest postRequest) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        if (!accountsRepository.existsByUsername(username))
            throw new WebException(ErrorCode.USER_NOT_FOUND);
        Posts posts = postMapper.toPosts(postRequest);
        Users users = usersRepository.findUserByUsername(username);
        posts.setUsers(users);
        posts.setDate_created(LocalDate.now());
        if(!languageRepository.existsByName(postRequest.getLanguage()))
            throw new WebException(ErrorCode.LANGUAGE_NOT_FOUND);
        posts.setLanguage(languageRepository.findByName(postRequest.getLanguage()));

        return postMapper.toPostResponse(postsRepository.save(posts));
    }

    @Override
    public Page<PostPageResponse> getPosts(Integer page, Integer size, String language, String content) {
        Pageable pageable =  PageRequest.of(page,size);
        Page<PostPageResponse> postPageResponseList = postsRepository.getPostPage(content,language,pageable);
        if (postPageResponseList.isEmpty()) throw new WebException(ErrorCode.POST_NOT_FOUND);
        return postPageResponseList;

    }
}
