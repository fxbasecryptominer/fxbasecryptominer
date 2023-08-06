package com.soft6creators.futurespace.app.country;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CountryController {
	@Autowired
	private CountryService countryService;
	
	@RequestMapping(method = RequestMethod.POST, value = "/country")
	public List<Country> addCountries(@RequestBody List<Country> countries) {
		return countryService.addCountries(countries);
	}
	
	@RequestMapping("/country")
	public List<Country> getCountries() {
		return countryService.getCountries();
	}
	
	@RequestMapping("/delete/countries")
	public void deleteCountries() {
		countryService.deleteCountries();
	}
}
