package com.moroccantour.config;

import com.moroccantour.entity.User;
import com.moroccantour.entity.enums.Role;
import com.moroccantour.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        userRepository.findByEmail("admin@moroccantours.com").ifPresentOrElse(
                existing -> log.info("Admin account already exists, skipping creation."),
                () -> {
                    User admin = User.builder()
                            .firstName("Admin")
                            .lastName("MoroccanTours")
                            .email("admin@moroccantours.com")
                            .password(passwordEncoder.encode("Admin1234!"))
                            .role(Role.ADMIN)
                            .active(true)
                            .build();
                    userRepository.save(admin);
                    log.info("Default admin created -> email: admin@moroccantours.com | password: Admin1234!");
                }
        );
    }
}
