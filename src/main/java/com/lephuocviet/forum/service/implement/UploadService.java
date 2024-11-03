package com.lephuocviet.forum.service.implement;



import com.google.auth.Credentials;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.*;
import com.lephuocviet.forum.dto.responses.UploadResponse;
import com.lephuocviet.forum.enity.Users;
import com.lephuocviet.forum.enums.ErrorCode;
import com.lephuocviet.forum.exception.WebException;
import com.lephuocviet.forum.repository.UsersRepository;
import com.lephuocviet.forum.service.IUploadService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UploadService implements IUploadService {

    @Value("${cloud.bucketName}")
    String bucketName;
    @Value("${spring.cloud.gcp.credentials.location}")
    String credentialsLocation;
    final UsersRepository usersRepository;



    @Override
    public UploadResponse uploadImgUser(MultipartFile file) throws IOException {
        if (file.getSize() > 2 * 1024 * 1024) {
            throw new WebException(ErrorCode.FILE_TO_LARGE);
        }
        Credentials credentials = GoogleCredentials
                .fromStream(new FileInputStream(credentialsLocation));

        Storage storage = StorageOptions.newBuilder().setCredentials(credentials).build().getService();

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Users users = usersRepository.findUserByUsername(username)
                .orElseThrow(() -> new WebException(ErrorCode.USER_NOT_FOUND));
        String fileName = UUID.randomUUID() + "-" + file.getOriginalFilename();
        Bucket bucket = storage.get(bucketName);
        bucket.create(fileName,file.getBytes(),file.getContentType());
        String publicLink = "https://storage.googleapis.com/" + bucketName + "/" + fileName;
        if (users.getImg() != null) {
            String oldFileName = users.getImg().substring(users.getImg().lastIndexOf('/') + 1);
            storage.delete(bucketName, oldFileName);
        }
        users.setImg(publicLink);
        usersRepository.save(users);
        return UploadResponse.builder()
                .link(publicLink)
                .valid(true)
                .build();
    }

    @Override
    public UploadResponse uploadImgPost(MultipartFile file) throws IOException {
        if (file.getSize() > 2 * 1024 * 1024)
            throw new WebException(ErrorCode.FILE_TO_LARGE);
        Credentials credentials = GoogleCredentials.fromStream(new FileInputStream(credentialsLocation));
        Storage storage = StorageOptions.newBuilder().setCredentials(credentials).build().getService();
        String fileName = UUID.randomUUID() + "-" + file.getOriginalFilename();
        Bucket bucket = storage.get(bucketName);
        bucket.create(fileName,file.getBytes(),file.getContentType());
        String publicLink = "https://storage.googleapis.com/" + bucketName + "/" + fileName;
        return UploadResponse.builder()
                .link(publicLink)
                .valid(true)
                .build();
    }

    @Override
    public boolean deletedImg(String link) throws IOException {
        Credentials credentials = GoogleCredentials.fromStream(new FileInputStream(credentialsLocation));
        Storage storage = StorageOptions.newBuilder().setCredentials(credentials).build().getService();
        String oldFileName = link.substring(link.lastIndexOf('/') + 1);
        Boolean deleted = storage.delete(bucketName, oldFileName);
        if (!deleted) throw new WebException(ErrorCode.FILE_NOT_FOUND);
        return true;
    }


}
