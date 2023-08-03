package com.yukgaejang.voss.domain.practice.serivce;

import com.yukgaejang.voss.domain.practice.serivce.dto.response.ClassifyResponse;
import com.yukgaejang.voss.infra.classify.ClassifyClient;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.WebClient;

import javax.sound.sampled.*;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

@Service
@RequiredArgsConstructor
public class ActServiceImpl implements ActService {
    private final ClassifyClient classifyClient;

    @Override
    public ClassifyResponse analysis(MultipartFile file) {
        try {
            String text = new String(file.getBytes(), "UTF-8");

            File outputWavFile = new File("output.wav");
            if (outputWavFile.exists()) {
                outputWavFile.delete();
            }

            String outputPath = "output.wav";
            convertTextToWavFile(text, outputPath);
        } catch (IOException | UnsupportedAudioFileException | LineUnavailableException e) {
            System.out.println(e.getMessage());
        }
        return classifyClient.classify(new File("output.wav"));
    }

    private void convertTextToWavFile(String text, String outputPath) throws IOException, UnsupportedAudioFileException, LineUnavailableException {
        AudioFormat audioFormat = new AudioFormat(44100, 16, 1, true, false);
        byte[] audioData = text.getBytes();

        try (AudioInputStream audioInputStream = new AudioInputStream(new ByteArrayInputStream(audioData), audioFormat, audioData.length)) {
            AudioSystem.write(audioInputStream, AudioFileFormat.Type.WAVE, new File(outputPath));
        }
    }
}
