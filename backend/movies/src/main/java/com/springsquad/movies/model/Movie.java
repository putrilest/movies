package com.springsquad.movies.model;

import lombok.*;
import jakarta.persistence.*;


@Entity
@Table(name="movie")
@Getter
@Setter
public class Movie {
    @Id // primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="title")
    String title;

    @Column(name="director")
    String director;

    @Column(name="genre")
    String genre;

    @Column(name="url_image")
    String urlImage;
    
    @Column(name="duration")
    Long duration;

    @Column(name="rating")
    Double rating;

    public String getTitleAndGenre() {
        return title + "(" + genre + ")";
    }
}
