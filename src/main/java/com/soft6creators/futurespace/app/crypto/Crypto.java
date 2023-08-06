package com.soft6creators.futurespace.app.crypto;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Crypto {
	@Id
	private int cryptoId;
	private String crypto;
	private String symbol;
	public int getCryptoId() {
		return cryptoId;
	}
	public void setCryptoId(int cryptoId) {
		this.cryptoId = cryptoId;
	}
	public String getCrypto() {
		return crypto;
	}
	public void setCrypto(String crypto) {
		this.crypto = crypto;
	}
	public String getSymbol() {
		return symbol;
	}
	public void setSymbol(String symbol) {
		this.symbol = symbol;
	}
	
	
}
