package com.raize.study.service;

import com.raize.study.entity.User;
import com.raize.study.entity.UserSetting;
import com.raize.study.repository.UserRepository;
import com.raize.study.repository.UserSettingRepository;
import com.raize.study.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserSettingRepository userSettingRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtils jwtUtils;

    @Transactional
    public void register(String username, String password) {
        if (userRepository.existsByUsername(username)) {
            throw new IllegalArgumentException("Tên tài khoản này đã tồn tại!");
        }

        User user = User.builder()
                .username(username)
                .password(passwordEncoder.encode(password))
                .build();

        user = userRepository.save(user);

        // Khởi tạo cài đặt mặc định cho người dùng mới
        UserSetting settings = UserSetting.builder()
                .userId(user.getId())
                .lastLessonId(1)
                .lastExerciseId(null)
                .build();
        userSettingRepository.save(settings);
    }

    public String login(String username, String password, StringBuilder outUsername, StringBuilder outUserId) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("Tài khoản hoặc mật khẩu không chính xác!"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new IllegalArgumentException("Tài khoản hoặc mật khẩu không chính xác!");
        }

        outUsername.append(user.getUsername());
        outUserId.append(user.getId());
        return jwtUtils.generateJwtToken(user.getId(), user.getUsername());
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}
