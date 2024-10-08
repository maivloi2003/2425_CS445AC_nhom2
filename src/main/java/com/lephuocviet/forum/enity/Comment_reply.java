package com.lephuocviet.forum.enity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "comment_reply")
public class Comment_reply {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;
    LocalDate date_created;
    String content;

    @ManyToOne
    @JoinColumn(name = "user_id")
    Users users;
    @ManyToOne
    @JoinColumn(name = "comment_id")
    Comments comments;
}
