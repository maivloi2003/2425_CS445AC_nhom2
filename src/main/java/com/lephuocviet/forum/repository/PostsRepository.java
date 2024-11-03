package com.lephuocviet.forum.repository;

import com.lephuocviet.forum.dto.responses.PostResponse;
import com.lephuocviet.forum.enity.Posts;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PostsRepository extends JpaRepository<Posts, String> {
    @Query("SELECT NEW com.lephuocviet.forum.dto.responses.PostResponse(" +
            " p.id, p.title, p.content, p.date_created, p.img, l.name , u.id, u.name, u.img, " +
            " COUNT(DISTINCT li.id),COUNT(DISTINCT c.id),  FALSE , " +
            " (CASE WHEN p.users.id = :userId THEN TRUE ELSE FALSE END) ) " +
            "FROM Posts p " +
            "LEFT JOIN p.language l " +
            "LEFT JOIN p.likes li " +
            "LEFT JOIN p.comments c " +
            "LEFT JOIN p.users u " +
            "WHERE (:content IS NULL OR :content = '' OR p.content LIKE %:content% OR p.title LIKE %:content%) " +
            "AND (:language IS NULL OR :language = '' OR l.name = :language) " +
            "GROUP BY p.id, p.title, p.content, p.date_created, p.img, l.name, u.name,p.users.id ")
    Page<PostResponse> getPostPage(@Param("content") String content,
                                   @Param("language") String language,
                                   @Param("userId") String userId,
                                   Pageable pageable);


    @Query("SELECT NEW com.lephuocviet.forum.dto.responses.PostResponse (" +
            " p.id, p.title, p.content, p.date_created, p.img, l.name,  u.id, u.name, u.img, " +
            " COUNT(DISTINCT li.id), COUNT(DISTINCT c.id), FALSE, " +
            " (CASE WHEN p.users.id = :userId THEN TRUE ELSE FALSE END)) " +
            " FROM Posts p " +
            "LEFT JOIN p.language l " +
            "LEFT JOIN p.likes li " +
            "LEFT JOIN p.comments c " +
            "LEFT JOIN p.users u " +
            "WHERE p.id = :id " +
            "GROUP BY p.id, p.title, p.content, p.date_created, p.img, l.name, u.name,p.users.id ")
    PostResponse getPostById(@Param("id") String id,
                             @Param("userId") String userId);

    boolean existsPostsById(String id);


    Optional<Posts> findPostsById(String id);


    @Query("SELECT NEW com.lephuocviet.forum.dto.responses.PostResponse(" +
            " p.id, p.title, p.content, p.date_created, p.img, l.name , u.id, u.name, u.img, " +
            " COUNT(DISTINCT li.id),COUNT(DISTINCT c.id),  FALSE , " +
            " (CASE " +
            "WHEN :myId IS NULL THEN FALSE " +
            "WHEN p.users.id = :myId THEN TRUE ELSE FALSE END) ) " +
            "FROM Posts p " +
            "LEFT JOIN p.language l " +
            "LEFT JOIN p.likes li " +
            "LEFT JOIN p.comments c " +
            "LEFT JOIN p.users u " +
            "WHERE p.users.id = :userId " +
            "GROUP BY p.id, p.title, p.content, p.date_created, p.img, l.name, u.name,p.users.id ")
    Page<PostResponse> getPostPageByUserId(@Param("userId") String userId, @Param("myId") String myId ,Pageable pageable);
}
