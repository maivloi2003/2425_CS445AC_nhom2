package com.lephuocviet.forum.repository;

import com.lephuocviet.forum.dto.responses.PostPageResponse;
import com.lephuocviet.forum.enity.Posts;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
public interface PostsRepository extends JpaRepository<Posts, String> {
    @Query("SELECT NEW com.lephuocviet.forum.dto.responses.PostPageResponse(" +
            " p.id, p.title, p.content, p.date_created, p.img, l.name , u.name, " +
            " COUNT(DISTINCT li.id) ) " +
            "FROM Posts p " +
            "LEFT JOIN p.language l " +
            "LEFT JOIN p.likes li " +
            "LEFT JOIN p.comments c " +
            "LEFT JOIN p.users u " +
            "WHERE (:content IS NULL OR :content = '' OR p.content LIKE %:content% OR p.title LIKE %:content%) " +
            "AND (:language IS NULL OR :language = '' OR l.name = :language) " +
            "GROUP BY p.id, p.title, p.content, p.date_created, p.img, l.name, u.name")
    Page<PostPageResponse> getPostPage(@Param("content") String content,
                                       @Param("language") String language,
                                       Pageable pageable);
}
