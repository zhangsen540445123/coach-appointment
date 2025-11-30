package com.umxinli.dto;

import lombok.Data;
import java.util.List;

@Data
public class FilterDTO {
    private String city;
    private List<String> tags;
    private String gender;
    private String sortOrder; // e.g., 'price_asc', 'price_desc', 'rating_desc'
    private int pageNum = 1;
    private int pageSize = 10;
}
