package br.com.cirros.dspesquisa.repositories;

import java.time.Instant;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import br.com.cirros.dspesquisa.entities.Record;

@Repository
public interface RecordRepository extends JpaRepository<Record, Long> {

	//Tipo de query especial para buscar as informações no objeto Record
	//coalesce garante que o valor nulo será reconhecido pelo Postgress
	@Query("SELECT obj FROM Record obj WHERE" 
			+ " (coalesce(:minDate, null) IS NULL OR obj.moment >= :minDate) AND "
			+ " (coalesce(:maxDate, null) IS NULL OR obj.moment <= :maxDate)")
	Page<Record> findByMoments(Instant minDate, Instant maxDate, Pageable pageable);
}