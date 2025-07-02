import React, { useState } from "react";

// List of adjective pairs. Each pair has: adjective1, adjective2, hebrewPron1, hebrewPron2, noun1, noun2, icon1, icon2
const PAIRS = [
  {
    adjectives: ["Big", "Small"],
    hebrew: ["בִּיג", "סְמוֹל"],
    nouns: ["lion", "cat"],
    hebrewNouns: ["לַיּוֹן", "קַט"],
    hebrewPhrase: ["אריה גדול", "חתול קטן"],
    icons: ["🦁", "🐱"],
  },
  {
    adjectives: ["Tall", "Short"],
    hebrew: ["טוֹל", "שׁוֹרְט"],
    nouns: ["giraffe", "rabbit"],
    hebrewNouns: ["גִ'ירַף", "רַבִּיט"],
    hebrewPhrase: ["ג'ירף גבוה", "ארנב נמוך"],
    icons: ["🦒", "🐰"],
  },
  {
    adjectives: ["Fast", "Slow"],
    hebrew: ["פַאסְט", "סְלוֹו"],
    nouns: ["horse", "turtle"],
    hebrewNouns: ["הוֹרְס", "טֶרְטֶל"],
    hebrewPhrase: ["סוס מהיר", "צב איטי"],
    icons: ["🐎", "🐢"],
  },
  {
    adjectives: ["Hot", "Cold"],
    hebrew: ["הוֹט", "קוֹלְד"],
    nouns: ["sun", "snow"],
    hebrewNouns: ["סַן", "סְנוֹו"],
    hebrewPhrase: ["שמש חמה", "שלג קר"],
    icons: ["☀️", "❄️"],
  },
  {
    adjectives: ["Happy", "Sad"],
    hebrew: ["הֶפִּי", "סֵאֵד"],
    nouns: ["dog", "cat"],
    hebrewNouns: ["דוֹג", "קַט"],
    hebrewPhrase: ["כלב שמח", "חתול עצוב"],
    icons: ["🐶", "🐱"],
  },
  {
    adjectives: ["Old", "Young"],
    hebrew: ["אוֹלְד", "יאָנג"],
    nouns: ["man", "boy"],
    hebrewNouns: ["מֶן", "בּוֹי"],
    hebrewPhrase: ["איש זקן", "ילד צעיר"],
    icons: ["👴", "👦"],
  },
];

function speak(text) {
  if (typeof window !== "undefined" && window.speechSynthesis) {
    window.speechSynthesis.cancel();
    const ut = new SpeechSynthesisUtterance(text);
    ut.lang = "en-US";
    window.speechSynthesis.speak(ut);
  }
}

export default function Adjectives({ onBack }) {
  const [selected, setSelected] = useState(null); // index of selected pair

  // Detail view
  if (selected !== null) {
    const pair = PAIRS[selected];
    const sentence1 = `${pair.adjectives[0]} ${pair.nouns[0]}`;
    const sentence2 = `${pair.adjectives[1]} ${pair.nouns[1]}`;

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
          gap: 24,
        }}
      >
        <button onClick={() => setSelected(null)} style={{ position: "absolute", top: 20, left: 20, fontSize: 18 }}>
          חזרה
        </button>

        <h1 style={{ fontSize: 48 }}>{pair.adjectives[0]} / {pair.adjectives[1]}</h1>

        {/* First sentence */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <div style={{ fontSize: 72 }}>{pair.icons[0]}</div>
          <div style={{ fontSize: 40 }}>{sentence1}</div>
          <div style={{ fontSize: 24 }}>{pair.hebrew[0]} {pair.hebrewNouns[0]}</div>
          <div style={{ fontSize: 22, color: '#2b2b2b', marginTop: 2 }}>{pair.hebrewPhrase[0]}</div>
          <button onClick={() => speak(sentence1)} style={{ marginTop: 6, cursor: "pointer" }}>השמע</button>
        </div>

        {/* Second sentence */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <div style={{ fontSize: 72 }}>{pair.icons[1]}</div>
          <div style={{ fontSize: 40 }}>{sentence2}</div>
          <div style={{ fontSize: 24 }}>{pair.hebrew[1]} {pair.hebrewNouns[1]}</div>
          <div style={{ fontSize: 22, color: '#2b2b2b', marginTop: 2 }}>{pair.hebrewPhrase[1]}</div>
          <button onClick={() => speak(sentence2)} style={{ marginTop: 6, cursor: "pointer" }}>השמע</button>
        </div>
      </div>
    );
  }

  // Grid view
  return (
    <div dir="rtl" style={{ textAlign: "center", fontFamily: "inherit", padding: 32 }}>
      <button onClick={onBack} style={{ position: "absolute", top: 20, left: 20, fontSize: 18 }}>
        חזרה
      </button>
      <h1 style={{ fontSize: 36, marginBottom: 24 }}>בחרו זוג תארים</h1>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 16 }}>
        {PAIRS.map((p, idx) => (
          <button
            key={idx}
            onClick={() => setSelected(idx)}
            style={{
              width: 140,
              height: 140,
              borderRadius: 16,
              border: "2px solid #333",
              background: "#f7f7f7",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
              fontSize: 18,
            }}
          >
            <span style={{ fontSize: 32 }}>{p.icons[0]} {p.icons[1]}</span>
            <span>{p.adjectives[0]} / {p.adjectives[1]}</span>
          </button>
        ))}
      </div>
    </div>
  );
} 