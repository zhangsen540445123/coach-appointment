package com.umxinli.service;

import com.umxinli.entity.Carousel;
import java.util.List;

public interface CarouselService {
    Carousel getCarouselById(Long id);
    
    List<Carousel> getAllCarousels();
    
    List<Carousel> getActiveCarousels();
    
    int addCarousel(Carousel carousel);
    
    int updateCarousel(Carousel carousel);
    
    int deleteCarousel(Long id);
}
