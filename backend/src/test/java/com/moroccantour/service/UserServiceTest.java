package com.moroccantour.service;

import com.moroccantour.dto.request.UpdateUserStatusRequest;
import com.moroccantour.dto.response.UserResponse;
import com.moroccantour.entity.User;
import com.moroccantour.entity.enums.Role;
import com.moroccantour.exception.NotFoundException;
import com.moroccantour.mapper.UserMapper;
import com.moroccantour.repository.LanguageRepository;
import com.moroccantour.repository.UserRepository;
import com.moroccantour.service.impl.UserServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private LanguageRepository languageRepository;

    @Mock
    private UserMapper userMapper;

    @InjectMocks
    private UserServiceImpl userService;

    private User testUser;
    private UserResponse testUserResponse;

    @BeforeEach
    void setUp() {
        testUser = User.builder()
                .id(1L)
                .email("test@example.com")
                .firstName("Test")
                .lastName("User")
                .role(Role.TOURIST)
                .active(true)
                .build();

        testUserResponse = new UserResponse(
                1L,
                "Test",
                "User",
                "test@example.com",
                "TOURIST",
                true,
                null,
                null,
                null,
                null,
                null,
                null,
                null
        );
    }

    @Test
    void getProfile_Success() {
        // Arrange
        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(testUser));
        when(userMapper.toResponse(testUser)).thenReturn(testUserResponse);

        // Act
        UserResponse response = userService.getProfile("test@example.com");

        // Assert
        assertNotNull(response);
        assertEquals("test@example.com", response.email());
        verify(userRepository).findByEmail("test@example.com");
    }

    @Test
    void getProfile_NotFound() {
        // Arrange
        when(userRepository.findByEmail("nonexistent@example.com")).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(NotFoundException.class, () -> userService.getProfile("nonexistent@example.com"));
    }

    @Test
    void updateStatus_Success() {
        // Arrange
        UpdateUserStatusRequest request = new UpdateUserStatusRequest(false);
        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));
        when(userMapper.toResponse(any(User.class))).thenReturn(testUserResponse);

        // Act
        userService.updateStatus(1L, request);

        // Assert
        assertFalse(testUser.isActive());
        verify(userRepository).save(testUser);
    }

    @Test
    void approveGuide_Success() {
        // Arrange
        testUser.setRole(Role.GUIDE);
        testUser.setActive(false);
        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));
        when(userMapper.toResponse(testUser)).thenReturn(testUserResponse);

        // Act
        userService.approveGuide(1L);

        // Assert
        assertTrue(testUser.isActive());
        verify(userRepository).save(testUser);
    }

    @Test
    void deleteUser_CallsRepository() {
        // Act
        userService.deleteUser(1L);

        // Assert
        verify(userRepository).deleteById(1L);
    }
}
