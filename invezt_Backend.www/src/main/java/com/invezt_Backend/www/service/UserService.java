package com.invezt_Backend.www.service;

import java.util.Collections;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.invezt_Backend.www.dto.auth.LoginRequestDTO;
import com.invezt_Backend.www.dto.auth.SignupRequestDTO;
import com.invezt_Backend.www.entity.User;
import com.invezt_Backend.www.enums.ErrorCode;
import com.invezt_Backend.www.enums.Role;
import com.invezt_Backend.www.exception.InveztException;
import com.invezt_Backend.www.repository.UserRepository;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User registerUser(SignupRequestDTO dto) {
        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new InveztException(ErrorCode.USER_ALREADY_EXISTS);
        }

        User user = User.builder()
                .email(dto.getEmail())
                .password(passwordEncoder.encode(dto.getPassword()))
                .fullName(dto.getFullName())
                .role(Role.USER)
                .build();

        return userRepository.save(user);
    }

    public User authenticateUser(LoginRequestDTO dto) {
        User user = userRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new InveztException(ErrorCode.INVALID_CREDENTIALS));

        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            throw new InveztException(ErrorCode.INVALID_CREDENTIALS);
        }

        return user;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + email));

        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                Collections.singletonList(new org.springframework.security.core.authority.SimpleGrantedAuthority(
                        "ROLE_" + user.getRole().name())));
    }
}
