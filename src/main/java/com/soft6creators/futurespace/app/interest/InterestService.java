package com.soft6creators.futurespace.app.interest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InterestService {

	@Autowired
	private InterestRepository interestRepository;
	
	public Interest addInterest(Interest interest) {
		return interestRepository.save(interest);
	}
	
	public List<Interest> getInterest() {
		return (List<Interest>) interestRepository.findAll();
	}
}
