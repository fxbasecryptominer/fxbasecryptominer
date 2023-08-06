package com.soft6creators.futurespace.app.state;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StateService {
	@Autowired
	private StateRepository stateRepository;
	
	public List<State> addStates(List<State> states) {
		return (List<State>) stateRepository.saveAll(states);
	}
	
	public List<State> getStates() {
		return (List<State>) stateRepository.findAll();
	}
	
	public List<State> getStateByCountry(int countryId) {
		return stateRepository.findAllByCountryCountryId(countryId);
	}
	
	@Transactional
	public void deleteStates() {
		stateRepository.deleteAll();
	}

}
