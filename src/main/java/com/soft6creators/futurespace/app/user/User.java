package com.soft6creators.futurespace.app.user;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import com.soft6creators.futurespace.app.account.Account;
import com.soft6creators.futurespace.app.tradingaccount.TradingAccount;

@Entity
public class User {
	private String fullName;
	@Id
	@Column(length = 128)
	private String email;
	private String password;
	@ManyToOne
	private User referral;
	private String referralId;
	private boolean isActive;
	private String verificationCode;
	private String date;
	@OneToOne
	private Account account;
	@OneToOne
	private TradingAccount tradingAccount;
	
	private String role;
	private boolean isAccountNonLocked;
	private boolean isAccountNonExpired;
	private boolean isCredentialNonExpired;
	
	public User() {
		this.setAccountNonLocked(true);
		this.setAccountNonExpired(true);
		this.setCredentialNonExpired(true);
		this.setRole("USER");
	}


	




	
	public Account getAccount() {
		return account;
	}








	public void setAccount(Account account) {
		this.account = account;
	}








	public String getDate() {
		return date;
	}







	public void setDate(String date) {
		this.date = date;
	}






	
	

	public boolean isAccountNonLocked() {
		return isAccountNonLocked;
	}

	public void setAccountNonLocked(boolean isAccountNonLocked) {
		this.isAccountNonLocked = isAccountNonLocked;
	}

	public boolean isAccountNonExpired() {
		return isAccountNonExpired;
	}

	public void setAccountNonExpired(boolean isAccountNonExpired) {
		this.isAccountNonExpired = isAccountNonExpired;
	}

	public boolean isCredentialNonExpired() {
		return isCredentialNonExpired;
	}

	public void setCredentialNonExpired(boolean isCredentialNonExpired) {
		this.isCredentialNonExpired = isCredentialNonExpired;
	}

	public String getVerificationCode() {
		return verificationCode;
	}

	public void setVerificationCode(String verificationCode) {
		this.verificationCode = verificationCode;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public User getReferral() {
		return referral;
	}

	public void setReferral(User referral) {
		this.referral = referral;
	}

	public boolean isActive() {
		return isActive;
	}

	public void setActive(boolean isActive) {
		this.isActive = isActive;
	}

	public String getReferralId() {
		return referralId;
	}

	public void setReferralId(String referralId) {
		this.referralId = referralId;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public TradingAccount getTradingAccount() {
		return tradingAccount;
	}








	public void setTradingAccount(TradingAccount tradingAccount) {
		this.tradingAccount = tradingAccount;
	}
	
	
	
	
	
	
	
	
}
