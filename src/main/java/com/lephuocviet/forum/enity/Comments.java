package com.lephuocviet.forum.enity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "comments")
public class Comments {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;
    Date date_created;
    String content;

    @ManyToOne
    @JoinColumn(name = "user_id")
    Users users;

    @ManyToOne
    @JoinColumn(name = "post_id")
    Posts posts;

    @OneToMany(mappedBy = "comments")
    List<Comment_reply> commentReplies;

}
