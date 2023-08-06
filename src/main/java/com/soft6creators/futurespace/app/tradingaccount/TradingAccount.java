package com.soft6creators.futurespace.app.tradingaccount;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import com.soft6creators.futurespace.app.trader.Trader;
import com.soft6creators.futurespace.app.user.User;

@Entity
public class TradingAccount {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int tradingAccountId;
	private int deposit;
	private int balance;
	private int profit;
	@ManyToOne
	private Trader trader;
	public int getTradingAccountId() {
		return tradingAccountId;
	}
	public void setTradingAccountId(int tradingAccountId) {
		this.tradingAccountId = tradingAccountId;
	}
	public int getDeposit() {
		return deposit;
	}
	public void setDeposit(int deposit) {
		this.deposit = deposit;
	}
	public int getBalance() {
		return balance;
	}
	public void setBalance(int balance) {
		this.balance = balance;
	}
	public int getProfit() {
		return profit;
	}
	public void setProfit(int profit) {
		this.profit = profit;
	}
	public Trader getTrader() {
		return trader;
	}
	public void setTrader(Trader trader) {
		this.trader = trader;
	}
	
	
}
