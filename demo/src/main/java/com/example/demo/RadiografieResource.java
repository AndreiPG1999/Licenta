package com.example.demo;

import com.example.demo.model.Radiografie;
import com.example.demo.repo.RadiografieRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/radiografie")
public class RadiografieResource {

    @Autowired
    private RadiografieRepo radiografieRepo;

    @PostMapping("/upload/{email}/{id}")
    public ResponseEntity<Radiografie> uploadRadiografie(@RequestParam("imageFile")MultipartFile file,
                                                         @PathVariable("email") String email,
                                                         @PathVariable("id") Long id) throws IOException {
        Radiografie rad = new Radiografie(file.getOriginalFilename(), file.getContentType(), compressBytes(file.getBytes()));
        rad.setEmail(email);
        rad.setId_doctor(id);
        radiografieRepo.save(rad);
        return new ResponseEntity<>(rad, HttpStatus.CREATED);
    }

    @GetMapping("/get/{name}")
    public Radiografie getRadiografie(@PathVariable("name") String name) {
        final Optional<Radiografie> retrievedRadiografie = radiografieRepo.findRadiografieByName(name);
        Radiografie rad = new Radiografie(retrievedRadiografie.get().getName(), retrievedRadiografie.get().getType(),
                decompressBytes(retrievedRadiografie.get().getPicByte()));
        return rad;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Radiografie>> getAll() {
        List<Radiografie> radiografii = radiografieRepo.findAll();
        return new ResponseEntity<>(radiografii, HttpStatus.OK);
    }

    public static byte[] compressBytes(byte[] data) {
        Deflater deflater = new Deflater();
        deflater.setInput(data);
        deflater.finish();

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        while (!deflater.finished()) {
            int count = deflater.deflate(buffer);
            outputStream.write(buffer, 0, count);
        }
        try {
            outputStream.close();
        } catch (IOException e) {
        }
        System.out.println("Compressed Image Byte Size - " + outputStream.toByteArray().length);

        return outputStream.toByteArray();
    }

    public static byte[] decompressBytes(byte[] data) {
        Inflater inflater = new Inflater();
        inflater.setInput(data);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        try {
            while (!inflater.finished()) {
                int count = inflater.inflate(buffer);
                outputStream.write(buffer, 0, count);
            }
            outputStream.close();
        } catch (IOException ioe) {
        } catch (DataFormatException e) {
        }
        return outputStream.toByteArray();
    }
}
