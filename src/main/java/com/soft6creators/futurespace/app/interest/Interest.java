package com.soft6creators.futurespace.app.interest;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Interest {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int interestId;
	private String currencyAmount;
	private String numberOfDays;
	private String interestPercent;
	private String interestPercent2;
	public int getInterestId() {
		return interestId;
	}
	public void setInterestId(int interestId) {
		this.interestId = interestId;
	}
	public String getCurrencyAmount() {
		return currencyAmount;
	}
	public void setCurrencyAmount(String currencyAmount) {
		this.currencyAmount = currencyAmount;
	}
	public String getNumberOfDays() {
		return numberOfDays;
	}
	public void setNumberOfDays(String numberOfDays) {
		this.numberOfDays = numberOfDays;
	}
	public String getInterestPercent() {
		return interestPercent;
	}
	public void setInterestPercent(String interestPercent) {
		this.interestPercent = interestPercent;
	}
	public String getInterestPercent2() {
		return interestPercent2;
	}
	public void setInterestPercent2(String interestPercent2) {
		this.interestPercent2 = interestPercent2;
	}
	
	
	
	
}
