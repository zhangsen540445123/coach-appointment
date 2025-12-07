package com.umxinli.service;

import com.umxinli.dto.CounselorFilterRequest;
import com.umxinli.dto.CounselorFilterResponse;
import com.umxinli.entity.Counselor;
import java.util.List;

public interface CounselorService {
    Counselor getCounselorById(Long id);
    
    List<Counselor> getAllCounselors();

    List<Counselor> getFeaturedCounselors();

    CounselorFilterResponse filterCounselors(CounselorFilterRequest request);
    
    int addCounselor(Counselor counselor);
    
    int updateCounselor(Counselor counselor);
    
    int deleteCounselor(Long id);
}
