package com.yukgaejang.voss.domain.notification.service.dto.response;

import com.yukgaejang.voss.domain.notification.repository.entity.Notification;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor
public class ViewNotificationResponse {
    private Long id;
    private String senderNickname;
    private Long contentId;
    private String type;

    public ViewNotificationResponse(Notification notification, String senderNickname) {
        this.id = notification.getId();
        this.senderNickname = senderNickname;
        this.contentId = notification.getContentId();
        this.type = String.valueOf(notification.getType());
    }
}
