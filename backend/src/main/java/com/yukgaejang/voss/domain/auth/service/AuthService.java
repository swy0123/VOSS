package com.yukgaejang.voss.domain.auth.service;

import com.yukgaejang.voss.domain.auth.service.dto.request.ConfirmEmailRequest;
import com.yukgaejang.voss.domain.auth.service.dto.request.SendEmailRequest;
import com.yukgaejang.voss.domain.member.repository.MemberRepository;
import com.yukgaejang.voss.domain.member.repository.entity.Member;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class AuthService implements UserDetailsService {
    private final MemberRepository memberRepository;
    private final JavaMailSender javaMailSender;

    @Value("${SMTP_EMAIL}")
    private String smtpUserName;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("해당 이메일이 존재하지 않습니다."));

        return org.springframework.security.core.userdetails.User.builder()
                .username(member.getEmail())
                .password(member.getPassword())
                .roles(member.getRole().name())
                .build();
    }

    public void sendEmail(SendEmailRequest sendEmailRequest) {
        String key = createKey();

        MimeMessage message = null;
        try {
            message = createMessage(sendEmailRequest.getEmail(), key);
            javaMailSender.send(message);
        } catch (MailException | MessagingException | UnsupportedEncodingException es) {
            es.printStackTrace();
            throw new IllegalArgumentException();
        }
    }

    public void confirmEmail(ConfirmEmailRequest confirmEmailRequest) {

    }

    private MimeMessage createMessage(String to, String key) throws MessagingException, UnsupportedEncodingException {
        MimeMessage message = javaMailSender.createMimeMessage();

        message.addRecipients(MimeMessage.RecipientType.TO, to);
        message.setSubject("Voss 회원가입 이메일 인증");

        String mmsg = "";
        mmsg += "<div style='margin:100px;'>";
        mmsg += "<h1> 안녕하세요</h1>";
        mmsg += "<h1> 모두가 성우가 되는 Voss 입니다</h1>";
        mmsg += "<br>";
        mmsg += "<p>아래 코드를 회원가입 창으로 돌아가 입력해주세요<p>";
        mmsg += "<br>";
        mmsg += "<p>많은 관심 감사합니다!<p>";
        mmsg += "<br>";
        mmsg += "<div align='center' style='border:1px solid black; font-family:verdana';>";
        mmsg += "<h3 style='color:blue;'>회원가입 인증 코드입니다.</h3>";
        mmsg += "<div style='font-size:130%'>";
        mmsg += "CODE : <strong>";
        mmsg += key + "</strong><div><br/> ";
        mmsg += "</div>";
        message.setText(mmsg, "utf-8", "html");
        message.setFrom(new InternetAddress(smtpUserName + "@naver.com", "Voss 관리자"));

        return message;
    }

    private String createKey() {
        StringBuffer key = new StringBuffer();
        Random rnd = new Random();

        for (int i = 0; i < 8; i++) {
            int index = rnd.nextInt(3);

            switch (index) {
                case 0:
                    key.append((char) ((int) (rnd.nextInt(26)) + 97));
                    break;
                case 1:
                    key.append((char) ((int) (rnd.nextInt(26)) + 65));
                    break;
                case 2:
                    key.append((rnd.nextInt(10)));
                    break;
            }
        }

        return key.toString();
    }
}
