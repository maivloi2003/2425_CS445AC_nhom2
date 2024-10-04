package com.lephuocviet.forum.enity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "mail_sender")
public class Mail_sender {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;
    String email;
    String token;
    Date date_created;
}
