package com.ex.FantasySoccerLeague.Dao;

import com.ex.FantasySoccerLeague.tables.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.List;

@Repository
public interface Team_Dao extends JpaRepository<Team, Integer> {
    public Team findByUser(Integer id);
    List<Team> findAllByLeagueId(Integer id);
}
