package br.com.cirros.dspesquisa.services;

import java.time.Instant;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.cirros.dspesquisa.dto.RecordDTO;
import br.com.cirros.dspesquisa.dto.RecordInsertDTO;
import br.com.cirros.dspesquisa.entities.Game;
import br.com.cirros.dspesquisa.entities.Record;
import br.com.cirros.dspesquisa.repositories.GameRepository;
import br.com.cirros.dspesquisa.repositories.RecordRepository;

@Service
public class RecordService {

	@Autowired
	private RecordRepository repository;
	
	@Autowired
	private GameRepository gameRepository;
	
	@Transactional
	public RecordDTO insert(RecordInsertDTO dto) {
		
		Record entity = new Record();
		
		entity.setName(dto.getName());
		entity.setAge(dto.getAge());
		entity.setMoment(Instant.now());
		
		Game game = gameRepository.getOne(dto.getGameId());
		entity.setGame(game);
		
		entity = repository.save(entity);
		return new RecordDTO(entity);
	}
}
