package com.soft6creators.futurespace.app.propcountry;

import java.util.List;

public class CountryAndState {
	private String name;
	private String iso3;
	private List<State> states;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getIso3() {
		return iso3;
	}
	public void setIso3(String iso3) {
		this.iso3 = iso3;
	}
	public List<State> getStates() {
		return states;
	}
	public void setStates(List<State> states) {
		this.states = states;
	}
	
	
}
