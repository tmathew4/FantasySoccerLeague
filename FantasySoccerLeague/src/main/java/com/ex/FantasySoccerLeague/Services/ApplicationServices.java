package com.ex.FantasySoccerLeague.Services;

import com.ex.FantasySoccerLeague.Dao.Fantasy_UserDao;
import com.ex.FantasySoccerLeague.Dao.Player_Dao;
import com.ex.FantasySoccerLeague.Dao.Team_Dao;
import com.ex.FantasySoccerLeague.tables.Player;
import com.ex.FantasySoccerLeague.tables.Team;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ex.FantasySoccerLeague.tables.Fantasy_User;

import java.util.List;

@Service
public class ApplicationServices {

    @Autowired
    Fantasy_UserDao Dao;
    @Autowired
    Team_Dao DaoT;
    @Autowired
    Player_Dao playerDao;

    public Fantasy_User checkLogin(String email, String password){
        System.out.println(email + " " + password);
        Fantasy_User user = Dao.findByEmail(email);
        System.out.println(user.toString());
        if(password.equals(user.getPassword())){
            return user;
        }
        return null;
    }

    public Team myTeam(Integer id){
        Team team = DaoT.findOne(id);
        return team;
    }

    public Team viewAllTeam(){
        Team team = (Team) DaoT.findAll();
        return team;
    }

    public List<Player> findAllPlayers(){
        return playerDao.findAll();
    }

    public List<Player> findAvailablePlayers(){
        return playerDao.findAllByTeam_IdIsNull();
    }

    public List<Player> findUnavailablePlayers(){
        return playerDao.findAllByTeam_IdIsNotNull();
    }


}
