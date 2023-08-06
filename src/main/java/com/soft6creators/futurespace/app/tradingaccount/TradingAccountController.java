package com.soft6creators.futurespace.app.tradingaccount;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TradingAccountController {

	@Autowired
	TradingAccountService tradingAccountService;
	
	@CrossOrigin(maxAge = 3600)
	@RequestMapping(method = RequestMethod.POST, value = "/tradingaccount")
	public TradingAccount addTradingAccount(@RequestBody TradingAccount tradingAccount) {
		return tradingAccountService.addTradingAccount(tradingAccount);
	}
	
	@CrossOrigin(maxAge = 3600)
	@RequestMapping("/tradingaccount/{tradingAccountId}")
	public Optional<TradingAccount> getTradingAccount(@PathVariable int tradingAccountId) {
		return tradingAccountService.getTradingAccount(tradingAccountId);
	}
	
	@CrossOrigin(maxAge = 3600)
	@RequestMapping("/tradeaccount/{tradeAccountId}/trader/{traderId}")
	public TradingAccount addTraderToAccount(@PathVariable int tradeAccountId, @PathVariable int traderId) {
		return tradingAccountService.addTraderToAccount(tradeAccountId, traderId);
	}
	
	@CrossOrigin(maxAge = 3600)
	@RequestMapping(method = RequestMethod.PUT, value =  "/tradingaccount")
	public void updateTradingAccount(@RequestBody TradingAccount tradingAccount) {
		tradingAccountService.addTradingAccount(tradingAccount);
	}
	
}
