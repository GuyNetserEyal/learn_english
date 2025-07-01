import React, { useEffect, useState } from "react";

// Same vocabulary as Games component will import from here to avoid duplication
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
];

const BOARD_SIZE = 10;

function pickWords(count = 10) {
  const copy = [...VOCAB];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, count);
}

function generateBoard(words) {
  const grid = Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(""));
  const placements = {}; // word -> array of positions

  const directions = [
    [0, 1], // right
    [0, -1], // left
    [1, 0], // down
    [-1, 0], // up
    [1, 1], // down-right
    [1, -1], // down-left
    [-1, 1], // up-right
    [-1, -1], // up-left
  ];

  const placeWord = (word) => {
    const letters = word.split("");
    for (let attempt = 0; attempt < 100; attempt++) {
      const dir = directions[Math.floor(Math.random() * directions.length)];
      const startRow = Math.floor(Math.random() * BOARD_SIZE);
      const startCol = Math.floor(Math.random() * BOARD_SIZE);
      const endRow = startRow + dir[0] * (letters.length - 1);
      const endCol = startCol + dir[1] * (letters.length - 1);
      if (endRow < 0 || endRow >= BOARD_SIZE || endCol < 0 || endCol >= BOARD_SIZE) continue;

      let fits = true;
      let r = startRow;
      let c = startCol;
      for (const ch of letters) {
        const existing = grid[r][c];
        if (existing && existing !== ch) {
          fits = false;
          break;
        }
        r += dir[0];
        c += dir[1];
      }
      if (!fits) continue;

      // place
      r = startRow;
      c = startCol;
      const pos = [];
      for (const ch of letters) {
        grid[r][c] = ch;
        pos.push([r, c]);
        r += dir[0];
        c += dir[1];
      }
      placements[word] = pos;
      return true;
    }
    return false;
  };

  words.forEach((w) => placeWord(w.word));

  // fill blanks
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      if (!grid[i][j]) grid[i][j] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    }
  }

  return { grid, placements };
}

export default function WordSearch({ onBack }) {
  const palette = [
    "#FFE5E5",
    "#FFF4CC",
    "#E5FFE5",
    "#E5F4FF",
    "#EDE5FF",
    "#FFE5F4",
    "#F0FFE5",
    "#E5FFFA",
    "#FFF0E5",
    "#E5F0FF",
  ];

  const [words] = useState(() => {
    const chosen = pickWords(10);
    // attach a unique color
    return chosen.map((w, idx) => ({ ...w, color: palette[idx % palette.length] }));
  });
  const [boardData] = useState(() => generateBoard(words));
  const [found, setFound] = useState({}); // word -> true
  const [startCell, setStartCell] = useState(null);

  const speak = (text) => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const ut = new SpeechSynthesisUtterance(text);
      ut.lang = "en-US";
      window.speechSynthesis.speak(ut);
    }
  };

  const handleMouseDown = (row, col) => {
    setStartCell([row, col]);
  };

  const handleMouseUp = (row, col) => {
    if (!startCell) return;
    const [r0, c0] = startCell;
    const dr = Math.sign(row - r0);
    const dc = Math.sign(col - c0);
    if (dr === 0 && dc === 0) {
      setStartCell(null);
      return;
    }
    // build path
    let r = r0;
    let c = c0;
    let path = "";
    const cells = [];
    while (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE) {
      path += boardData.grid[r][c];
      cells.push([r, c]);
      if (r === row && c === col) break;
      r += dr;
      c += dc;
    }
    const pathRev = path.split("").reverse().join("");
    const matched = words.find((w) => !found[w.word] && (w.word === path || w.word === pathRev));
    if (matched) {
      setFound((prev) => ({ ...prev, [matched.word]: true }));
    }
    setStartCell(null);
  };

  const allFound = words.every((w) => found[w.word]);

  return (
    <div
      dir="rtl"
      style={{
        textAlign: "center",
        fontFamily: "inherit",
        padding: 16,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        position: "relative",
      }}
    >
      <button onClick={onBack} style={{ position: "absolute", top: 10, left: 10, fontSize: 18 }}>
        חזרה לדף הבית
      </button>
      <h2>חפש את המילים הבאות</h2>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }}>
        {words.map((w) => (
          <div
            key={w.word}
            style={{
              padding: 6,
              borderRadius: 6,
              background: found[w.word] ? w.color : "#eee",
              minWidth: 80,
            }}
          >
            <div>{w.word}</div>
            {found[w.word] && (
              <div style={{ fontSize: 32 }}>{w.icon}</div>
            )}
            {found[w.word] && (
              <div style={{ fontSize: 16 }}>{w.hebrew}</div>
            )}
            {found[w.word] && (
              <button
                onClick={() => speak(w.word)}
                style={{ fontSize: 12, marginTop: 4, cursor: "pointer" }}
              >
                השמע
              </button>
            )}
            {!found[w.word] && (
              <button
                onClick={() => setFound((prev) => ({ ...prev, [w.word]: true }))}
                style={{ fontSize: 12, marginTop: 4, cursor: "pointer" }}
              >
                לא מצאתי
              </button>
            )}
          </div>
        ))}
      </div>

      <div style={{ overflowX: "auto", marginTop: 16 }}>
        <table style={{ borderCollapse: "collapse" }}>
          <tbody>
            {boardData.grid.map((rowArr, rowIdx) => (
              <tr key={rowIdx}>
                {rowArr.map((ch, colIdx) => {
                  // check if this cell belongs to a found word and get its color
                  let cellColor = null;
                  for (const w of words) {
                    if (found[w.word] && boardData.placements[w.word].some(([r, c]) => r === rowIdx && c === colIdx)) {
                      cellColor = w.color;
                      break;
                    }
                  }
                  return (
                    <td
                      key={colIdx}
                      onMouseDown={() => handleMouseDown(rowIdx, colIdx)}
                      onMouseUp={() => handleMouseUp(rowIdx, colIdx)}
                      style={{
                        width: 32,
                        height: 32,
                        border: "1px solid #999",
                        textAlign: "center",
                        userSelect: "none",
                        background: cellColor ? cellColor : "#fff",
                        fontWeight: "bold",
                        fontSize: 16,
                      }}
                    >
                      {ch}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {allFound && <h3 style={{ marginTop: 16 }}>כל הכבוד! מצאתם את כל המילים 🎉</h3>}
    </div>
  );
} 