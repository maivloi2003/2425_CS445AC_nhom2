# Spring Boot Forum Application

## Mô tả
Ứng dụng diễn đàn được phát triển bằng Spring Boot, sử dụng MySQL làm cơ sở dữ liệu và Postman để kiểm thử các API. Dự án này hỗ trợ quản lý tài khoản người dùng, bài viết, và các chức năng khác liên quan đến diễn đàn.

## Cấu hình hệ thống

### Yêu cầu hệ thống
- **Java**: version 22.0.1 (2024-04-16)
- **Spring Boot**: Phiên bản 3.3.4
- **MySQL**: Phiên bản 5.7 trở lên
- **IDE**: IntelliJ IDEA hoặc Eclipse (đề xuất IntelliJ IDEA)

### Đổi tên file 
- Đường dẫn file `\2425_CS445AC_nhom2\src\main\resources\text.file.text`
- Đổi tên thành `credentials.json`
- Bỏ các dấu gạch `//`
### Cài đặt MySQL
1. **Tải và cài đặt MySQL**:
   - Tải MySQL từ [MySQL Downloads](https://dev.mysql.com/downloads/installer/).
   - Làm theo hướng dẫn cài đặt MySQL cho hệ điều hành của bạn.
   
2. **Tạo database cho ứng dụng**:
   - Sau khi cài đặt MySQL, mở MySQL Command Line Client hoặc sử dụng một công cụ quản lý cơ sở dữ liệu như MySQL Workbench.
   - Tạo Mysql với host 3306
   - Tài khoản: root
   - Mật khẩu: root
   - Tạo một database mới với tên `database_forum` bằng câu lệnh SQL sau:
     ```sql
     CREATE DATABASE database_forum;
     ```
   - Nếu bạn sài cổng khác và mật khẩu khác hãy thay đổi ở file application.properties
     ```properties
   # Cấu hình kết nối cơ sở dữ liệu MySQL
   spring.datasource.url=jdbc:mysql://localhost:<cổng>/<Tên Database>
   spring.datasource.username=my_user
   spring.datasource.password=my_password
   
### Postman test Api
1. ** Cài đặt Postman
   - Tải Postman và cài đặt từ [https://www.postman.com/downloads/](https://www.postman.com/downloads/)
2. ** Import dữ liệu Postman
   - Link file Import dữ liệu [https://www.mediafire.com/file/pbu8bzashpws9dq/api_forum.postman_collection.json/file](https://www.mediafire.com/file/pbu8bzashpws9dq/api_forum.postman_collection.json/file)
     
### Import dữ liệu vào mysql
- Link file import dữ liệu vào mysql [https://www.mediafire.com/file/fh3x254low4dkru/database.sql/file](https://www.mediafire.com/file/4409yennuvlywhq/database_%25281%2529.sql/file)
- Tài khoản test: tk:test1234 mk: 1234567
- Tài khoản test: tk:vanlong mk: 1234567
