import React, { useState } from "react";
import Games from "./Games.jsx";
import WordSearch from "./WordSearch.jsx";
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
  // page can be "home", "learning", "games", "games-menu", "game-10", "game-search"
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
  if (page === "learning" && selected !== null) {
    const { letter, hebrewName, word, hebrewWord, icon } = LETTERS[selected];
    return (
      <div
        dir="rtl"
        style={{
          textAlign: "center",
          fontFamily: "inherit",
          padding: 32,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          position: "relative",
        }}
      >
        <button
          onClick={() => setSelected(null)}
          style={{ position: "absolute", top: 20, left: 20, fontSize: 18 }}
        >
          חזרה
        </button>
        <h1 style={{ fontSize: 80 }}>{icon}</h1>
        <h1 style={{ fontSize: 64 }}>{letter}, {letter.toLowerCase()}</h1>
        <h2 style={{ fontSize: 32 }}>{hebrewName}</h2>
        <div style={{ marginTop: 32, fontSize: 28 }}>
          <div><b>{word}</b></div>
          <div>{hebrewWord}</div>
        </div>

        <div style={{ marginTop: 40, display: "flex", justifyContent: "center", gap: 20 }}>
          <button
            onClick={() => speak(letter.toLowerCase())}
            style={{ padding: "12px 24px", fontSize: 18, borderRadius: 10, cursor: "pointer" }}
          >
            השמע אות
          </button>
          <button
            onClick={() => speak(word)}
            style={{ padding: "12px 24px", fontSize: 18, borderRadius: 10, cursor: "pointer" }}
          >
            השמע מילה
          </button>
        </div>
      </div>
    );
  }

  // 2. Learning grid page
  if (page === "learning") {
    return (
      <div dir="rtl" style={{ textAlign: "center", fontFamily: "inherit", padding: 32 }}>
        <button
          onClick={() => setPage("home")}
          style={{ position: "absolute", top: 20, left: 20, fontSize: 18 }}
        >
          חזרה
        </button>
        <h1 style={{ fontSize: 36, marginBottom: 24 }}>בחרו אות באנגלית</h1>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 16 }}>
          {LETTERS.map((l, idx) => (
            <button
              key={l.letter}
              onClick={() => setSelected(idx)}
              style={{
                width: 90,
                height: 90,
                fontSize: 32,
                margin: 8,
                borderRadius: 16,
                border: "2px solid #333",
                background: "#f7f7f7",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: 24 }}>{l.icon}</span>
              <span>{l.letter}</span>
              <span style={{ fontSize: 18, marginTop: 4 }}>{l.hebrewName}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // games submenu
  if (page === "games-menu") {
    return (
      <div
        dir="rtl"
        style={{
          textAlign: "center",
          fontFamily: "inherit",
          padding: 32,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          gap: 40,
          position: "relative",
        }}
      >
        <button onClick={() => setPage("home")} style={{ position: "absolute", top: 20, left: 20, fontSize: 18 }}>
          חזרה
        </button>
        <h1 style={{ fontSize: 48 }}>בחרו משחק</h1>
        <div style={{ display: "flex", gap: 40 }}>
          <button
            onClick={() => setPage("game-10")}
            style={{ padding: "20px 40px", fontSize: 28, borderRadius: 12, cursor: "pointer" }}
          >
            10 מילים
          </button>
          <button
            onClick={() => setPage("game-search")}
            style={{ padding: "20px 40px", fontSize: 28, borderRadius: 12, cursor: "pointer" }}
          >
            חיפוש מילים
          </button>
        </div>
      </div>
    );
  }

  if (page === "game-10") {
    return <Games onBack={() => setPage("games-menu")} />;
  }

  if (page === "game-search") {
    return <WordSearch onBack={() => setPage("games-menu")} />;
  }

  // 4. Home front page
  return (
    <div
      dir="rtl"
      style={{
        textAlign: "center",
        fontFamily: "inherit",
        padding: 32,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        gap: 40,
      }}
    >
      <h1 style={{ fontSize: 48 }}>ברוכים הבאים</h1>
      <div style={{ display: "flex", gap: 40 }}>
        <button
          onClick={() => {
            setPage("learning");
            setSelected(null);
          }}
          style={{ padding: "20px 40px", fontSize: 28, borderRadius: 12, cursor: "pointer" }}
        >
          למידה
        </button>
        <button
          onClick={() => setPage("games-menu")}
          style={{ padding: "20px 40px", fontSize: 28, borderRadius: 12, cursor: "pointer" }}
        >
          משחקים
        </button>
      </div>
    </div>
  );
}

export default App;
