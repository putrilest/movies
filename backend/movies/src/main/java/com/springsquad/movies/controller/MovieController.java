package com.springsquad.movies.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.springsquad.movies.model.Movie;
import com.springsquad.movies.repository.MovieRepository;

@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/movies")
@RestController
public class MovieController {
    private final MovieRepository repository;

    @Autowired
    public MovieController(MovieRepository repository) {
        this.repository = repository;
    }

    // get semua movie
    @RequestMapping()
    public List<Movie> getAll() {
        return repository.findAll();
    }

    // get movie berdasarkan ID
    @RequestMapping("{id}")
    public Object getById(@PathVariable Long id) {
        Movie movie = repository.findById(id).orElse(null);
        if (movie != null) {
            return movie;
        } else {
            return "Movie with ID " + id + " not found.";
        }
    }

    // buat movie
    @PostMapping
    public Movie create(@RequestBody Movie movie) {
        return repository.save(movie);
    }

    // edit movie berdasarkan ID
    @PutMapping("{id}")
    public String editById(@PathVariable Long id, @RequestBody Movie movie) {
        Movie existingmovie = repository.findById(id).orElse(null);
        if (existingmovie != null) {
            movie.setId(id); 
            repository.save(movie);
            return "Movie successfully updated.";
        } else {
            return "Movie with ID " + id + " not found.";
        }
    }

    // hapus movie berdasarkan ID
    @DeleteMapping("{id}")
    public String deleteById(@PathVariable Long id) {
        repository.deleteById(id);
        return "Movie success deleted.";
    }
}
