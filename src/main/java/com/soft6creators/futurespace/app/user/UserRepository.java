package com.soft6creators.futurespace.app.user;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, String> {
	public User findByVerificationCode(String verificationCode);
	public User findByReferralId(String referralId);
	public Optional<User> findByEmailAndPassword(String email, String password);
}
