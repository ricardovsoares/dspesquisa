package br.com.cirros.dspesquisa.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.cirros.dspesquisa.entities.Record;

public interface RecordRepository extends JpaRepository<Record, Long> {

}
