package com.lephuocviet.forum.enity;


import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "posts")
public class Posts {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;
    String title;
    @Column(length = 999)
    String content;
    LocalDate date_created;
    String img;

    @ManyToOne
    @JoinColumn(name = "user_id")
    Users users;

    @ManyToOne
    @JoinColumn(name = "language_id")
    Language language;


    @OneToMany(mappedBy = "post",cascade = CascadeType.ALL, orphanRemoval = true)
    List<AdsPost> adsPosts;

    @OneToMany(mappedBy = "posts",cascade = CascadeType.ALL, orphanRemoval = true)
    List<Likes> likes;

    @OneToMany(mappedBy = "posts",cascade = CascadeType.ALL, orphanRemoval = true)
    List<Comments> comments;


}
