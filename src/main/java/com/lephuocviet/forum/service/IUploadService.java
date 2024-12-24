package com.lephuocviet.forum.service;

import com.lephuocviet.forum.dto.responses.UploadResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface IUploadService {

    UploadResponse uploadImgUser(MultipartFile file) throws IOException;

    UploadResponse uploadImgPost(MultipartFile file) throws IOException;

    boolean deletedImg(String link) throws IOException;
}
