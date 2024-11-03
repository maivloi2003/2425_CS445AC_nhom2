package com.lephuocviet.forum.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
public enum AdsCode {

    VIEW_500(24000, 500),
    VIEW_1000(58000, 500);


    private int amount;
    private int desired_views;

}