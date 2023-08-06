package com.soft6creators.futurespace.app.withdrawal;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import com.soft6creators.futurespace.app.crypto.Crypto;
import com.soft6creators.futurespace.app.user.User;

@Entity
public class Withdrawal {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int withdrawalId;
	@ManyToOne
	private User user;
	private int amount;
	private String withdrawalStatus;
	@OneToOne
	private Crypto crypto;
	private String walletAddress;
	private String date;
	public int getWithdrawalId() {
		return withdrawalId;
	}
	public void setWithdrawalId(int withdrawalId) {
		this.withdrawalId = withdrawalId;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public int getAmount() {
		return amount;
	}
	public void setAmount(int amount) {
		this.amount = amount;
	}
	public String getWithdrawalStatus() {
		return withdrawalStatus;
	}
	public void setWithdrawalStatus(String withdrawalStatus) {
		this.withdrawalStatus = withdrawalStatus;
	}
	public Crypto getCrypto() {
		return crypto;
	}
	public void setCrypto(Crypto crypto) {
		this.crypto = crypto;
	}
	public String getWalletAddress() {
		return walletAddress;
	}
	public void setWalletAddres(String walletAddres) {
		this.walletAddress = walletAddres;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	
	
}
