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
@Table(name = "mail_sender")
public class Mail_sender {

    @Id
    String id;
    String email;
    String token;
    LocalDate date_created;
}
