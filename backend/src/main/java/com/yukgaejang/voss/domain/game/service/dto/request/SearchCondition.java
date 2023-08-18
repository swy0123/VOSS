package com.yukgaejang.voss.domain.game.service.dto.request;

import lombok.Data;

@Data
public class SearchCondition {
    public enum SortCondition {
        DATE, SCORE
    }
    public enum WhereCondition {
        MEMBER
    }

    private SortCondition sortCondition;
    private WhereCondition whereCondition;
    private int page;
    private int limit;

    public SearchCondition(SortCondition sortCondition, WhereCondition whereCondition, int page, int limit) {
        this.sortCondition = sortCondition;
        this.whereCondition = whereCondition;
        this.page = page;
        this.limit = limit;
    }
}
