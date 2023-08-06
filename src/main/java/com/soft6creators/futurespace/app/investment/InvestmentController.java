package com.soft6creators.futurespace.app.investment;

import java.util.Optional;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.soft6creators.futurespace.app.account.Account;
import com.soft6creators.futurespace.app.account.AccountService;

@RestController
public class InvestmentController {
	@Autowired
	private InvestmentService investmentService;

	
	@CrossOrigin(maxAge = 3600)
	@RequestMapping(method = RequestMethod.POST, value = "/investment")
	public Investment addInvestment(@RequestBody Investment investment) {
		return investmentService.addInvestment(investment);
	}
	
	@CrossOrigin(maxAge = 3600)
	@RequestMapping("/investment/{investmentId}")
	public Optional<Investment> getInvestment(@PathVariable int investmentId) {
		return investmentService.getInvestMent(investmentId);
	}
	
	@CrossOrigin(maxAge = 3600)
	@RequestMapping("/account/{accountId}/investment")
	public Optional<Investment> getInvestmentByAccount(@PathVariable int accountId) {
		return investmentService.getInvestmentByAccount(accountId);
	}
	
	@CrossOrigin(maxAge = 3600)
	@RequestMapping("/investment/{investmentId}/isactive")
	public boolean cancelInvestment(@PathVariable int investmentId) {
		return investmentService.cancelInvestment(investmentId);
	}
	
	@CrossOrigin(maxAge = 3600)
	@RequestMapping("/investment/{investmentId}/roi/{roi}")
	public boolean investmentComplete(@PathVariable int investmentId, @PathVariable int roi) {
		return investmentService.investmentComplete(investmentId, roi);
	}

        @CrossOrigin(maxAge = 3600)
	@RequestMapping("/investments")
	public List<Investment> getInvestments() {
		return investmentService.getInvestments();
	}
}
