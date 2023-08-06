package com.soft6creators.futurespace.app.investment;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import com.soft6creators.futurespace.app.account.Account;
import com.soft6creators.futurespace.app.crypto.Crypto;

@Entity
public class Investment {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int investmentId;
	@ManyToOne
	private Account account;
	private int investedAmount;
	private int days;
	private boolean isActive;
	private String startDate;
	private String endDate;
	private int percentage;
	@ManyToOne
	private Crypto currency;
	public int getInvestmentId() {
		return investmentId;
	}
	public void setInvestmentId(int investmentId) {
		this.investmentId = investmentId;
	}
	public Account getAccount() {
		return account;
	}
	public void setAccount(Account account) {
		this.account = account;
	}
	public int getInvestedAmount() {
		return investedAmount;
	}
	public void setInvestedAmount(int investedAmount) {
		this.investedAmount = investedAmount;
	}
	
	
	public Crypto getCurrency() {
		return currency;
	}
	public void setCurrency(Crypto currency) {
		this.currency = currency;
	}
	public int getDays() {
		return days;
	}
	public void setDays(int days) {
		this.days = days;
	}
	public boolean isActive() {
		return isActive;
	}
	public void setActive(boolean isActive) {
		this.isActive = isActive;
	}
	public String getStartDate() {
		return startDate;
	}
	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}
	public String getEndDate() {
		return endDate;
	}
	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}
	public int getPercentage() {
		return percentage;
	}
	public void setPercentage(int percentage) {
		this.percentage = percentage;
	}
	
	
	
	
}
