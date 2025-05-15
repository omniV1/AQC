package com.lunara.api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/about")
public class AboutController {

    @GetMapping
    public ResponseEntity<AboutContent> getAboutContent() {
        AboutContent content = new AboutContent(
            "I became passionate about postpartum care through my own experiences of navigating birth and the postpartum season three times.",
            "Currently pursuing certification as a postpartum doula through DONA International, I now offer non-clinical support to families in West Valley.",
            "My focus is on holistic, intuitive, and sustainable care. I believe everyone deserves to feel nurtured and supported in early parenthood."
        );
        return ResponseEntity.ok(content);
    }

    private static class AboutContent {
        private final String personalExperience;
        private final String certification;
        private final String philosophy;

        public AboutContent(String personalExperience, String certification, String philosophy) {
            this.personalExperience = personalExperience;
            this.certification = certification;
            this.philosophy = philosophy;
        }

        public String getPersonalExperience() {
            return personalExperience;
        }

        public String getCertification() {
            return certification;
        }

        public String getPhilosophy() {
            return philosophy;
        }
    }
} 