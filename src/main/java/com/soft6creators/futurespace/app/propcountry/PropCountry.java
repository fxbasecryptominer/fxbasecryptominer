package com.soft6creators.futurespace.app.propcountry;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.soft6creators.futurespace.app.city.City;
import com.soft6creators.futurespace.app.city.CityService;
import com.soft6creators.futurespace.app.country.Country;
import com.soft6creators.futurespace.app.country.CountryService;
import com.soft6creators.futurespace.app.state.State;
import com.soft6creators.futurespace.app.state.StateService;

@RestController
public class PropCountry {
	@Autowired
	private CountryService countryService;
	@Autowired
	private StateService stateService;
	@Autowired
	private CityService cityService;
	
	@RequestMapping(method = RequestMethod.POST, value = "/getpropcountries")
	public void getCountriesAndStates(@RequestBody List<CountryAndState> countries) {
		List<com.soft6creators.futurespace.app.country.Country> filteredCountry = new ArrayList<>();
		List<State> filteredState = new ArrayList<>();
		for (CountryAndState singleCountry : countries) {
			com.soft6creators.futurespace.app.country.Country country = new com.soft6creators.futurespace.app.country.Country();
			State state = new State();
			List<com.soft6creators.futurespace.app.state.State> states = new ArrayList<>();
			
			
			country.setCountryName(singleCountry.getName());
			filteredCountry.add(country);
			
			for (com.soft6creators.futurespace.app.propcountry.State singleState : singleCountry.getStates()) {
				State temporalState = new State();
				temporalState.setStateName(singleState.getName());
				temporalState.setCountry(country);
				states.add(temporalState);
			}
			filteredState.addAll(states);
		}
		countryService.addCountries(filteredCountry);
		stateService.addStates(filteredState);
	}
	
	@RequestMapping(method = RequestMethod.POST, value = "getpropcities")
	public void getCountriesAndCities(@RequestBody List<CountryAndCity> countryAndCities) {
		int i = 0;
		
		List<Country> countries = countryService.getCountries();
		
		List<com.soft6creators.futurespace.app.city.City> cities = new ArrayList<>();
		
		for (CountryAndCity singleCountryAndCity : countryAndCities) {
			for (Country singleCountry: countries) {
				if (singleCountry.getCountryName().equals(singleCountryAndCity.getCountry())) {
					for (String singleCity : singleCountryAndCity.getCities()) {
						com.soft6creators.futurespace.app.city.City city = new com.soft6creators.futurespace.app.city.City();
						city.setCityName(singleCity);
						city.setCountry(singleCountry);
						cities.add(city);
					}
				}
			}
		}
		cityService.addCities(cities);
		
	}
	
}
