package com.soft6creators.futurespace.app.city;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CityService {
	@Autowired
	private CityRepository cityRepository;
	
	public List<City> addCities(List<City> cities) {
		return (List<City>) cityRepository.saveAll(cities);
	}
	public List<City> getCities() {
		return (List<City>) cityRepository.findAll();
	}
	public List<City> getCityByCountry(int countryId) {
		return (List<City>) cityRepository.findAllByCountryCountryId(countryId);
	}
}
