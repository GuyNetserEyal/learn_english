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
      <div dir="rtl" className="screen-container" style={{ gap: 24 }}>
        <button
          onClick={() => setSelected(null)}
          className="primary-button back-button"
        >
          חזרה
        </button>

        <h1 style={{ fontSize: 48 }}>{pair.adjectives[0]} / {pair.adjectives[1]}</h1>

        <div style={{ display: 'flex', gap: 40 }}>
          {/* First sentence */}
          <div className="detail-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <div style={{ fontSize: 72 }}>{pair.icons[0]}</div>
            <div style={{ fontSize: 40 }}>{sentence1}</div>
            <div style={{ fontSize: 24 }}>{pair.hebrew[0]} {pair.hebrewNouns[0]}</div>
            <div style={{ fontSize: 22, color: '#2b2b2b', marginTop: 2 }}>{pair.hebrewPhrase[0]}</div>
            <button onClick={() => speak(sentence1)} className="primary-button" style={{ marginTop: 6 }}>השמע</button>
          </div>

          {/* Second sentence */}
          <div className="detail-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <div style={{ fontSize: 72 }}>{pair.icons[1]}</div>
            <div style={{ fontSize: 40 }}>{sentence2}</div>
            <div style={{ fontSize: 24 }}>{pair.hebrew[1]} {pair.hebrewNouns[1]}</div>
            <div style={{ fontSize: 22, color: '#2b2b2b', marginTop: 2 }}>{pair.hebrewPhrase[1]}</div>
            <button onClick={() => speak(sentence2)} className="primary-button" style={{ marginTop: 6 }}>השמע</button>
          </div>
        </div>
      </div>
    );
  }

  // Grid view
  return (
    <div dir="rtl" className="screen-container">
      <button onClick={onBack} className="primary-button back-button">
        חזרה
      </button>
      <h1 style={{ fontSize: 36, marginBottom: 24 }}>בחרו זוג תארים</h1>
      <div className="pairs-grid">
        {PAIRS.map((p, idx) => (
          <button key={idx} onClick={() => setSelected(idx)} className="pair-card">
            <span style={{ fontSize: 32 }}>{p.icons[0]} {p.icons[1]}</span>
            <span>{p.adjectives[0]} / {p.adjectives[1]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
