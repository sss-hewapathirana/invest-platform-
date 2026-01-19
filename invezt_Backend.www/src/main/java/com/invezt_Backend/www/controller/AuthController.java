package com.invezt_Backend.www.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.invezt_Backend.www.config.JwtTokenProvider;
import com.invezt_Backend.www.dto.auth.AuthResponseDTO;
import com.invezt_Backend.www.dto.auth.LoginRequestDTO;
import com.invezt_Backend.www.dto.auth.SignupRequestDTO;
import com.invezt_Backend.www.dto.response.ApiResponse;
import com.invezt_Backend.www.entity.User;
import com.invezt_Backend.www.service.UserService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final JwtTokenProvider jwtTokenProvider;

    public AuthController(UserService userService, JwtTokenProvider jwtTokenProvider) {
        this.userService = userService;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @PostMapping("/signup")
    public ApiResponse<AuthResponseDTO> signup(@RequestBody SignupRequestDTO dto) {
        User user = userService.registerUser(dto);
        String token = jwtTokenProvider.generateToken(user.getEmail(), user.getRole().name());

        return ApiResponse.success(new AuthResponseDTO(token, user.getEmail(), user.getRole().name()));
    }

    @PostMapping("/login")
    public ApiResponse<AuthResponseDTO> login(@RequestBody LoginRequestDTO dto) {
        User user = userService.authenticateUser(dto);
        String token = jwtTokenProvider.generateToken(user.getEmail(), user.getRole().name());

        return ApiResponse.success(new AuthResponseDTO(token, user.getEmail(), user.getRole().name()));
    }
}
