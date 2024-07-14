package com.springsquad.movies.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springsquad.movies.model.Movie;

public interface MovieRepository extends JpaRepository<Movie, Long>{
    
}
