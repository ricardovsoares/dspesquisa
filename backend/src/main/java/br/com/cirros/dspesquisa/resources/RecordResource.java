package br.com.cirros.dspesquisa.resources;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.cirros.dspesquisa.dto.RecordDTO;
import br.com.cirros.dspesquisa.dto.RecordInsertDTO;
import br.com.cirros.dspesquisa.services.RecordService;

@RestController
@RequestMapping(value = "/records")
public class RecordResource {

	//Faz a instanciação do gameRepository automaticamente. Injeção de dependência
	@Autowired
	private RecordService service;	
	
	@PostMapping
	public ResponseEntity<RecordDTO> insert(@RequestBody RecordInsertDTO dto){
		
		RecordDTO newDTO = service.insert(dto);
		return ResponseEntity.ok().body(newDTO);
	}
}
