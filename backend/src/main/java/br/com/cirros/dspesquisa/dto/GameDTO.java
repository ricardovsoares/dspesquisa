package br.com.cirros.dspesquisa.dto;

import java.io.Serializable;

import br.com.cirros.dspesquisa.entities.Game;
import br.com.cirros.dspesquisa.entities.enums.Platform;

public class GameDTO implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private Long id;
	private String title;
	private Platform platform;
	
	public GameDTO() {
	}
	
	public GameDTO(Game entity) {
		this.id = entity.getId();
		this.title = entity.getTitle();
		this.platform = entity.getPlatform();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Platform getPlatform() {
		return platform;
	}

	public void setPlatform(Platform platform) {
		this.platform = platform;
	}
}
