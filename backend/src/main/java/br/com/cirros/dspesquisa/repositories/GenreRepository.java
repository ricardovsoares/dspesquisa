package br.com.cirros.dspesquisa.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.cirros.dspesquisa.entities.Genre;

public interface GenreRepository extends JpaRepository<Genre, Long> {

}
