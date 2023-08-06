package com.soft6creators.futurespace.app.withdrawal;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WithdrawalRepository extends CrudRepository<Withdrawal, Integer> {
	public Optional<Withdrawal> findByUserEmail(String userEmail);
	public List<Withdrawal> findAllByWithdrawalStatus(String withdrawalStatus);
}
