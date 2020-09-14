package br.com.cirros.dspesquisa.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.cirros.dspesquisa.entities.Game;

public interface GameRepository extends JpaRepository<Game, Long> {

}
