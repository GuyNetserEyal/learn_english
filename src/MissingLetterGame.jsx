import React, { useState } from "react";

// Word list – expand to 200 as needed
const WORDS = [
  // Simple consonant / vowel words
  { en: "DOG", hebPron: "דּוֹג", he: "כלב", icon: "🐶" },
  { en: "CAT", hebPron: "קַט", he: "חתול", icon: "🐱" },
  { en: "FISH", hebPron: "פִיש", he: "דג", icon: "🐟" },
  { en: "BIRD", hebPron: "בֶּרְד", he: "ציפור", icon: "🐦" },
  { en: "CAR", hebPron: "קַאר", he: "מכונית", icon: "🚗" },
  { en: "BUS", hebPron: "בַּאס", he: "אוטובוס", icon: "🚌" },
  { en: "BIKE", hebPron: "בַּייק", he: "אופניים", icon: "🚲" },
  { en: "CAKE", hebPron: "קֵייק", he: "עוגה", icon: "🍰" },
  { en: "NOTE", hebPron: "נוֹט", he: "פתק", icon: "📝" },
  { en: "TREE", hebPron: "טְרִי", he: "עץ", icon: "🌳" },
  { en: "HOME", hebPron: "הוֹם", he: "בית", icon: "🏠" },
  { en: "SUN", hebPron: "סַאן", he: "שמש", icon: "☀️" },
  { en: "MOON", hebPron: "מוּן", he: "ירח", icon: "🌙" },
  { en: "STAR", hebPron: "סְטַאר", he: "כוכב", icon: "⭐" },

  // Digraph words for level 3
  { en: "PHONE", hebPron: "פוֹן", he: "טלפון", icon: "📱" },
  { en: "WHALE", hebPron: "וֵייל", he: "לווייתן", icon: "🐳" },
  { en: "CHAIR", hebPron: "צֶ׳ר", he: "כיסא", icon: "💺" },
  { en: "CHEESE", hebPron: "צ׳ִיז", he: "גבינה", icon: "🧀" },
  { en: "SHARK", hebPron: "שַׁארְק", he: "כריש", icon: "🦈" },
  { en: "THUMB", hebPron: "ת׳ַאמב", he: "אגודל", icon: "👍" },
  { en: "PHOTO", hebPron: "פוֹטוֹ", he: "תמונה", icon: "📷" },
  { en: "ELEPHANT", hebPron: "אֶלֶפַנְט", he: "פיל", icon: "🐘" },
  { en: "DUCK", hebPron: "דַאק", he: "ברווז", icon: "🦆" },
  { en: "CLOCK", hebPron: "קְלוֹק", he: "שעון", icon: "⏰" },
  { en: "ROCK", hebPron: "רוֹק", he: "אבן", icon: "🪨" },
  { en: "PACK", hebPron: "פַּאק", he: "ארוז", icon: "📦" },
  { en: "SOCK", hebPron: "סוֹק", he: "גרב", icon: "🧦" },
  { en: "CITY", hebPron: "סִיטי", he: "עיר", icon: "🏙️" },
  { en: "GIANT", hebPron: "ג׳ַיַאנְט", he: "ענק", icon: "🗿" },
  { en: "GIRAFFE", hebPron: "ג׳ִירַאף", he: "ג'ירפה", icon: "🦒" },
  { en: "GOAT", hebPron: "גוֹאט", he: "עז", icon: "🐐" },
  { en: "GAME", hebPron: "גֵיים", he: "משחק", icon: "🎮" },
  { en: "GUM", hebPron: "גַאם", he: "מסטיק", icon: "🍬" },
  { en: "CUBE", hebPron: "קְיוּבּ", he: "קובייה", icon: "🧊" },
  { en: "THEME", hebPron: "ת׳ִים", he: "נושא", icon: "🎞️" },
  { en: "CAKE", hebPron: "קֵייק", he: "עוגה", icon: "🍰" },
  { en: "BIKE", hebPron: "בַּייק", he: "אופניים", icon: "🚲" },
  { en: "FROG", hebPron: "פְרוֹג", he: "צפרדע", icon: "🐸" },
  { en: "DRAGON", hebPron: "דְרַאגֹן", he: "דרקון", icon: "🐲" },
  { en: "SHEEP", hebPron: "שִׁיפּ", he: "כבשה", icon: "🐑" },
  { en: "SHELF", hebPron: "שֶׁלְף", he: "מדף", icon: "🗄️" },
  { en: "THICK", hebPron: "ת׳ִיק", he: "עבה", icon: "📏" },
  { en: "THIRST", hebPron: "ת׳ֵרְסט", he: "צמא", icon: "🥤" },
  { en: "WHISPER", hebPron: "וִיסְפֶר", he: "לחישה", icon: "🤫" },
  { en: "WHEAT", hebPron: "וִיט", he: "חיטה", icon: "🌾" },
  { en: "ALPHABET", hebPron: "אַלְפָבֶט", he: "אלפבית", icon: "🔤" },
  { en: "MAGIC", hebPron: "מַג׳ִיק", he: "קסם", icon: "✨" },
  { en: "FACE", hebPron: "פֵיס", he: "פנים", icon: "🙂" },
  // ... (add more as needed up to ~200)
];

const VOWELS = ["A", "E", "I", "O", "U"];
const CONSONANTS = "BCDFGHJKLMNPQRSTVWXYZ".split("");
const DIGRAPHS = ["CH", "SH", "TH", "PH", "WH", "CK"];

function speak(text) {
  if (typeof window !== "undefined" && window.speechSynthesis) {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US";
    window.speechSynthesis.speak(u);
  }
}

function pickRandom(arr, count) {
  const copy = [...arr];
  const res = [];
  while (res.length < count && copy.length) {
    const idx = Math.floor(Math.random() * copy.length);
    res.push(copy.splice(idx, 1)[0]);
  }
  return res;
}

function buildQuestion(wordObj, level) {
  const word = wordObj.en.toUpperCase();
  // Level 1: consonant missing
  if (level === 1) {
    // consonant positions that are NOT part of any digraph
    const positions = [...word]
      .map((ch, idx) => {
        if (VOWELS.includes(ch)) return -1;
        const ahead = word.substring(idx, idx + 2);
        const back = idx > 0 ? word.substring(idx - 1, idx + 1) : "";
        if (DIGRAPHS.includes(ahead) || DIGRAPHS.includes(back)) return -1; // skip if part of digraph
        return idx;
      })
      .filter((i) => i >= 0);

    if (positions.length === 0) {
      // fallback to vowel level if no simple consonant available
      return buildQuestion(wordObj, 2);
    }

    const pos = positions[Math.floor(Math.random() * positions.length)];
    const missing = word[pos];
    const masked = word.substring(0, pos) + "_" + word.substring(pos + 1);
    const options = pickRandom(CONSONANTS.filter((c) => c !== missing), 4);
    options.push(missing);
    return { masked, answer: missing, options: shuffle(options) };
  }
  // Level 2: vowel missing
  if (level === 2) {
    const positions = [...word].map((ch, idx) => (VOWELS.includes(ch) ? idx : -1)).filter((i) => i >= 0);
    const pos = positions[Math.floor(Math.random() * positions.length)];
    const missing = word[pos];
    const masked = word.substring(0, pos) + "_" + word.substring(pos + 1);
    const options = pickRandom(VOWELS.filter((v) => v !== missing), 4);
    options.push(missing);
    return { masked, answer: missing, options: shuffle(options) };
  }
  // Level 3: digraph missing (special)
  if (level === 3) {
    const dg = DIGRAPHS.find((d) => word.includes(d));
    if (!dg) {
      // fallback to consonant
      return buildQuestion(wordObj, 1);
    }
    const pos = word.indexOf(dg);
    const masked = word.substring(0, pos) + "_".repeat(dg.length) + word.substring(pos + dg.length);
    const options = pickRandom(DIGRAPHS.filter((d) => d !== dg), 4);
    options.push(dg);
    return { masked, answer: dg, options: shuffle(options) };
  }
}

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

function hasDigraph(word) {
  return DIGRAPHS.some((d) => word.includes(d));
}

function hasSimpleConsonant(word) {
  const positions = [...word].map((ch, idx) => {
    if (VOWELS.includes(ch)) return false;
    const ahead = word.substring(idx, idx + 2);
    const back = idx > 0 ? word.substring(idx - 1, idx + 1) : "";
    if (DIGRAPHS.includes(ahead) || DIGRAPHS.includes(back)) return false;
    return true;
  });
  return positions.includes(true);
}

export default function MissingLetterGame({ onBack }) {
  const [level, setLevel] = useState(null); // 1,2,3
  const [session, setSession] = useState([]); // 5 words per round
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);

  const startGame = (lvl) => {
    setLevel(lvl);
    setScore(0);
    setIndex(0);
    setSelected(null);

    // pick candidate words according to level requirements
    let pool = WORDS;
    if (lvl === 3) {
      pool = WORDS.filter((w) => hasDigraph(w.en));
    } else if (lvl === 1) {
      pool = WORDS.filter((w) => hasSimpleConsonant(w.en));
    }

    const words = shuffle(pool).slice(0, 5);
    const qs = words.map((w) => ({ wordObj: w, ...buildQuestion(w, lvl) }));
    setSession(qs);
  };

  if (level === null) {
    return (
      <div dir="rtl" style={{ textAlign: "center", padding: 32, fontFamily: "inherit", position: "relative" }}>
        <button onClick={onBack} style={{ position: "absolute", top: 20, left: 20 }}>
          חזרה
        </button>
        <h1 style={{ fontSize: 48, marginBottom: 32 }}>בחרו רמת קושי</h1>
        <div style={{ display: "flex", gap: 40, justifyContent: "center" }}>
          <button onClick={() => startGame(1)} style={{ padding: "20px 40px", fontSize: 28 }}>
            1️⃣ קל
          </button>
          <button onClick={() => startGame(2)} style={{ padding: "20px 40px", fontSize: 28 }}>
            2️⃣ תנועות
          </button>
          <button onClick={() => startGame(3)} style={{ padding: "20px 40px", fontSize: 28 }}>
            3️⃣ מיוחד
          </button>
        </div>
      </div>
    );
  }

  const q = session[index];

  // End of game summary
  if (index >= session.length) {
    return (
      <div dir="rtl" style={{ textAlign: "center", padding: 32, fontFamily: "inherit", position: "relative" }}>
        <button onClick={onBack} style={{ position: "absolute", top: 20, left: 20 }}>
          חזרה
        </button>
        <h1 style={{ fontSize: 56 }}>תוצאה</h1>
        <p style={{ fontSize: 32 }}>השגת {score} מתוך {session.length} נקודות</p>
        <button onClick={() => startGame(level)} style={{ padding: "14px 32px", fontSize: 24 }}>שחק שוב</button>
      </div>
    );
  }

  const handleSelect = (opt) => {
    if (selected !== null) return; // already chose
    setSelected(opt);
    if (opt === q.answer) {
      setScore((s) => s + 1);
    }
    // delay before moving to next question
    setTimeout(() => {
      setSelected(null);
      setIndex((i) => i + 1);
    }, 1200);
  };

  return (
    <div dir="rtl" style={{ textAlign: "center", padding: 32, fontFamily: "inherit", position: "relative" }}>
      <button onClick={onBack} style={{ position: "absolute", top: 20, left: 20 }}>חזרה</button>
      <h2 style={{ fontSize: 20 }}>מילה {index + 1} מתוך {session.length}</h2>
      <div style={{ fontSize: 100 }}>{q.wordObj.icon}</div>
      <div style={{ fontSize: 32, marginBottom: 8 }}>{q.wordObj.hebPron}</div>
      <div style={{ fontSize: 24, marginBottom: 16 }}>{q.wordObj.he}</div>
      <button onClick={() => speak(q.wordObj.en)} style={{ padding: "8px 20px", fontSize: 18, marginBottom: 24 }}>
        🔊 השמע
      </button>
      <div dir="ltr" style={{ fontSize: 64, marginBottom: 32, display: "flex", justifyContent: "center" }}>
        {q.masked.split("").map((ch, i) =>
          ch === "_" ? (
            <span
              key={i}
              style={{
                width: 48,
                borderBottom: "4px solid #333",
                display: "inline-block",
                margin: "0 4px",
              }}
            ></span>
          ) : (
            <span key={i} style={{ margin: "0 4px" }}>
              {ch}
            </span>
          )
        )}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center" }}>
        {q.options.map((opt) => {
          let bg = "#fff";
          let color = "#000";
          if (selected !== null) {
            if (opt === q.answer) {
              bg = "#4caf50"; // green correct
              color = "#fff";
            } else if (opt === selected) {
              bg = "#f44336"; // red wrong
              color = "#fff";
            }
          }
          return (
            <button
              key={opt}
              onClick={() => handleSelect(opt)}
              disabled={selected !== null}
              style={{
                padding: "14px 24px",
                fontSize: 28,
                borderRadius: 12,
                cursor: selected === null ? "pointer" : "default",
                background: bg,
                color,
                border: "2px solid #333",
                minWidth: 64,
              }}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
} 