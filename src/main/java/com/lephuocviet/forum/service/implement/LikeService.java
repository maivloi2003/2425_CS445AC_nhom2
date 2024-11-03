package com.lephuocviet.forum.service.implement;

import com.lephuocviet.forum.dto.requests.LikeRequest;
import com.lephuocviet.forum.dto.responses.LikeResponse;
import com.lephuocviet.forum.enity.Likes;
import com.lephuocviet.forum.enity.Notices;
import com.lephuocviet.forum.enity.Posts;
import com.lephuocviet.forum.enity.Users;
import com.lephuocviet.forum.enums.ErrorCode;
import com.lephuocviet.forum.exception.WebException;
import com.lephuocviet.forum.mapper.LikeMapper;
import com.lephuocviet.forum.repository.LikesRepository;
import com.lephuocviet.forum.repository.NoticesRepository;
import com.lephuocviet.forum.repository.PostsRepository;
import com.lephuocviet.forum.repository.UsersRepository;
import com.lephuocviet.forum.service.ILikeService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@RequiredArgsConstructor
@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class LikeService implements ILikeService {
     SimpMessagingTemplate simpMessagingTemplate;
     LikesRepository likesRepository;
     UsersRepository usersRepository;
     PostsRepository postsRepository;
     NoticesRepository noticesRepository;
     LikeMapper likeMapper;
    @Override
    public LikeResponse actionLike(LikeRequest likeRequest) {
        Users users = usersRepository.findUserByUsername(SecurityContextHolder.getContext().getAuthentication().getName())
                .orElseThrow(() -> new WebException(ErrorCode.USER_NOT_FOUND));

        if (!likeRequest.isLiked()){
            if (!likesRepository.existsByPosts_IdAndUsers_Id(likeRequest.getId_post(), users.getId()))
                throw new WebException(ErrorCode.LIKE_NOT_FOUND);
            likesRepository.deleteByPosts_IdAndUsers_Id(likeRequest.getId_post(), users.getId());
            return LikeResponse.builder()
                    .post_id(likeRequest.getId_post())
                    .user_id(users.getId())
                    .liked(false)
                    .build();
        }
        if (likesRepository.existsByPosts_IdAndUsers_Id(likeRequest.getId_post(), users.getId()))
            throw new WebException(ErrorCode.LIKE_IS_EXISTS);
        Likes likes = Likes.builder()
                .posts(postsRepository.findPostsById(likeRequest.getId_post())
                        .orElseThrow(() -> new WebException(ErrorCode.POST_NOT_FOUND)))
                .users(users)
                .date_created(LocalDate.now())
                .build();

        String message;
        Posts posts = postsRepository.findPostsById(likeRequest.getId_post()).orElseThrow(() -> new WebException(ErrorCode.POST_NOT_FOUND));
        Integer countLike = likesRepository.countByPosts_Id(likeRequest.getId_post());
        if (countLike == null){
            message = users.getName() + " Like your post " + likes.getPosts().getTitle();
        } else {
            message = users.getName() + " And " + countLike + " Like your post " + likes.getPosts().getTitle();
        }

        Optional<Notices> notice = noticesRepository.findByIdPost(likeRequest.getId_post());
        if (notice.isEmpty()){
            Notices notices = Notices.builder()
                    .message(message)
                    .users(users)
                    .idPost(likeRequest.getId_post())
                    .status(false)
                    .date_created(LocalDate.now())
                    .build();
            noticesRepository.save(notices);
        } else {
            notice.get().setStatus(false);
            notice.get().setMessage(message);
            notice.get().setDate_created(LocalDate.now());
            noticesRepository.save(notice.get());
        }
        likesRepository.save(likes);
        if (posts.getUsers().getId() == users.getId()){
            return likeMapper.toLikeResponse(likes);
        }

        simpMessagingTemplate.convertAndSend("/topic/user/" + posts.getUsers().getId(), message);
        return likeMapper.toLikeResponse(likes);
    }
}
