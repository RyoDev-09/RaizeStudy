package com.raize.study.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestClient;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ai")
public class AiController {

    @Value("${app.geminiApiKey:}")
    private String geminiApiKey;

    @Value("${app.geminiModel:gemini-flash-lite-latest}")
    private String geminiModel;

    private final RestClient restClient = RestClient.create();

    public record ReviewRequest(String code, String output, String instructions) {}
    public record ReviewResponse(boolean pass, String review) {}

    // DTOs for Gemini API
    public record GeminiRequest(List<Content> contents, GenerationConfig generationConfig) {
        public record Content(String role, List<Part> parts) {
            public record Part(String text) {}
        }
        public record GenerationConfig(double temperature) {}
    }

    public record GeminiResponse(List<Candidate> candidates) {
        public record Candidate(Content content) {
            public record Content(List<Part> parts) {
                public record Part(String text) {}
            }
        }
    }

    @PostMapping("/review")
    public ResponseEntity<?> reviewCode(@RequestBody ReviewRequest request) {
        if (geminiApiKey == null || geminiApiKey.trim().isEmpty()) {
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
                    .body(Map.of("error", "AI Reviewer chưa được cấu hình trên server (thiếu GEMINI_API_KEY). Vui lòng liên hệ quản trị viên!"));
        }

        try {
            String systemPrompt = """
                Bạn là AI Code Reviewer cho các bài tập Java cơ bản.

                Mỗi khi người dùng gửi đề bài và code, hãy làm theo quy trình bắt buộc:

                1. Đọc kỹ yêu cầu đề bài:
                   - Xác định input/biến đầu vào.
                   - Xác định điều kiện cần xử lý.
                   - Xác định output mong muốn.
                   - Không tự thay đổi yêu cầu đề bài.

                2. Kiểm tra lỗi code:
                   - Lỗi cú pháp Java.
                   - Lỗi logic điều kiện if/else.
                   - Lỗi toán tử: &&, ||, !, ==, =, %, ?:.
                   - Lỗi thứ tự ưu tiên toán tử.
                   - Lỗi sai kiểu dữ liệu.
                   - Lỗi biến chưa khởi tạo hoặc không cần thiết.
                   - Lỗi format output so với yêu cầu.

                3. Tự kiểm thử bằng các test case:
                   - Test case đúng theo dữ liệu đề bài.
                   - Test case ở ranh giới điều kiện.
                   - Test case nhỏ hơn ranh giới.
                   - Test case lớn hơn ranh giới.
                   - Test case đặc biệt nếu có.

                4. Với mỗi test case, trình bày:
                   - Input.
                   - Kết quả code hiện tại sẽ trả về.
                   - Kết quả đúng theo đề bài.
                   - Kết luận PASS hoặc FAIL.

                5. Nếu code sai:
                   - Chỉ rõ dòng/biểu thức sai.
                   - Giải thích ngắn gọn tại sao sai.
                   - Đưa ra code đã sửa hoàn chỉnh.
                   - Không chỉ đưa đáp án; phải giải thích logic.

                6. Nếu code đúng:
                   - Xác nhận code đúng.
                   - Gợi ý cách viết ngắn gọn hoặc dễ đọc hơn nếu có.
                   - Vẫn liệt kê ít nhất 3 test case đã kiểm tra.

                7. Format câu trả lời luôn theo mẫu:

                ## Đánh giá
                - PASS / FAIL
                - Lý do ngắn gọn.

                ## Lỗi phát hiện
                - ...

                ## Tự kiểm thử
                | Test case | Input | Kết quả hiện tại | Kết quả mong đợi | Kết luận |
                |---|---|---|---|---|

                ## Code đã sửa / Code đề xuất
                ```java
                // code
                ```
                """;

            String userPrompt = String.format("""
                ĐỀ BÀI:
                %s

                MÃ NGUỒN CỦA HỌC VIÊN:
                ```java
                %s
                ```

                KẾT QUẢ CHẠY THỬ MÔ PHỎNG (NẾU CÓ):
                %s
                """, 
                request.instructions(), 
                request.code(), 
                request.output() != null && !request.output().trim().isEmpty() ? request.output() : "Không có output"
            );

            // Construct Gemini Request
            GeminiRequest geminiReq = new GeminiRequest(
                List.of(new GeminiRequest.Content("user", List.of(new GeminiRequest.Content.Part(systemPrompt + "\n\n---\n\n" + userPrompt)))),
                new GeminiRequest.GenerationConfig(0.1)
            );

            // Call Gemini API
            String url = "https://generativelanguage.googleapis.com/v1beta/models/" + geminiModel + ":generateContent?key=" + geminiApiKey;
            GeminiResponse geminiRes = restClient.post()
                    .uri(url)
                    .body(geminiReq)
                    .retrieve()
                    .body(GeminiResponse.class);

            if (geminiRes == null || geminiRes.candidates() == null || geminiRes.candidates().isEmpty()) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(Map.of("error", "Không nhận được phản hồi hợp lệ từ Gemini API."));
            }

            String aiResponseText = geminiRes.candidates().get(0).content().parts().get(0).text();

            // Phân tích xem PASS hay FAIL
            String firstLines = aiResponseText.lines().limit(10).reduce("", (a, b) -> a + "\n" + b);
            boolean isPass = firstLines.toLowerCase().contains("- pass");

            return ResponseEntity.ok(new ReviewResponse(isPass, aiResponseText));

        } catch (org.springframework.web.client.RestClientResponseException e) {
            System.err.println("Gemini API Error details: " + e.getResponseBodyAsString());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Lỗi từ Gemini API: " + e.getResponseBodyAsString()));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Lỗi trong quá trình AI chấm điểm: " + e.getMessage()));
        }
    }
}
