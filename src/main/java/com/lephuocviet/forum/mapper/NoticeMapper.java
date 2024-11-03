package com.lephuocviet.forum.mapper;

import com.lephuocviet.forum.dto.responses.NoticeResponse;
import com.lephuocviet.forum.enity.Notices;
import org.mapstruct.Mapper;

@Mapper(componentModel = "Spring")
public interface NoticeMapper {


    Notices toNoticeResponse(NoticeResponse noticeResponse);

    NoticeResponse ToNoticeResponse(Notices notices);
}
