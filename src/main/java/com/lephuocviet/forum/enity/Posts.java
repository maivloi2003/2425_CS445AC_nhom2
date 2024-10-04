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
@Table(name = "posts")
public class Posts {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;
    String title;
    String content;
    Date date_created;
    @Lob
    byte[] img;

    @ManyToOne
    @JoinColumn(name = "user_id")
    Users users;

    @ManyToOne
    @JoinColumn(name = "language_id")
    Language language;


    @OneToMany(mappedBy = "posts")
    List<Ads> ads;

    @OneToMany(mappedBy = "posts")
    List<Likes> likes;

    @OneToMany(mappedBy = "posts")
    List<Comments> comments;


}
