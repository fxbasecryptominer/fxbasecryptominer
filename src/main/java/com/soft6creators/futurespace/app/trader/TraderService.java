package com.soft6creators.futurespace.app.trader;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class TraderService {
	@Autowired
	private TraderRepository traderRepository;
	
	
//	public Trader addTrader(MultipartFile file) {
//		Trader trader = new Trader();
//		Random random = new Random();
//		trader.setTraderName(file.getName());
//		trader.setWinRate(random.nextInt(80, 98));
//		trader.setProfitShare(random.nextInt(20, 25));
//		try {
//			trader.setImage(file.getBytes());
//		} catch (IOException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//		return traderRepository.save(trader);
//	}
	
	public List<Trader> addTraders(List<Trader> traders) {
		return (List<Trader>) traderRepository.saveAll(traders);
	}
	public Optional<Trader> getTrader(int traderId) {
		return  traderRepository.findById(traderId);
	}
	
	public List<Trader> getTraders() {
		return (List<Trader>) traderRepository.findAll();
	}
	public void deleteTrader(int traderId) {
		traderRepository.deleteById(traderId);
	}
}
