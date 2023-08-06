package com.soft6creators.futurespace.app.investment;

import java.util.Optional;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import com.soft6creators.futurespace.app.account.Account;
import com.soft6creators.futurespace.app.account.AccountRepository;
import com.soft6creators.futurespace.app.crypto.Crypto;
import com.soft6creators.futurespace.app.crypto.CryptoService;

@Service
public class InvestmentService {

	@Autowired
	private InvestmentRepository investmentRepository;
	@Autowired
	private AccountRepository accountRepository;
	@Autowired
	private CryptoService cryptoService;

	public Investment addInvestment(Investment investment) {
		Crypto crypto = cryptoService.getCryptoByName(investment.getCurrency().getCrypto());
		Optional<Account> account = accountRepository.findById(investment.getAccount().getAccountId());
		if (account.get().getAccountBalance() > 30) {
			Optional<Investment> currentInvestment = investmentRepository.findByAccountAccountId(account.get().getAccountId());
			account.get().setAccountBalance(investment.getInvestedAmount());
			accountRepository.save(account.get());
			investment.setCurrency(crypto);
			investment.setActive(true);
			investment.setInvestmentId(currentInvestment.get().getInvestmentId());
			return investmentRepository.save(investment);
		}
		else {
			investment.setCurrency(crypto);
			investment.setActive(true);
			
				if (account.get().getInterestPreference() == null) {
					account.get().setInterestPreference(investment.getCurrency());
					account.get().setInterestPreference(investment.getCurrency());
					accountRepository.save(account.get());
				}
				account.get().setAccountBalance(investment.getInvestedAmount());
				accountRepository.save(account.get());
			

			return investmentRepository.save(investment);
		}

	}
	
	public boolean cancelInvestment(int investmentId) {
		Optional<Investment> investment = investmentRepository.findById(investmentId);
		investment.get().setActive(false);
		investmentRepository.save(investment.get());
		return investment.get().isActive();
	}

	public Optional<Investment> getInvestmentByAccount(int accountId) {
		return investmentRepository.findByAccountAccountId(accountId);
	}

	public Optional<Investment> getInvestMent(int investmentId) {
		return investmentRepository.findById(investmentId);
	}
	
	public boolean investmentComplete(int investmentId, int roi) {
		Optional<Investment> investment = investmentRepository.findById(investmentId);
		investment.get().setActive(false);
		investmentRepository.save(investment.get());
		Optional<Account> account = accountRepository.findById(investment.get().getAccount().getAccountId());
		account.get().setAccountBalance(roi);
		accountRepository.save(account.get());
		return true;	
	}
        public List<Investment> getInvestments() {
		return (List<Investment>) investmentRepository.findAll();
	}
}
