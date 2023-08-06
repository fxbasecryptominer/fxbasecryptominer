package com.soft6creators.futurespace.app.address;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AddressController {

	@Autowired
	private AddressService addressService;
	
	@CrossOrigin(maxAge = 3600)
	@RequestMapping(method = RequestMethod.POST, value = "/address")
	public Address addAddress(@RequestBody Address address) {
		return addressService.addAddress(address);
	}
	
	@CrossOrigin(maxAge = 3600)
	@RequestMapping("/address/{addressId}")
	public Optional<Address> getAddress(@PathVariable int addressId) {
		return addressService.getAddress(addressId);
	}
	
	@CrossOrigin(maxAge = 3600)
	@RequestMapping("/address/user/{email}")
	public Address getAddressByEmail(@PathVariable String email) {
		return addressService.getAddressByEmail(email);
	}
	
	@CrossOrigin(maxAge = 3600)
	@RequestMapping("/admin/address")
	public List<Address> getAddresses() {
		return addressService.getAddresses();
	}
	
	@CrossOrigin(maxAge = 3600)
	@RequestMapping(method = RequestMethod.PUT, value = "/address")
	public Address updateAddress(@RequestBody Address address) {
		return addressService.addAddress(address);
	}
}
