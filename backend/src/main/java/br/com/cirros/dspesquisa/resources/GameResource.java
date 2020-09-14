package br.com.cirros.dspesquisa.resources;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.cirros.dspesquisa.dto.GameDTO;
import br.com.cirros.dspesquisa.entities.Game;
import br.com.cirros.dspesquisa.services.GameService;

@RestController
@RequestMapping(value = "/games")
public class GameResource {

	//Faz a instanciação do gameRepository automaticamente. Injeção de dependência
	@Autowired
	private GameService service;	
	
	@GetMapping
	public ResponseEntity<List<GameDTO>> findAll(){
		List<GameDTO> list = service.findAll();
		return ResponseEntity.ok().body(list);
	}
}
