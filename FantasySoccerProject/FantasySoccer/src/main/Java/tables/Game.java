package tables;

import javax.persistence.*;


@Entity
@Table(name="GAME")
public class Game {

    private Integer Id;
    private Team teamA;
    private Team teamB;
    private League league;
    private String Date_Time;
    private Integer Score1;
    private Integer Score2;

    public Game(){}

    @Override
    public String toString() {
        return "Game{" +
                "Id=" + Id +
                ", TeamA=" + teamA +
                ", TeamB=" + teamB +
                ", League=" + league +
                ", Date_Time='" + Date_Time + '\'' +
                ", Score1=" + Score1 +
                ", Score2=" + Score2 +
                '}';
    }

    @Id
    @GeneratedValue
    @Column(name="GAMEID", unique = true, nullable = false)
    public Integer getId() {
        return Id;
    }

    public void setId(Integer id) {
        Id = id;
    }

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name="TEAMID", referencedColumnName = "TEAMID")
    public Team getTeamA() {
        return this.teamA;
    }

    public void setTeamA(Team teamA) {
        this.teamA = teamA;
    }

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name="TEAMID", referencedColumnName = "TEAMID")
    public Team getTeamB() {
        return this.teamB;
    }

    public void setTeamB(Team teamB) {
        this.teamB = teamB;
    }

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name="LEAGUEID", referencedColumnName = "LEAGUEID")
    public League getLeague() {
        return this.league;
    }

    public void setLeague(League league) {
        this.league = league;
    }

    @Column(name="DATE_TIME")
    public String getDate_Time() {
        return Date_Time;
    }

    public void setDate_Time(String date_Time) {
        Date_Time = date_Time;
    }

    @Column(name="SCORE1")
    public Integer getScore1() {
        return Score1;
    }

    public void setScore1(Integer score1) {
        Score1 = score1;
    }

    @Column(name="SCORE2")
    public Integer getScore2() {
        return Score2;
    }

    public void setScore2(Integer score2) {
        Score2 = score2;
    }

}