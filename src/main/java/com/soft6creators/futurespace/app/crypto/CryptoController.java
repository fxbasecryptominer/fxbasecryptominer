package com.soft6creators.futurespace.app.crypto;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CryptoController {
	@Autowired
	private CryptoService cryptoService;
	
	@CrossOrigin(maxAge = 3600)
	@RequestMapping(method = RequestMethod.POST, value = "/crypto")
	public Crypto addCrypto(@RequestBody Crypto crypto) {
		return cryptoService.addCrypto(crypto);
	}
	
	@CrossOrigin(maxAge = 3600)
	@RequestMapping(method = RequestMethod.POST, value = "/cryptos")
	public List<Crypto> addCryptos(@RequestBody List<Crypto> cryptos) {
		return cryptoService.addCryptos(cryptos);
	}
	
	@CrossOrigin(maxAge = 3600)
	@RequestMapping("/cryptos")
	public List<Crypto> getCryptos() {
		return cryptoService.getCryptos();
	}

}
