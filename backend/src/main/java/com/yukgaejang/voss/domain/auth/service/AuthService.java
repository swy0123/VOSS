package com.yukgaejang.voss.domain.auth.service;

import com.yukgaejang.voss.domain.auth.exception.DuplicateEmailException;
import com.yukgaejang.voss.domain.auth.exception.NoEmailException;
import com.yukgaejang.voss.domain.auth.exception.WrongTokenException;
import com.yukgaejang.voss.domain.auth.repository.EmailRepository;
import com.yukgaejang.voss.domain.auth.repository.entity.Email;
import com.yukgaejang.voss.domain.auth.service.dto.request.ConfirmEmailRequest;
import com.yukgaejang.voss.domain.auth.service.dto.request.SendEmailRequest;
import com.yukgaejang.voss.domain.member.exception.MemberEmailDuplicateException;
import com.yukgaejang.voss.domain.member.exception.NoMemberException;
import com.yukgaejang.voss.domain.member.repository.MemberRepository;
import com.yukgaejang.voss.domain.member.repository.RefreshTokenRepository;
import com.yukgaejang.voss.domain.member.repository.entity.Member;
import com.yukgaejang.voss.domain.member.repository.entity.RefreshToken;
import com.yukgaejang.voss.domain.member.repository.entity.Role;
import com.yukgaejang.voss.domain.member.service.MemberService;
import com.yukgaejang.voss.global.jwt.service.JwtService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class AuthService implements UserDetailsService {
    private final JwtService jwtService;
    private final MemberRepository memberRepository;
    //private final MemberService memberService;
    private final JavaMailSender javaMailSender;
    private final EmailRepository emailRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();


    @Value("${SMTP_EMAIL}")
    private String smtpUserName;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Member member = memberRepository.findByEmailAndIsDeletedFalse(email)
                .orElseThrow(() -> new UsernameNotFoundException("해당 이메일이 존재하지 않습니다."));

        return org.springframework.security.core.userdetails.User.builder()
                .username(member.getEmail())
                .password(member.getPassword())
                .roles(member.getRole().name())
                .build();
    }

    public void logout(String refreshToken) {
        refreshTokenRepository.deleteById(refreshToken);
    }

    public void sendEmail(SendEmailRequest sendEmailRequest) {
        if (memberRepository.existsByEmail(sendEmailRequest.getEmail())) {
            throw new DuplicateEmailException("중복 이메일");
        }
        String key = createKey();

        MimeMessage message = null;
        try {
            message = createMessage(sendEmailRequest.getEmail(), key);
            emailRepository.deleteByEmail(sendEmailRequest.getEmail());
            emailRepository.save(new Email(sendEmailRequest.getEmail(), key));
            javaMailSender.send(message);
        } catch (MailException | MessagingException | UnsupportedEncodingException es) {
            es.printStackTrace();
            throw new IllegalArgumentException();
        }
    }

    public void sendPasswordEmail(SendEmailRequest sendEmailRequest) {
        String email =sendEmailRequest.getEmail();
        if (!memberRepository.existsByEmail(email)) {
            throw new NoEmailException("없는 이메일");
        }
        String key = createKey();

        MimeMessage message = null;
        try {
            message = createPasswordMessage(email, key);
            updateMemberPassword(email, key);
            javaMailSender.send(message);
        } catch (MailException | MessagingException | UnsupportedEncodingException es) {
            es.printStackTrace();
            throw new IllegalArgumentException();
        }
    }

    public void confirmEmail(ConfirmEmailRequest confirmEmailRequest) {
        Email email = emailRepository.findByEmail(confirmEmailRequest.getEmail()).orElseThrow(() ->
                new NoEmailException("없는 사용자입니다.")
        );

        if (!confirmEmailRequest.getToken().equals(email.getToken())) {
            throw new WrongTokenException("잘못된 인증입니다");
        }

        emailRepository.deleteByEmail(email.getEmail());
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

    private MimeMessage createPasswordMessage(String to, String key) throws MessagingException, UnsupportedEncodingException {
        MimeMessage message = javaMailSender.createMimeMessage();

        message.addRecipients(MimeMessage.RecipientType.TO, to);
        message.setSubject("Voss 임시 비밀번호");

        String mmsg = "";
        mmsg += "<div style='margin:100px;'>";
        mmsg += "<h1> 안녕하세요</h1>";
        mmsg += "<h1> 모두가 성우가 되는 Voss 입니다</h1>";
        mmsg += "<br>";
        mmsg += "<p>귀하의 임시 비밀번호가 아래와 같이 변경되었습니다.<p>";
        mmsg += "<br>";
        mmsg += "<p>많은 관심 감사합니다!<p>";
        mmsg += "<br>";
        mmsg += "<div align='center' style='border:1px solid black; font-family:verdana';>";
        mmsg += "<h3 style='color:blue;'>임시 비밀 번호입니다.</h3>";
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

    public HttpHeaders refresh(HttpServletRequest request) {
        String refreshToken = jwtService.extractRefreshToken(request).get();
        String email = refreshTokenRepository.findById(refreshToken).get().getEmail();
        String newRefreshToken = jwtService.createRefreshToken();
        refreshTokenRepository.deleteById(newRefreshToken);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", jwtService.createAccessToken(email));
        headers.add("Authorization-refresh", newRefreshToken);
        refreshTokenRepository.save(new RefreshToken(newRefreshToken, email));

        return headers;
    }

    private void updateMemberPassword(String email, String newKey) {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new NoMemberException("존재하지 않는 이메일입니다."));

        Member newMem = Member.builder()
                .id(member.getId())
                .email(member.getEmail())
                .password(newKey)
                .nickname(member.getNickname())
                .imageUrl(member.getImageUrl())
                .role(member.getRole())
                .build();

        newMem.passwordEncode(passwordEncoder);
        memberRepository.save(newMem);
    }
}
