package com.lephuocviet.forum.enity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
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
    LocalDate date_created;
    String content;

    @ManyToOne
    @JoinColumn(name = "user_id")
    Users users;

    @ManyToOne
    @JoinColumn(name = "post_id")
    Posts posts;

    @OneToMany(mappedBy = "comments",cascade = CascadeType.ALL, orphanRemoval = true)
    List<Comment_reply> commentReplies;

}
