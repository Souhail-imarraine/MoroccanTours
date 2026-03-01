package com.moroccantour.controller;

import com.moroccantour.dto.response.TourImageResponse;
import com.moroccantour.exception.BadRequestException;
import com.moroccantour.exception.NotFoundException;
import com.moroccantour.mapper.TourImageMapper;
import com.moroccantour.repository.TourImageRepository;
import com.moroccantour.service.TourService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/images")
@RequiredArgsConstructor
public class ImageController {

    private final TourService tourService;
    private final TourImageRepository tourImageRepository;
    private final TourImageMapper tourImageMapper;

    @PostMapping("/upload")
    @PreAuthorize("hasRole('ADMIN') or hasRole('GUIDE')")
    public ResponseEntity<TourImageResponse> uploadImage(@RequestParam("file") MultipartFile file,
                                                         @RequestParam(required = false) Long tourId) {
        if (tourId == null) {
            throw new BadRequestException("tourId is required to upload an image");
        }
        return ResponseEntity.ok(tourService.uploadImage(tourId, file));
    }

    @GetMapping("/library")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Page<TourImageResponse>> getImageLibrary(@PageableDefault Pageable pageable) {
        Page<TourImageResponse> page = tourImageRepository.findAll(pageable)
                .map(tourImageMapper::toResponse);
        return ResponseEntity.ok(page);
    }

    @DeleteMapping("/{imageId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteImage(@PathVariable Long imageId) {
        var image = tourImageRepository.findById(imageId)
                .orElseThrow(() -> new NotFoundException("Image not found"));
        tourImageRepository.delete(image);
        return ResponseEntity.noContent().build();
    }
}
