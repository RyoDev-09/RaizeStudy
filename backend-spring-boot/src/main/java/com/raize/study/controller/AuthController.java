package com.raize.study.controller;

import com.raize.study.security.CustomUserDetails;
import com.raize.study.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    public record AuthRequest(String username, String password) {}

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody AuthRequest request) {
        if (request.username() == null || request.username().trim().isEmpty() ||
            request.password() == null || request.password().trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Vui lòng điền đầy đủ tài khoản và mật khẩu!"));
        }

        try {
            userService.register(request.username(), request.password());
            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("message", "Đăng ký tài khoản thành công!"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", "Đã xảy ra lỗi máy chủ!"));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        if (request.username() == null || request.username().trim().isEmpty() ||
            request.password() == null || request.password().trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Vui lòng điền đầy đủ tài khoản và mật khẩu!"));
        }

        try {
            StringBuilder usernameOut = new StringBuilder();
            StringBuilder userIdOut = new StringBuilder();
            String token = userService.login(request.username(), request.password(), usernameOut, userIdOut);
            
            return ResponseEntity.ok(Map.of(
                    "message", "Đăng nhập thành công!",
                    "token", token,
                    "user", Map.of(
                            "id", Integer.parseInt(userIdOut.toString()),
                            "username", usernameOut.toString()
                    )
            ));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", "Đã xảy ra lỗi máy chủ!"));
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> getMe(@AuthenticationPrincipal CustomUserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Chưa xác thực!"));
        }
        return ResponseEntity.ok(Map.of(
                "user", Map.of(
                        "id", userDetails.getId(),
                        "username", userDetails.getUsername()
                )
        ));
    }
}
