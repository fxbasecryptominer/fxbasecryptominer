package com.soft6creators.futurespace.app.trader;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Trader {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int traderId;
	private String traderName;
	private int winRate;
	private int profitShare;
	private byte[] image;
	public int getTraderId() {
		return traderId;
	}
	public void setTraderId(int traderId) {
		this.traderId = traderId;
	}
	public String getTraderName() {
		return traderName;
	}
	public void setTraderName(String traderName) {
		this.traderName = traderName;
	}
	public int getWinRate() {
		return winRate;
	}
	public void setWinRate(int winRate) {
		this.winRate = winRate;
	}
	public int getProfitShare() {
		return profitShare;
	}
	public void setProfitShare(int profitShare) {
		this.profitShare = profitShare;
	}
	public byte[] getImage() {
		return image;
	}
	public void setImage(byte[] image) {
		this.image = image;
	}
	
	
	
	
}
