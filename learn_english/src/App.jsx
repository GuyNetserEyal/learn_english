import React, { useState } from "react";

const LETTERS = [
  { letter: "A", hebrewName: "אֵיי", word: "Apple", hebrewWord: "אֶפֶּל" },
  { letter: "B", hebrewName: "בִּי", word: "Ball", hebrewWord: "בּוֹל" },
  { letter: "C", hebrewName: "סִי", word: "Cat", hebrewWord: "קַט" },
  { letter: "D", hebrewName: "דִי", word: "Dog", hebrewWord: "דּוֹג" },
  { letter: "E", hebrewName: "אִי", word: "Elephant", hebrewWord: "אֶלֶפֶנְט" },
  { letter: "F", hebrewName: "אֶף", word: "Fish", hebrewWord: "פִישׁ" },
  { letter: "G", hebrewName: "ג'י", word: "Grape", hebrewWord: "גְרֵייפ" },
  { letter: "H", hebrewName: "אֵיְטְשׁ", word: "Hat", hebrewWord: "הַט" },
  { letter: "I", hebrewName: "אַיי", word: "Ice", hebrewWord: "אַייְס" },
  { letter: "J", hebrewName: "גֵ'יי", word: "Juice", hebrewWord: "ג'וּס" },
  { letter: "K", hebrewName: "קֵיי", word: "Kite", hebrewWord: "קַיְט" },
  { letter: "L", hebrewName: "אֶל", word: "Lion", hebrewWord: "לַיּוֹן" },
  { letter: "M", hebrewName: "אֶם", word: "Monkey", hebrewWord: "מַנְקִי" },
  { letter: "N", hebrewName: "אֶן", word: "Nose", hebrewWord: "נוֹז" },
  { letter: "O", hebrewName: "אוֹ", word: "Orange", hebrewWord: "אוֹרֶנְג'" },
  { letter: "P", hebrewName: "פִּי", word: "Pizza", hebrewWord: "פִּיצָה" },
  { letter: "Q", hebrewName: "קְיוּ", word: "Queen", hebrewWord: "קווין" },
  { letter: "R", hebrewName: "אָר", word: "Rabbit", hebrewWord: "רַבִּיט" },
  { letter: "S", hebrewName: "אֶס", word: "Sun", hebrewWord: "סַן" },
  { letter: "T", hebrewName: "טִי", word: "Tiger", hebrewWord: "טַייְגֶר" },
  { letter: "U", hebrewName: "יוּ", word: "Umbrella", hebrewWord: "אַמְבְּרֶלָה" },
  { letter: "V", hebrewName: "וִי", word: "Violin", hebrewWord: "וַיּוֹלִין" },
  { letter: "W", hebrewName: "דַבְּלְיוּ", word: "Water", hebrewWord: "וֹוֹטֶר" },
  { letter: "X", hebrewName: "אֶקס", word: "Xylophone", hebrewWord: "זַיְלוֹפוֹן" },
  { letter: "Y", hebrewName: "וַיי", word: "Yellow", hebrewWord: "יֶלּוֹ" },
  { letter: "Z", hebrewName: "זִי", word: "Zebra", hebrewWord: "זִיבְּרָה" }
];

function App() {
  const [selected, setSelected] = useState(null);

  if (selected !== null) {
    const { letter, hebrewName, word, hebrewWord } = LETTERS[selected];
    return (
      <div dir="rtl" style={{ textAlign: "center", fontFamily: "inherit", padding: 32 }}>
        <button onClick={() => setSelected(null)} style={{ float: "left", fontSize: 18 }}>
          חזרה
        </button>
        <h1 style={{ fontSize: 64 }}>{letter}, {letter.toLowerCase()}</h1>
        <h2 style={{ fontSize: 32 }}>{hebrewName}</h2>
        <div style={{ marginTop: 32, fontSize: 28 }}>
          <div><b>{word}</b></div>
          <div>{hebrewWord}</div>
        </div>
      </div>
    );
  }

  return (
    <div dir="rtl" style={{ textAlign: "center", fontFamily: "inherit", padding: 32 }}>
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
              justifyContent: "center"
            }}
          >
            <span>{l.letter}</span>
            <span style={{ fontSize: 18, marginTop: 6 }}>{l.hebrewName}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default App; 