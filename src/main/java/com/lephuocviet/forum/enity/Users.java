package com.lephuocviet.forum.enity;


import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "users")
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;
    String name;
    String language;
    String sex;
    String img;
    String email;
    @OneToOne
    @JoinColumn(name = "account_id")
    Accounts accounts;

    @OneToMany(mappedBy = "users",cascade = CascadeType.ALL,orphanRemoval = true)
    List<Notices> notices;
    @OneToMany(mappedBy = "users",cascade = CascadeType.ALL,orphanRemoval = true)
    List<Posts> posts;
    @OneToMany(mappedBy = "users",cascade = CascadeType.ALL,orphanRemoval = true)
    List<Likes> likes;
    @OneToMany(mappedBy = "users",cascade = CascadeType.ALL,orphanRemoval = true)
    List<Comments> comments;
    @OneToMany(mappedBy = "users",cascade = CascadeType.ALL,orphanRemoval = true)
    List<Comment_reply> commentReplies;
}