package com.soft6creators.futurespace.app.crypto;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CryptoRepository extends CrudRepository<Crypto, Integer> {
	public Crypto findByCrypto(String cryptoName);
}
