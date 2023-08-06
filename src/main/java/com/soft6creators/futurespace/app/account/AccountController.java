package com.soft6creators.futurespace.app.account;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AccountController {
	
	@Autowired
	private AccountService accountService;
	@CrossOrigin(maxAge = 3600)
	@RequestMapping(method = RequestMethod.POST, value = "/account")
	public Account addAccount(@RequestBody Account account) {
		return accountService.addAccount(account);
	}
	@CrossOrigin(maxAge = 3600)
	@RequestMapping("/account/{accountId}")
	public Optional<Account> getAccount(@PathVariable int accountId) {
		return accountService.getAccount(accountId);
	}
	@CrossOrigin(maxAge = 3600)
	@RequestMapping("/account")
	public List<Account> getAccounts() {
		return accountService.getAccounts();
	}
	@CrossOrigin(maxAge = 3600)
	@RequestMapping(method = RequestMethod.PUT, value = "/account")
	public Account updateAccount(@RequestBody Account account) {
		return accountService.addAccount(account);
	}
	
}
