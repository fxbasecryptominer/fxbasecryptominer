package com.soft6creators.futurespace.app.state;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StateRepository extends CrudRepository<State, Integer> {
	public List<State> findAllByCountryCountryId(int countryId);

}
