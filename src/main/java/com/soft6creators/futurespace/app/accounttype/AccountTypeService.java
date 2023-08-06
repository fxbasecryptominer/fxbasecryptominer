package com.soft6creators.futurespace.app.accounttype;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountTypeService {

	@Autowired
	private AccountTypeRepository accountTypeRepository;
	
	public AccountType addAccountType(AccountType accountType) {
		return accountTypeRepository.save(accountType);
	}
	public List<AccountType> addAccountTypes(List<AccountType> accountTypes) {
		return (List<AccountType>) accountTypeRepository.saveAll(accountTypes);
	}
	
	public List<AccountType> getAccountTypes() {
		return (List<AccountType>) accountTypeRepository.findAll();
	}
}
