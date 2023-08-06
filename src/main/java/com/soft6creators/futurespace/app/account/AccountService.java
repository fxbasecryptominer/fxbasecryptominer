package com.soft6creators.futurespace.app.account;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountService {
	@Autowired
	private AccountRepository accountRepository;
	
	public Account addAccount(Account account) {
		return accountRepository.save(account);
	}
	
	public Optional<Account> getAccount(int accountId) {
		return accountRepository.findById(accountId);
	}
	
	public List<Account> getAccounts() {
		return (List<Account>) accountRepository.findAll();
	}
}
