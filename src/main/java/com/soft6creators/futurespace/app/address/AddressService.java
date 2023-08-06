package com.soft6creators.futurespace.app.address;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.soft6creators.futurespace.app.accounttype.AccountType;

@Service
public class AddressService {
	@Autowired
	private AddressRepository addressRepository;
	
	public Address addAddress(Address address) {
		AccountType accountType = new AccountType();
		accountType.setAccountTypeId(1);
		address.setAccountType(accountType);
		return addressRepository.save(address);
	}
	
	public Optional<Address> getAddress(int addressId) {
		return addressRepository.findById(addressId);
	}
	
	public Address getAddressByEmail(String email) {
		return addressRepository.findByUserEmail(email);
	}
	public List<Address> getAddresses() {
		
		 return (List<Address>) addressRepository.findAll();
	}
}
