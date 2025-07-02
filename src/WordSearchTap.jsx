import React, { useState } from "react";

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
  const placements = {};

  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
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

  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      if (!grid[i][j]) grid[i][j] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    }
  }

  return { grid, placements };
}

export default function WordSearchTap({ onBack }) {
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
    return chosen.map((w, idx) => ({ ...w, color: palette[idx % palette.length] }));
  });
  const [boardData] = useState(() => generateBoard(words));
  const [found, setFound] = useState({});
  const [currentWord, setCurrentWord] = useState(null);
  const [reverse, setReverse] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selection, setSelection] = useState([]);

  const speak = (text) => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const ut = new SpeechSynthesisUtterance(text);
      ut.lang = "en-US";
      window.speechSynthesis.speak(ut);
    }
  };

  const resetSelection = () => {
    setCurrentWord(null);
    setCurrentIndex(0);
    setReverse(false);
    setSelection([]);
  };

  const handleCellClick = (row, col) => {
    if (!currentWord) {
      for (const w of words) {
        if (found[w.word]) continue;
        const pos = boardData.placements[w.word];
        if (pos[0][0] === row && pos[0][1] === col) {
          setCurrentWord(w.word);
          setReverse(false);
          setCurrentIndex(1);
          setSelection([[row, col]]);
          return;
        }
        const last = pos[pos.length - 1];
        if (last[0] === row && last[1] === col) {
          setCurrentWord(w.word);
          setReverse(true);
          setCurrentIndex(pos.length - 2);
          setSelection([[row, col]]);
          return;
        }
      }
      return;
    }

    const pos = boardData.placements[currentWord];
    const expected = reverse ? pos[currentIndex] : pos[currentIndex];
    if (row === expected[0] && col === expected[1]) {
      setSelection((prev) => [...prev, [row, col]]);
      let nextIndex = reverse ? currentIndex - 1 : currentIndex + 1;
      const completed = reverse ? nextIndex < 0 : nextIndex >= pos.length;
      if (completed) {
        setFound((prev) => ({ ...prev, [currentWord]: true }));
        resetSelection();
      } else {
        setCurrentIndex(nextIndex);
      }
    } else {
      resetSelection();
    }
  };

  const cellColor = (row, col) => {
    for (const w of words) {
      if (found[w.word] && boardData.placements[w.word].some(([r, c]) => r === row && c === col)) {
        return w.color;
      }
    }
    if (selection.some(([r, c]) => r === row && c === col)) {
      return "#ddd";
    }
    return "#fff";
  };

  const allFound = words.every((w) => found[w.word]);

  return (
    <div dir="rtl" className="screen-container" style={{ padding: 16, gap: 12 }}>
      <button onClick={onBack} className="primary-button back-button">
        חזרה לדף הבית
      </button>
      <h2>לחצו על האותיות לפי הסדר</h2>
      <div className="word-list">
        {words.map((w) => (
          <div
            key={w.word}
            className="word-item"
            style={{ background: found[w.word] ? w.color : "#eee" }}
          >
            <div>{w.word}</div>
            {found[w.word] && (
              <>
                <div style={{ fontSize: 32 }}>{w.icon}</div>
                <div style={{ fontSize: 16 }}>{w.hebrew}</div>
                <button
                  onClick={() => speak(w.word)}
                  className="primary-button"
                  style={{ fontSize: 12, marginTop: 4 }}
                >
                  השמע
                </button>
              </>
            )}
          </div>
        ))}
      </div>

      <div style={{ overflowX: "auto", marginTop: 16 }}>
        <table className="board-table">
          <tbody>
            {boardData.grid.map((rowArr, rowIdx) => (
              <tr key={rowIdx}>
                {rowArr.map((ch, colIdx) => (
                  <td
                    key={colIdx}
                    onClick={() => handleCellClick(rowIdx, colIdx)}
                    className="board-cell"
                    style={{ background: cellColor(rowIdx, colIdx) }}
                  >
                    {ch}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selection.length > 0 && (
        <button
          onClick={resetSelection}
          className="primary-button"
          style={{ marginTop: 8, fontSize: 12 }}
        >
          איפוס בחירה
        </button>
      )}

      {allFound && <h3 style={{ marginTop: 16 }}>כל הכבוד! מצאתם את כל המילים 🎉</h3>}
    </div>
  );
}
