import React, { useState } from "react";
import Games from "./Games.jsx";
import WordSearchTap from "./WordSearchTap.jsx";
import Adjectives from "./Adjectives.jsx";
import SpecialLetters from "./SpecialLetters.jsx";
import MissingLetterGame from "./MissingLetterGame.jsx";
import 'pepjs';

const LETTERS = [
  { letter: "A", hebrewName: "אֵיי", word: "Apple", hebrewWord: "אֶפֶּל", icon: "🍎" },
  { letter: "B", hebrewName: "בִּי", word: "Ball", hebrewWord: "בּוֹל", icon: "🏀" },
  { letter: "C", hebrewName: "סִי", word: "Cat", hebrewWord: "קַט", icon: "🐱" },
  { letter: "D", hebrewName: "דִי", word: "Dog", hebrewWord: "דּוֹג", icon: "🐶" },
  { letter: "E", hebrewName: "אִי", word: "Elephant", hebrewWord: "אֶלֶפֶנְט", icon: "🐘" },
  { letter: "F", hebrewName: "אֶף", word: "Fish", hebrewWord: "פִישׁ", icon: "🐟" },
  { letter: "G", hebrewName: "ג'י", word: "Grape", hebrewWord: "גְרֵייפ", icon: "🍇" },
  { letter: "H", hebrewName: "אֵיְטְשׁ", word: "Hat", hebrewWord: "הַט", icon: "🎩" },
  { letter: "I", hebrewName: "אַיי", word: "Ice", hebrewWord: "אַייְס", icon: "🧊" },
  { letter: "J", hebrewName: "גֵ'יי", word: "Juice", hebrewWord: "ג'וּס", icon: "🧃" },
  { letter: "K", hebrewName: "קֵיי", word: "Kite", hebrewWord: "קַיְט", icon: "🪁" },
  { letter: "L", hebrewName: "אֶל", word: "Lion", hebrewWord: "לַיּוֹן", icon: "🦁" },
  { letter: "M", hebrewName: "אֶם", word: "Monkey", hebrewWord: "מַנְקִי", icon: "🐒" },
  { letter: "N", hebrewName: "אֶן", word: "Nose", hebrewWord: "נוֹז", icon: "👃" },
  { letter: "O", hebrewName: "אוֹ", word: "Orange", hebrewWord: "אוֹרֶנְג'", icon: "🍊" },
  { letter: "P", hebrewName: "פִּי", word: "Pizza", hebrewWord: "פִּיצָה", icon: "🍕" },
  { letter: "Q", hebrewName: "קְיוּ", word: "Queen", hebrewWord: "קווין", icon: "👸" },
  { letter: "R", hebrewName: "אָר", word: "Rabbit", hebrewWord: "רַבִּיט", icon: "🐰" },
  { letter: "S", hebrewName: "אֶס", word: "Sun", hebrewWord: "סַן", icon: "☀️" },
  { letter: "T", hebrewName: "טִי", word: "Tiger", hebrewWord: "טַייְגֶר", icon: "🐯" },
  { letter: "U", hebrewName: "יוּ", word: "Umbrella", hebrewWord: "אַמְבְּרֶלָה", icon: "☂️" },
  { letter: "V", hebrewName: "וִי", word: "Violin", hebrewWord: "וַיּוֹלִין", icon: "🎻" },
  { letter: "W", hebrewName: "דַבְּלְיוּ", word: "Water", hebrewWord: "וֹוֹטֶר", icon: "💧" },
  { letter: "X", hebrewName: "אֶקס", word: "Xylophone", hebrewWord: "קְסִילוֹפוֹן", icon: "🎶" },
  { letter: "Y", hebrewName: "וַיי", word: "Yellow", hebrewWord: "יֶלּוֹ", icon: "🟨" },
  { letter: "Z", hebrewName: "זִי", word: "Zebra", hebrewWord: "זִיבְּרָה", icon: "🦓" }
];

function App() {
  // page can be "home", "learning-menu", "letters", "adjectives", "special", "games-menu", "game-10", "game-search", "game-missing"
  const [page, setPage] = useState("home");
  const [selected, setSelected] = useState(null); // index of selected letter when inside learning detail

  // helper to speak text using browser speech synthesis
  const speak = (text) => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = "en-US";
      window.speechSynthesis.speak(utter);
    }
  };

  // 1. Detail view for a specific letter (inside learning)
  if (page === "letters" && selected !== null) {
    const { letter, hebrewName, word, hebrewWord, icon } = LETTERS[selected];
    return (
      <div dir="rtl" className="screen-container" style={{ gap: 32 }}>
        <button
          onClick={() => setSelected(null)}
          className="primary-button back-button"
        >
          חזרה
        </button>
        <div className="detail-card" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <h1 style={{ fontSize: 80 }}>{icon}</h1>
          <h1 style={{ fontSize: 64 }}>{letter}, {letter.toLowerCase()}</h1>
          <h2 style={{ fontSize: 32 }}>{hebrewName}</h2>
          <div style={{ marginTop: 16, fontSize: 28 }}>
            <div><b>{word}</b></div>
            <div>{hebrewWord}</div>
          </div>
          <div style={{ marginTop: 24, display: "flex", justifyContent: "center", gap: 20 }}>
            <button onClick={() => speak(letter.toLowerCase())} className="primary-button">
              השמע אות
            </button>
            <button onClick={() => speak(word)} className="primary-button">
              השמע מילה
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. Letters grid page
  if (page === "letters") {
    return (
      <div dir="rtl" className="screen-container">
        <button
          onClick={() => setPage("learning-menu")}
          className="primary-button back-button"
        >
          חזרה
        </button>
        <h1 style={{ fontSize: 36, marginBottom: 24 }}>בחרו אות באנגלית</h1>
        <div className="letters-grid">
          {LETTERS.map((l, idx) => (
            <button key={l.letter} onClick={() => setSelected(idx)} className="letter-cell">
              <span style={{ fontSize: 24 }}>{l.icon}</span>
              <span>{l.letter}</span>
              <span style={{ fontSize: 18, marginTop: 4 }}>{l.hebrewName}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Learning menu page
  if (page === "learning-menu") {
    return (
      <div dir="rtl" className="screen-container" style={{ gap: 40 }}>
        <button onClick={() => setPage("home" )} className="primary-button back-button">
          חזרה
        </button>
        <h1 style={{ fontSize: 48 }}>בחרו נושא למידה</h1>
        <div style={{ display: "flex", gap: 40 }}>
          <button
            onClick={() => {
              setPage("letters");
              setSelected(null);
            }}
            className="menu-card"
          >
            <div style={{ fontSize: 36 }}>🔤</div>
            אותיות
          </button>
          <button
            onClick={() => setPage("adjectives")}
            className="menu-card"
          >
            <div style={{ fontSize: 36 }}>📚</div>
            תארים
          </button>
          <button
            onClick={() => setPage("special")}
            className="menu-card"
          >
            <div style={{ fontSize: 36 }}>✨</div>
            אותיות מיוחדות
          </button>
        </div>
      </div>
    );
  }

  // adjectives learning page
  if (page === "adjectives") {
    return <Adjectives onBack={() => setPage("learning-menu")} />;
  }

  // special letters learning page
  if (page === "special") {
    return <SpecialLetters onBack={() => setPage("learning-menu")} />;
  }

  // games submenu
  if (page === "games-menu") {
    return (
      <div dir="rtl" className="screen-container" style={{ gap: 40 }}>
        <button onClick={() => setPage("home")} className="primary-button back-button">
          חזרה
        </button>
        <h1 style={{ fontSize: 48 }}>בחרו משחק</h1>
        <div style={{ display: "flex", gap: 40 }}>
          <button onClick={() => setPage("game-10")} className="game-tile">
            <div style={{ fontSize: 36 }}>🎯</div>
            <div>10 מילים</div>
            <span className="desc">תרגול אוצר מילים</span>
          </button>
          <button onClick={() => setPage("game-search")} className="game-tile">
            <div style={{ fontSize: 36 }}>🔎</div>
            <div>חיפוש מילים</div>
            <span className="desc">מצאו את המילים המוסתרות</span>
          </button>
          <button onClick={() => setPage("game-missing")} className="game-tile">
            <div style={{ fontSize: 36 }}>❔</div>
            <div>אות חסרה</div>
            <span className="desc">נחשו את האות החסרה</span>
          </button>
        </div>
      </div>
    );
  }

  if (page === "game-10") {
    return <Games onBack={() => setPage("games-menu")} />;
  }

  if (page === "game-search") {
    return <WordSearchTap onBack={() => setPage("games-menu")} />;
  }

  if (page === "game-missing") {
    return <MissingLetterGame onBack={() => setPage("games-menu")} />;
  }

  // 4. Home front page
  return (
    <div dir="rtl" className="home-hero">
      <h1>ברוכים הבאים</h1>
      <div className="hero-buttons">
        <button
          onClick={() => {
            setPage("learning-menu");
            setSelected(null);
          }}
          className="home-button"
        >
          למידה
        </button>
        <button
          onClick={() => setPage("games-menu")}
          className="home-button"
        >
          משחקים
        </button>
      </div>
    </div>
  );
}

export default App;
