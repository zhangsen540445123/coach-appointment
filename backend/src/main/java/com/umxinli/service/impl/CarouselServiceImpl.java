package com.umxinli.service.impl;

import com.umxinli.entity.Carousel;
import com.umxinli.mapper.CarouselMapper;
import com.umxinli.service.CarouselService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import java.util.List;

@Slf4j
@Service
public class CarouselServiceImpl implements CarouselService {
    
    @Autowired
    private CarouselMapper carouselMapper;

    @Override
    @Cacheable(value = "carousel", key = "#id")
    public Carousel getCarouselById(Long id) {
        log.info("Getting carousel by id: {}", id);
        return carouselMapper.selectById(id);
    }

    @Override
    @Cacheable(value = "carousels", key = "'all'")
    public List<Carousel> getAllCarousels() {
        log.info("Getting all carousels");
        return carouselMapper.selectAll();
    }

    @Override
    @Cacheable(value = "carousels", key = "'active'")
    public List<Carousel> getActiveCarousels() {
        log.info("Getting active carousels");
        return carouselMapper.selectByStatus(1);
    }

    @Override
    @CacheEvict(value = {"carousel", "carousels"}, allEntries = true)
    public int addCarousel(Carousel carousel) {
        log.info("Adding carousel: {}", carousel.getTitle());
        return carouselMapper.insert(carousel);
    }

    @Override
    @CacheEvict(value = {"carousel", "carousels"}, allEntries = true)
    public int updateCarousel(Carousel carousel) {
        log.info("Updating carousel: {}", carousel.getId());
        return carouselMapper.update(carousel);
    }

    @Override
    @CacheEvict(value = {"carousel", "carousels"}, allEntries = true)
    public int deleteCarousel(Long id) {
        log.info("Deleting carousel: {}", id);
        return carouselMapper.delete(id);
    }
}
