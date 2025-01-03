package com.lephuocviet.forum.service.implement;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lephuocviet.forum.service.IAIService;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AIService implements IAIService {

    @Value("${AI_API.URL}")
    String AI_URL;

    @Value("${AI_API.KEY}")
    String API_KEY;

    RestTemplate restTemplate = new RestTemplate();
    ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public boolean checkPostIsLanguage(String language, String title, String content) {
        // Tạo header
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + API_KEY);
        headers.setContentType(MediaType.APPLICATION_JSON);

        // Tạo nội dung đầu vào
        String inputText = String.format(
                "This is a forum for sharing knowledge about languages. "
                        + "Given the title \"%s\" and content \"%s\", does this article meet the following criteria: "
                        + "1) It is written in the %s language; "
                        + "2) The title and content are appropriate for a forum about sharing knowledge of languages; "
                        + "3) The content does not include discussions about political violence or idle chatter; "
                        + "4) It is a guide, a question, a shares knowledge, a problem about language. "
                        + "If any of the above conditions are false, return false. Please answer true or false, no explanation needed, only true or false. "
                        + "Pls NO EXPLANATION answer true or false.",
                title, content, language
        );


        // Body request dưới dạng JSON
        String requestBody = String.format(
                "{ \"inputs\": \"%s\" }",
                inputText.replace("\"", "\\\"") // Escape ký tự nháy kép nếu cần
        );

        HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);

        try {
            // Gửi yêu cầu tới API
            ResponseEntity<String> response = restTemplate.exchange(
                    AI_URL,
                    HttpMethod.POST,
                    entity,
                    String.class
            );

            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                JsonNode responseBody = objectMapper.readTree(response.getBody());
                String aiResponse = responseBody.get(0).get("generated_text").asText().split("\n")[0].trim();
                System.out.println(aiResponse);
                String[] words = aiResponse.split("\\s+");
                int length = words.length;
                String lastSixWords = "";
                for (int i = Math.max(0, length - 6); i < length; i++) {
                    lastSixWords += words[i] + " ";
                }
                lastSixWords = lastSixWords.trim();
                System.out.println(lastSixWords);
                if (lastSixWords.contains("True")) {
                    return true;
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return false;
    }
}
