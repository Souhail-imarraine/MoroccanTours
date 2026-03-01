package com.moroccantour.mapper;

import com.moroccantour.dto.request.CreateBookingRequest;
import com.moroccantour.dto.response.BookingResponse;
import com.moroccantour.entity.Booking;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(config = MapperConfig.class, uses = {UserMapper.class, TourMapper.class})
public interface BookingMapper {
    BookingResponse toResponse(Booking booking);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "tour", ignore = true)
    @Mapping(target = "tourist", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "bookingDate", ignore = true)
    @Mapping(target = "totalPrice", ignore = true)
    Booking toEntity(CreateBookingRequest request);
}
