package com.soft6creators.futurespace.app.propcountry;

import java.util.ArrayList;
import java.util.List;

public class CountryAndCity {
	private String country;
	private List<String> cities = new ArrayList<>();
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}
	public List<String> getCities() {
		return cities;
	}
	public void setCities(List<String> cities) {
		this.cities = cities;
	}
	
	
}
