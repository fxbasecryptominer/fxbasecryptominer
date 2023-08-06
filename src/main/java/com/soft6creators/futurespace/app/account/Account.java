package com.soft6creators.futurespace.app.account;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import com.soft6creators.futurespace.app.crypto.Crypto;
import com.soft6creators.futurespace.app.investment.Investment;
import com.soft6creators.futurespace.app.user.User;

@Entity
public class Account {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int accountId;
	@OneToOne
	private Crypto interestPreference;
	private int accountBalance;
	public int getAccountId() {
		return accountId;
	}
	public void setAccountId(int accountId) {
		this.accountId = accountId;
	}
	public Crypto getInterestPreference() {
		return interestPreference;
	}
	public void setInterestPreference(Crypto interestPreference) {
		this.interestPreference = interestPreference;
	}
	public int getAccountBalance() {
		return accountBalance;
	}
	public void setAccountBalance(int accountBalance) {
		this.accountBalance = accountBalance;
	}
	
	
}
