# Spring Boot Forum Application

## Mô tả
Ứng dụng diễn đàn được phát triển bằng Spring Boot, sử dụng MySQL làm cơ sở dữ liệu và Postman để kiểm thử các API. Dự án này hỗ trợ quản lý tài khoản người dùng, bài viết, và các chức năng khác liên quan đến diễn đàn.

## Cấu hình hệ thống

### Yêu cầu hệ thống
- **Java**: version 22.0.1 (2024-04-16)
- **Spring Boot**: Phiên bản phù hợp với dự án (có thể kiểm tra trong `pom.xml` hoặc `build.gradle`)
- **MySQL**: Phiên bản 5.7 trở lên
- **IDE**: IntelliJ IDEA hoặc Eclipse (đề xuất IntelliJ IDEA)

### Cài đặt MySQL
1. **Tải và cài đặt MySQL**:
   - Tải MySQL từ [MySQL Downloads](https://dev.mysql.com/downloads/installer/).
   - Làm theo hướng dẫn cài đặt MySQL cho hệ điều hành của bạn.
   
2. **Tạo database cho ứng dụng**:
   - Sau khi cài đặt MySQL, mở MySQL Command Line Client hoặc sử dụng một công cụ quản lý cơ sở dữ liệu như MySQL Workbench.
   - Tạo một database mới với tên `database_forum` bằng câu lệnh SQL sau:
     ```sql
     CREATE DATABASE database_forum;
     ```
### 
