package com.moroccantour.mapper;

import com.moroccantour.dto.request.RegisterGuideRequest;
import com.moroccantour.dto.request.RegisterTouristRequest;
import com.moroccantour.dto.response.UserResponse;
import com.moroccantour.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(config = MapperConfig.class, uses = LanguageMapper.class)
public interface UserMapper {
    UserResponse toResponse(User user);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "password", ignore = true)
    @Mapping(target = "role", ignore = true)
    @Mapping(target = "active", ignore = true)
    @Mapping(target = "languages", ignore = true)
    User toEntity(RegisterTouristRequest request);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "password", ignore = true)
    @Mapping(target = "role", ignore = true)
    @Mapping(target = "active", ignore = true)
    @Mapping(source = "profileImagePath", target = "profileImage")
    @Mapping(target = "languages", ignore = true)
    User toEntity(RegisterGuideRequest request);
}
