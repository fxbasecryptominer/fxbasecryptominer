package com.soft6creators.futurespace.app.trader;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class TraderController {

	@Autowired
	private TraderService traderService;
	
//	@RequestMapping(method = RequestMethod.POST, value = "/trader")
//	public Trader addTrader(@RequestBody MultipartFile file) {
//		return traderService.addTrader(file);
//	}
	
	@CrossOrigin(maxAge = 3600)
	@RequestMapping(method = RequestMethod.POST, value = "traders")
	public List<Trader> addTraders(@RequestBody List<Trader> traders) {
		return traderService.addTraders(traders);
	}
	
	@CrossOrigin(maxAge = 3600)
	@RequestMapping("/trader/{traderId}")
	public Optional<Trader> getTrader(@PathVariable int traderId) {
		return traderService.getTrader(traderId);
	}
	
	@CrossOrigin(maxAge = 3600)
	@RequestMapping("/traders")
	public List<Trader> getTraders() {
		return traderService.getTraders();
	}
	
	
	
	
}
