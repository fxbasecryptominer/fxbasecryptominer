package com.soft6creators.futurespace.app.interest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class InterestController {

	@Autowired
	private InterestService interestService;
	
	@RequestMapping(method = RequestMethod.POST, value = "/interest")
	public Interest addInterest(@RequestBody Interest interest) {
		return interestService.addInterest(interest);
	}
	
	@RequestMapping("/interest")
	public List<Interest> getInterest() {
		return interestService.getInterest();
	}
	
	@RequestMapping(method = RequestMethod.PUT, value = "/interest")
	public Interest updateInterest(@RequestBody Interest interest) {
		return interestService.addInterest(interest);
	}
}
