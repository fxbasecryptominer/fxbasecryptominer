package com.soft6creators.futurespace.app.tradingaccount;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.soft6creators.futurespace.app.trader.Trader;
import com.soft6creators.futurespace.app.trader.TraderService;

@Service
public class TradingAccountService {

	@Autowired
	private TradingAccountRepository tradingAccountRepository;
	@Autowired
	private TraderService traderService;

	public TradingAccount addTradingAccount(TradingAccount tradingAccount) {
		return tradingAccountRepository.save(tradingAccount);
	}

	public Optional<TradingAccount> getTradingAccount(int tradingAccountId) {
		return tradingAccountRepository.findById(null);
	}

	public TradingAccount addTraderToAccount(int tradeAccountId, int traderId) {
		Optional<TradingAccount> tradingAccount = tradingAccountRepository.findById(tradeAccountId);
		Optional<Trader> trader = traderService.getTrader(traderId);
		tradingAccount.get().setTrader(trader.get());
		return tradingAccountRepository.save(tradingAccount.get());
	}
}
