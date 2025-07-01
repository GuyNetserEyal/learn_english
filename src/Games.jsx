import React, { useEffect, useMemo, useState } from "react";

const VOCAB = [
  { word: "APPLE", hebrew: "אַפֶּל", icon: "🍎" },
  { word: "BANANA", hebrew: "בָּנָנָה", icon: "🍌" },
  { word: "ORANGE", hebrew: "אוֹרֶנְג'", icon: "🍊" },
  { word: "GRAPE", hebrew: "גְרֵייפּ", icon: "🍇" },
  { word: "PEAR", hebrew: "פֵּאֵר", icon: "🍐" },
  { word: "PEACH", hebrew: "פִּיץ'", icon: "🍑" },
  { word: "CHERRY", hebrew: "צֶ'רִי", icon: "🍒" },
  { word: "LEMON", hebrew: "לֶמוֹן", icon: "🍋" },
  { word: "MANGO", hebrew: "מַנְגוֹ", icon: "🥭" },
  { word: "KIWI", hebrew: "קִיוִּי", icon: "🥝" },
  { word: "CARROT", hebrew: "קֶרֶט", icon: "🥕" },
  { word: "TOMATO", hebrew: "טוֹמַטוֹ", icon: "🍅" },
  { word: "POTATO", hebrew: "פּוֹטֵייטוֹ", icon: "🥔" },
  { word: "BREAD", hebrew: "בְּרֶאד", icon: "🍞" },
  { word: "PIZZA", hebrew: "פִּיצָה", icon: "🍕" },
  { word: "MILK", hebrew: "מִילְק", icon: "🥛" },
  { word: "EGG", hebrew: "אֶג", icon: "🥚" },
  { word: "WATER", hebrew: "ווֹטֶר", icon: "💧" },
  { word: "JUICE", hebrew: "ג'וּס", icon: "🧃" },
  { word: "CAT", hebrew: "קַט", icon: "🐱" },
  { word: "DOG", hebrew: "דּוֹג", icon: "🐶" },
  { word: "LION", hebrew: "לַיּוֹן", icon: "🦁" },
  { word: "TIGER", hebrew: "טַייְגֶר", icon: "🐯" },
  { word: "MONKEY", hebrew: "מַנְקִי", icon: "🐒" },
  { word: "ZEBRA", hebrew: "זִיבְּרָה", icon: "🦓" },
  { word: "SUN", hebrew: "סַן", icon: "☀️" },
  { word: "MOON", hebrew: "מוּן", icon: "🌙" },
  { word: "STAR", hebrew: "סְטַאר", icon: "⭐" },
  { word: "RAIN", hebrew: "רֵיין", icon: "🌧️" },
  { word: "SNOW", hebrew: "סְנוֹו", icon: "❄️" },
  { word: "CAR", hebrew: "קַאר", icon: "🚗" },
  { word: "BUS", hebrew: "בַּאס", icon: "🚌" },
  { word: "BIKE", hebrew: "בַּייְק", icon: "🚲" },
  { word: "BOAT", hebrew: "בּוֹאט", icon: "🚤" },
  { word: "PLANE", hebrew: "פְּלֵיין", icon: "✈️" },
  { word: "BOOK", hebrew: "בּוּק", icon: "📖" },
  { word: "PEN", hebrew: "פֶּן", icon: "🖊️" },
  { word: "BED", hebrew: "בֶּד", icon: "🛏️" },
  { word: "HAT", hebrew: "הַט", icon: "🎩" },
  { word: "SHOE", hebrew: "שׁוּ", icon: "👟" },
  // ... (you can add more up to 100)
];

function getRandomSession(size = 10) {
  const copy = [...VOCAB];
  // Fisher–Yates shuffle
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, size);
}

export default function Games({ onBack }) {
  // session state: array of 10 words, resettable
  const [session, setSession] = useState(() => getRandomSession(10));
  const [index, setIndex] = useState(0); // current word index
  const [stage, setStage] = useState(0); // 0=word,1=icon,2=hebrew+sound
  const [results, setResults] = useState([]); // true/false for each word

  const current = session[index];

  const speak = (text) => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const ut = new SpeechSynthesisUtterance(text);
      ut.lang = "en-US";
      window.speechSynthesis.speak(ut);
    }
  };

  const handleNextStage = () => {
    setStage((s) => Math.min(2, s + 1));
  };

  const handleResult = (success) => {
    setResults((prev) => [...prev, success]);
    if (index < session.length - 1) {
      setIndex(index + 1);
      setStage(0);
    } else {
      // game over
      setStage(3);
    }
  };

  const handleNewGame = () => {
    setSession(getRandomSession(10));
    setIndex(0);
    setStage(0);
    setResults([]);
  };

  if (stage === 3) {
    const successCount = results.filter(Boolean).length;
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
          gap: 24,
          position: "relative",
        }}
      >
        <button onClick={onBack} style={{ position: "absolute", top: 20, left: 20, fontSize: 18 }}>
          חזרה לדף הבית
        </button>
        <h1 style={{ fontSize: 48 }}>סיום המשחק!</h1>
        <p style={{ fontSize: 28 }}>
          הצלחתם {successCount} מתוך {session.length} מילים
        </p>
        <button
          onClick={handleNewGame}
          style={{ padding: "12px 24px", fontSize: 20, borderRadius: 10, cursor: "pointer" }}
        >
          משחק חדש
        </button>
      </div>
    );
  }

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
        gap: 32,
        position: "relative",
      }}
    >
      <button onClick={onBack} style={{ position: "absolute", top: 20, left: 20, fontSize: 18 }}>
        חזרה לדף הבית
      </button>
      <h2 style={{ fontSize: 20 }}>
        מילה {index + 1} מתוך {session.length}
      </h2>

      {/* Always show the word */}
      <h1 style={{ fontSize: 64 }}>{current.word}</h1>
      <div style={{ fontSize: 40, marginBottom: 8, color: '#444' }}>
        {current.word.charAt(0) + current.word.slice(1).toLowerCase()}
      </div>

      {/* Reveal icon if stage >= 1 */}
      {stage >= 1 && <div style={{ fontSize: 100 }}>{current.icon}</div>}

      {/* Reveal hebrew+sound if stage >= 2 */}
      {stage >= 2 && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <div style={{ fontSize: 64 }}>{current.hebrew}</div>
          <button
            onClick={() => speak(current.word)}
            style={{ padding: "10px 20px", fontSize: 18, borderRadius: 8, cursor: "pointer" }}
          >
            השמע מילה
          </button>
        </div>
      )}

      {/* Controls */}
      {stage < 2 && (
        <button
          onClick={handleNextStage}
          style={{ padding: "12px 24px", fontSize: 24, borderRadius: 12, cursor: "pointer" }}
        >
          ➡️
        </button>
      )}

      {stage >= 2 && (
        <div style={{ display: "flex", gap: 40 }}>
          <button
            onClick={() => handleResult(true)}
            style={{ padding: "12px 24px", fontSize: 32, borderRadius: 12, cursor: "pointer" }}
          >
            ✅
          </button>
          <button
            onClick={() => handleResult(false)}
            style={{ padding: "12px 24px", fontSize: 32, borderRadius: 12, cursor: "pointer" }}
          >
            ❌
          </button>
        </div>
      )}
    </div>
  );
} 