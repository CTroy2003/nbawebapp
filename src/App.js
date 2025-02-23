import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import nbaCSV from "./nba.csv";
import "./App.css";
import * as NBAIcons from "react-nba-logos";

const App = () => {
  const [games, setGames] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [displayGames, setDisplayGames] = useState([]);

  const getFormattedDate = (date) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const day = days[date.getDay()];
    const month = months[date.getMonth()];
    const dateNum = date.getDate();
    const year = date.getFullYear();
    return `${day}, ${month} ${dateNum}, ${year}`;
  };

  const teamAbbreviations = {
    "Atlanta Hawks": "ATL",
    "Boston Celtics": "BOS",
    "Brooklyn Nets": "BKN",
    "Charlotte Hornets": "CHA",
    "Chicago Bulls": "CHI",
    "Cleveland Cavaliers": "CLE",
    "Dallas Mavericks": "DAL",
    "Denver Nuggets": "DEN",
    "Detroit Pistons": "DET",
    "Golden State Warriors": "GSW",
    "Houston Rockets": "HOU",
    "Indiana Pacers": "IND",
    "Los Angeles Clippers": "LAC",
    "Los Angeles Lakers": "LAL",
    "Memphis Grizzlies": "MEM",
    "Miami Heat": "MIA",
    "Milwaukee Bucks": "MIL",
    "Minnesota Timberwolves": "MIN",
    "New Orleans Pelicans": "NOP",
    "New York Knicks": "NYK",
    "Oklahoma City Thunder": "OKC",
    "Orlando Magic": "ORL",
    "Philadelphia 76ers": "PHI",
    "Phoenix Suns": "PHX",
    "Portland Trail Blazers": "POR",
    "Sacramento Kings": "SAC",
    "San Antonio Spurs": "SAS",
    "Toronto Raptors": "TOR",
    "Utah Jazz": "UTA",
    "Washington Wizards": "WAS",
  };

  useEffect(() => {
    Papa.parse(nbaCSV, {
      download: true,
      header: true,
      complete: (result) => {
        setGames(result.data);
      },
    });
  }, []);

  const changeDate = (direction) => {
    setSelectedDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(prevDate.getDate() + direction);
      return newDate;
    });
  };

  useEffect(() => {
    const dateString = getFormattedDate(selectedDate);
    const filteredGames = games.filter((game) => game["Game Date"] === dateString);
    setDisplayGames(filteredGames);
  }, [games, selectedDate]);

  return (
    <div className="App">
      {/* 
        .content container to keep everything aligned in the same column.
        If you prefer the header to span the entire screen width in blue,
        you can move .header-container out of .content and style accordingly.
      */}
      <div className="content">
        <div className="header-container">
          <h1 className="app-title">NBA Games</h1>
          <div className="date-navigation">
            <button onClick={() => changeDate(-1)} className="nav-button">←</button>
            <button onClick={() => changeDate(1)} className="nav-button">→</button>
          </div>
        </div>

        {displayGames.length > 0 ? (
          <ul className="games-list">
            {displayGames.map((game, index) => {
              const visitorAbbr = teamAbbreviations[game["Visitor/Neutral"]];
              const homeAbbr = teamAbbreviations[game["Home/Neutral"]];
              const VisitorLogo = NBAIcons[visitorAbbr];
              const HomeLogo = NBAIcons[homeAbbr];

              return (
                <li key={index} className="game-card">
                  <div className="team-info">
                    {VisitorLogo && <VisitorLogo size={40} />}
                    <strong className="team-name">{game["Visitor/Neutral"]}</strong> 
                    {" at "}
                    {HomeLogo && <HomeLogo size={40} className="home-logo" />}
                    <strong className="team-name">{game["Home/Neutral"]}</strong>
                  </div>
                  <div className="divider"></div>
                  <em className="game-label">Arena:</em> 
                  <span className="game-value">{game.Arena}</span>
                  <em className="game-label">Time:</em> 
                  <span className="game-value">{game["Start"] || "Time not available"}</span>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="no-games">No games scheduled for {getFormattedDate(selectedDate)}</p>
        )}
      </div>
    </div>
  );
};

export default App;