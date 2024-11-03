package com.lephuocviet.forum.repository;

import com.lephuocviet.forum.dto.responses.CommentResponse;
import com.lephuocviet.forum.enity.Comments;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface CommentsRepository extends JpaRepository<Comments, String> {

    @Query("SELECT Count(DISTINCT c.posts.id) " +
            "From Comments c " +
            "Where :id = c.posts.id " +
            "GROUP BY c.posts.id")
    Integer countCommentsByPosts_Id(@Param("id") String postId);



    @Query("SELECT NEW com.lephuocviet.forum.dto.responses.CommentResponse( " +
            "c.id, u.id, c.date_created, u.name, u.img, c.content, false ) " +
            "From Comments c " +
            "LEFT JOIN c.users u " +
            "where c.posts.id = :id" )
    Page<CommentResponse> getCommentsByPosts_Id(@Param("id") String postId,
                                                Pageable pageable);

    boolean existsByIdAndUsers_Id(String id,String userId);
}